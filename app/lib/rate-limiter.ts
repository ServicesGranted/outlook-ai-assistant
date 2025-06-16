
/**
 * Rate Limiting System
 * Prevents abuse and manages API usage
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private requests: Map<string, RateLimitEntry> = new Map();
  private maxRequestsPerMinute: number;
  private maxRequestsPerHour: number;

  constructor(maxRequestsPerMinute: number = 20, maxRequestsPerHour: number = 100) {
    this.maxRequestsPerMinute = maxRequestsPerMinute;
    this.maxRequestsPerHour = maxRequestsPerHour;
    
    // Clean up expired entries every 5 minutes
    setInterval(() => this.cleanup(), 5 * 60 * 1000);
  }

  /**
   * Check if a request is allowed for the given identifier
   */
  isAllowed(identifier: string): { allowed: boolean; resetTime?: number; limit?: string } {
    const now = Date.now();
    
    // Check minute-based limit
    const minuteKey = `${identifier}:minute:${Math.floor(now / (60 * 1000))}`;
    const minuteEntry = this.requests.get(minuteKey);
    
    if (minuteEntry && minuteEntry.count >= this.maxRequestsPerMinute) {
      return {
        allowed: false,
        resetTime: minuteEntry.resetTime,
        limit: 'minute',
      };
    }
    
    // Check hour-based limit
    const hourKey = `${identifier}:hour:${Math.floor(now / (60 * 60 * 1000))}`;
    const hourEntry = this.requests.get(hourKey);
    
    if (hourEntry && hourEntry.count >= this.maxRequestsPerHour) {
      return {
        allowed: false,
        resetTime: hourEntry.resetTime,
        limit: 'hour',
      };
    }
    
    return { allowed: true };
  }

  /**
   * Record a request for the given identifier
   */
  recordRequest(identifier: string): void {
    const now = Date.now();
    
    // Record minute-based request
    const minuteKey = `${identifier}:minute:${Math.floor(now / (60 * 1000))}`;
    const minuteEntry = this.requests.get(minuteKey);
    
    if (minuteEntry) {
      minuteEntry.count++;
    } else {
      this.requests.set(minuteKey, {
        count: 1,
        resetTime: Math.floor(now / (60 * 1000)) * 60 * 1000 + 60 * 1000,
      });
    }
    
    // Record hour-based request
    const hourKey = `${identifier}:hour:${Math.floor(now / (60 * 60 * 1000))}`;
    const hourEntry = this.requests.get(hourKey);
    
    if (hourEntry) {
      hourEntry.count++;
    } else {
      this.requests.set(hourKey, {
        count: 1,
        resetTime: Math.floor(now / (60 * 60 * 1000)) * 60 * 60 * 1000 + 60 * 60 * 1000,
      });
    }
  }

  /**
   * Get current usage for an identifier
   */
  getUsage(identifier: string): { minute: number; hour: number } {
    const now = Date.now();
    
    const minuteKey = `${identifier}:minute:${Math.floor(now / (60 * 1000))}`;
    const hourKey = `${identifier}:hour:${Math.floor(now / (60 * 60 * 1000))}`;
    
    const minuteEntry = this.requests.get(minuteKey);
    const hourEntry = this.requests.get(hourKey);
    
    return {
      minute: minuteEntry?.count || 0,
      hour: hourEntry?.count || 0,
    };
  }

  /**
   * Clean up expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    
    const keysToDelete: string[] = [];
    this.requests.forEach((entry, key) => {
      if (entry.resetTime <= now) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => this.requests.delete(key));
  }

  /**
   * Reset limits for an identifier (admin function)
   */
  reset(identifier: string): void {
    const keysToDelete: string[] = [];
    
    this.requests.forEach((_, key) => {
      if (key.startsWith(identifier + ':')) {
        keysToDelete.push(key);
      }
    });
    
    keysToDelete.forEach(key => this.requests.delete(key));
  }
}

// Global rate limiter instance
let globalRateLimiter: RateLimiter | null = null;

/**
 * Get or create the global rate limiter instance
 */
export function getRateLimiter(): RateLimiter {
  if (!globalRateLimiter) {
    const maxPerMinute = parseInt(process.env.AI_MAX_REQUESTS_PER_MINUTE || '20');
    const maxPerHour = parseInt(process.env.AI_MAX_REQUESTS_PER_HOUR || '100');
    globalRateLimiter = new RateLimiter(maxPerMinute, maxPerHour);
  }
  
  return globalRateLimiter;
}

/**
 * Get client identifier for rate limiting
 */
export function getClientIdentifier(request: Request): string {
  // Try to get IP address from various headers
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  
  const ip = forwarded?.split(',')[0] || realIp || cfConnectingIp || 'unknown';
  
  // In development, use a fixed identifier to avoid issues
  if (process.env.NODE_ENV === 'development') {
    return 'dev-client';
  }
  
  return ip;
}

/**
 * Middleware function for rate limiting
 */
export function withRateLimit<T extends any[]>(
  handler: (...args: T) => Promise<Response>
) {
  return async (...args: T): Promise<Response> => {
    const request = args[0] as Request;
    
    // Skip rate limiting if disabled
    if (process.env.AI_RATE_LIMITING_ENABLED === 'false') {
      return handler(...args);
    }
    
    const rateLimiter = getRateLimiter();
    const clientId = getClientIdentifier(request);
    
    const { allowed, resetTime, limit } = rateLimiter.isAllowed(clientId);
    
    if (!allowed) {
      const timeUntilReset = resetTime ? Math.ceil((resetTime - Date.now()) / 1000) : 60;
      
      return new Response(
        JSON.stringify({
          error: 'Rate limit exceeded',
          message: `Too many requests. Please wait ${timeUntilReset} seconds before trying again.`,
          resetTime: resetTime,
          limit: limit,
        }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': timeUntilReset.toString(),
            'X-RateLimit-Limit': limit === 'minute' ? '20' : '100',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': resetTime?.toString() || '',
          },
        }
      );
    }
    
    // Record the request
    rateLimiter.recordRequest(clientId);
    
    // Get current usage for headers
    const usage = rateLimiter.getUsage(clientId);
    
    try {
      const response = await handler(...args);
      
      // Add rate limit headers to successful responses
      const headers = new Headers(response.headers);
      headers.set('X-RateLimit-Limit-Minute', '20');
      headers.set('X-RateLimit-Limit-Hour', '100');
      headers.set('X-RateLimit-Remaining-Minute', (20 - usage.minute).toString());
      headers.set('X-RateLimit-Remaining-Hour', (100 - usage.hour).toString());
      
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
      
    } catch (error) {
      // If the handler throws an error, we still want to return a proper response
      console.error('Handler error:', error);
      return new Response(
        JSON.stringify({
          error: 'Internal server error',
          message: 'An unexpected error occurred',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  };
}

export default RateLimiter;

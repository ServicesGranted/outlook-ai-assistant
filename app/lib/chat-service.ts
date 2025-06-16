
/**
 * Chat Service
 * Client-side service for communicating with the AI API
 */

export interface ChatMessage {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  error?: boolean;
}

export interface ChatResponse {
  content: string;
  conversationId?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model?: string;
  provider?: string;
}

export interface ChatError {
  error: string;
  message: string;
  code?: string;
}

/**
 * Send a message to the AI chat API
 */
export async function sendChatMessage(
  message: string,
  conversationId?: string
): Promise<ChatResponse> {
  try {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message.trim(),
        conversationId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return data as ChatResponse;
  } catch (error: any) {
    console.error('Chat service error:', error);
    
    // Handle different types of errors
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      throw new Error('Unable to connect to the AI service. Please check your internet connection.');
    }
    
    if (error.message.includes('429')) {
      throw new Error('Too many requests. Please wait a moment before sending another message.');
    }
    
    if (error.message.includes('503')) {
      throw new Error('AI service is temporarily unavailable. Please try again later.');
    }
    
    if (error.message.includes('504')) {
      throw new Error('Request timed out. Please try again with a shorter message.');
    }
    
    // Use the error message from the API if available, otherwise use a generic message
    throw new Error(error.message || 'Failed to send message. Please try again.');
  }
}

/**
 * Check AI service health
 */
export async function checkAIServiceHealth(): Promise<{
  status: string;
  provider?: string;
  model?: string;
  configured?: boolean;
}> {
  try {
    const response = await fetch('/api/ai/chat', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Health check failed:', error);
    return {
      status: 'unhealthy',
    };
  }
}

/**
 * Generate a unique message ID
 */
export function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate message before sending
 */
export function validateMessage(message: string): { isValid: boolean; error?: string } {
  if (!message || typeof message !== 'string') {
    return { isValid: false, error: 'Message cannot be empty' };
  }
  
  const trimmed = message.trim();
  
  if (trimmed.length === 0) {
    return { isValid: false, error: 'Message cannot be empty' };
  }
  
  if (trimmed.length > 4000) {
    return { isValid: false, error: 'Message is too long. Please keep it under 4000 characters.' };
  }
  
  return { isValid: true };
}

/**
 * Format error message for display
 */
export function formatErrorMessage(error: any): string {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error?.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
}

/**
 * Retry logic for failed requests
 */
export async function sendChatMessageWithRetry(
  message: string,
  conversationId?: string,
  maxRetries: number = 2
): Promise<ChatResponse> {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await sendChatMessage(message, conversationId);
    } catch (error: any) {
      lastError = error;
      
      // Don't retry for certain error types
      if (
        error.message.includes('429') || // Rate limit
        error.message.includes('400') || // Bad request
        error.message.includes('Invalid input') ||
        error.message.includes('too long')
      ) {
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s...
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError!;
}

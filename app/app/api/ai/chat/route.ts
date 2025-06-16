
/**
 * AI Chat API Route
 * Secure server-side endpoint for AI communication
 */

import { NextRequest, NextResponse } from 'next/server';
import { callAI, getAIErrorMessage, validateUserInput } from '@/lib/ai-service';
import { withRateLimit } from '@/lib/rate-limiter';
import { getAIConfig } from '@/config/ai-config';

export const dynamic = 'force-dynamic';

interface ChatRequest {
  message: string;
  conversationId?: string;
}

interface ChatResponse {
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

interface ErrorResponse {
  error: string;
  message: string;
  code?: string;
}

/**
 * POST /api/ai/chat
 * Send a message to the AI assistant
 */
async function handleChatRequest(request: NextRequest): Promise<NextResponse> {
  try {
    // Validate request method
    if (request.method !== 'POST') {
      return NextResponse.json(
        { error: 'Method not allowed', message: 'Only POST requests are supported' },
        { status: 405 }
      );
    }

    // Parse request body
    let body: ChatRequest;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid JSON', message: 'Request body must be valid JSON' },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!body.message) {
      return NextResponse.json(
        { error: 'Missing message', message: 'Message field is required' },
        { status: 400 }
      );
    }

    // Validate user input
    const validation = validateUserInput(body.message);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: 'Invalid input', message: validation.error || 'Invalid message content' },
        { status: 400 }
      );
    }

    // Check AI configuration
    const config = getAIConfig();
    const currentProvider = config.providers[config.provider];
    
    if (!currentProvider.apiKey) {
      console.error(`AI provider ${config.provider} not configured`);
      return NextResponse.json(
        { 
          error: 'Service unavailable', 
          message: 'AI service is temporarily unavailable. Please try again later.' 
        },
        { status: 503 }
      );
    }

    // Call AI service
    try {
      const aiResponse = await callAI(body.message);
      
      const response: ChatResponse = {
        content: aiResponse.content,
        conversationId: body.conversationId,
        usage: aiResponse.usage,
        model: aiResponse.model,
        provider: aiResponse.provider,
      };

      return NextResponse.json(response, { status: 200 });
      
    } catch (aiError: any) {
      console.error('AI Service Error:', aiError);
      
      const userFriendlyMessage = getAIErrorMessage(aiError);
      
      // Determine appropriate status code based on error type
      let statusCode = 500;
      if (aiError.message?.includes('429') || aiError.message?.includes('rate limit')) {
        statusCode = 429;
      } else if (aiError.message?.includes('401') || aiError.message?.includes('authentication')) {
        statusCode = 503; // Service unavailable for config issues
      } else if (aiError.message?.includes('timeout')) {
        statusCode = 504; // Gateway timeout
      }
      
      return NextResponse.json(
        { 
          error: 'AI service error', 
          message: userFriendlyMessage,
          code: aiError.code || 'UNKNOWN_ERROR'
        },
        { status: statusCode }
      );
    }

  } catch (error: any) {
    console.error('Unexpected error in chat API:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        message: 'An unexpected error occurred. Please try again later.' 
      },
      { status: 500 }
    );
  }
}

// Apply rate limiting to the handler
export const POST = withRateLimit(handleChatRequest);

// Health check endpoint
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const config = getAIConfig();
    const currentProvider = config.providers[config.provider];
    
    const status = {
      status: 'healthy',
      provider: config.provider,
      model: currentProvider.defaultModel,
      configured: !!currentProvider.apiKey,
      rateLimiting: config.rateLimiting.enabled,
      fallback: config.fallback.enabled,
      timestamp: new Date().toISOString(),
    };
    
    return NextResponse.json(status, { status: 200 });
    
  } catch (error) {
    console.error('Health check error:', error);
    
    return NextResponse.json(
      { 
        status: 'unhealthy', 
        error: 'Configuration error',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}

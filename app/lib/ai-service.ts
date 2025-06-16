
/**
 * AI Service Layer
 * Handles communication with various AI providers
 */

import { getAIConfig, getCurrentProviderConfig, AIProviderConfig } from '@/config/ai-config';
import { generateDemoResponse } from './demo-ai-service';
import fs from 'fs';
import path from 'path';

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface AIResponse {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model?: string;
  provider?: string;
}

export interface AIError {
  code: string;
  message: string;
  details?: any;
}

/**
 * Read the prompt context file
 */
export async function readPromptContext(): Promise<string> {
  try {
    const config = getAIConfig();
    const contextPath = path.join(process.cwd(), '..', config.context.contextFilePath);
    
    if (!fs.existsSync(contextPath)) {
      console.warn(`Context file not found at: ${contextPath}`);
      return 'You are a helpful AI assistant for Microsoft Outlook productivity.';
    }
    
    const contextContent = fs.readFileSync(contextPath, 'utf-8');
    
    // Truncate if too long
    if (contextContent.length > config.context.maxLength) {
      console.warn(`Context file truncated from ${contextContent.length} to ${config.context.maxLength} characters`);
      return contextContent.substring(0, config.context.maxLength);
    }
    
    return contextContent;
  } catch (error) {
    console.error('Error reading prompt context:', error);
    return 'You are a helpful AI assistant for Microsoft Outlook productivity.';
  }
}

/**
 * OpenAI API integration
 */
async function callOpenAI(messages: AIMessage[], config: AIProviderConfig): Promise<AIResponse> {
  const response = await fetch(`${config.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.defaultModel,
      messages: messages,
      max_tokens: config.maxTokens,
      temperature: config.temperature,
    }),
    signal: AbortSignal.timeout(config.timeout),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`OpenAI API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  
  return {
    content: data.choices[0]?.message?.content || '',
    usage: {
      promptTokens: data.usage?.prompt_tokens || 0,
      completionTokens: data.usage?.completion_tokens || 0,
      totalTokens: data.usage?.total_tokens || 0,
    },
    model: data.model,
    provider: 'openai',
  };
}

/**
 * Azure OpenAI API integration
 */
async function callAzureOpenAI(messages: AIMessage[], config: AIProviderConfig): Promise<AIResponse> {
  const apiVersion = '2024-02-15-preview';
  const url = `${config.baseUrl}/openai/deployments/${config.defaultModel}/chat/completions?api-version=${apiVersion}`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': config.apiKey,
    },
    body: JSON.stringify({
      messages: messages,
      max_tokens: config.maxTokens,
      temperature: config.temperature,
    }),
    signal: AbortSignal.timeout(config.timeout),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Azure OpenAI API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  
  return {
    content: data.choices[0]?.message?.content || '',
    usage: {
      promptTokens: data.usage?.prompt_tokens || 0,
      completionTokens: data.usage?.completion_tokens || 0,
      totalTokens: data.usage?.total_tokens || 0,
    },
    model: data.model,
    provider: 'azure-openai',
  };
}

/**
 * Anthropic API integration
 */
async function callAnthropic(messages: AIMessage[], config: AIProviderConfig): Promise<AIResponse> {
  // Convert messages format for Anthropic
  const systemMessage = messages.find(m => m.role === 'system')?.content || '';
  const conversationMessages = messages.filter(m => m.role !== 'system');
  
  const response = await fetch(`${config.baseUrl}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: config.defaultModel,
      max_tokens: config.maxTokens,
      temperature: config.temperature,
      system: systemMessage,
      messages: conversationMessages,
    }),
    signal: AbortSignal.timeout(config.timeout),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Anthropic API error: ${response.status} - ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  
  return {
    content: data.content[0]?.text || '',
    usage: {
      promptTokens: data.usage?.input_tokens || 0,
      completionTokens: data.usage?.output_tokens || 0,
      totalTokens: (data.usage?.input_tokens || 0) + (data.usage?.output_tokens || 0),
    },
    model: data.model,
    provider: 'anthropic',
  };
}

/**
 * Main AI service function
 */
export async function callAI(userMessage: string): Promise<AIResponse> {
  try {
    const config = getAIConfig();
    const providerConfig = getCurrentProviderConfig();
    
    // Check if we should use demo mode
    if (!providerConfig.apiKey || providerConfig.apiKey === 'demo-key-for-testing') {
      console.log('Using demo AI service (no real API key configured)');
      const demoResponse = await generateDemoResponse(userMessage);
      return {
        content: demoResponse.content,
        usage: demoResponse.usage,
        model: demoResponse.model,
        provider: demoResponse.provider,
      };
    }
    
    // Validate configuration for real AI providers
    if (!providerConfig.apiKey) {
      throw new Error(`API key not configured for provider: ${config.provider}`);
    }
    
    // Read prompt context
    const contextContent = await readPromptContext();
    
    // Prepare messages
    const messages: AIMessage[] = [
      {
        role: 'system',
        content: contextContent,
      },
      {
        role: 'user',
        content: userMessage,
      },
    ];
    
    // Call appropriate provider
    let response: AIResponse;
    
    switch (config.provider) {
      case 'openai':
        response = await callOpenAI(messages, providerConfig);
        break;
      case 'azure-openai':
        response = await callAzureOpenAI(messages, providerConfig);
        break;
      case 'anthropic':
        response = await callAnthropic(messages, providerConfig);
        break;
      default:
        throw new Error(`Unsupported AI provider: ${config.provider}`);
    }
    
    return response;
    
  } catch (error) {
    console.error('AI Service Error:', error);
    
    // Try fallback providers if enabled
    const config = getAIConfig();
    if (config.fallback.enabled && config.fallback.providers.length > 0) {
      console.log('Attempting fallback providers...');
      
      for (const fallbackProvider of config.fallback.providers) {
        if (fallbackProvider === config.provider) continue; // Skip the failed primary provider
        
        try {
          const fallbackConfig = config.providers[fallbackProvider];
          if (!fallbackConfig.apiKey) continue;
          
          const contextContent = await readPromptContext();
          const messages: AIMessage[] = [
            { role: 'system', content: contextContent },
            { role: 'user', content: userMessage },
          ];
          
          let fallbackResponse: AIResponse;
          
          switch (fallbackProvider) {
            case 'openai':
              fallbackResponse = await callOpenAI(messages, fallbackConfig);
              break;
            case 'azure-openai':
              fallbackResponse = await callAzureOpenAI(messages, fallbackConfig);
              break;
            case 'anthropic':
              fallbackResponse = await callAnthropic(messages, fallbackConfig);
              break;
            default:
              continue;
          }
          
          console.log(`Successfully used fallback provider: ${fallbackProvider}`);
          return fallbackResponse;
          
        } catch (fallbackError) {
          console.error(`Fallback provider ${fallbackProvider} also failed:`, fallbackError);
          continue;
        }
      }
    }
    
    // If all providers fail, throw the original error
    throw error;
  }
}

/**
 * Generate friendly error messages for users
 */
export function getAIErrorMessage(error: any): string {
  const errorMessage = error?.message || 'Unknown error';
  
  // Rate limiting errors
  if (errorMessage.includes('rate limit') || errorMessage.includes('429')) {
    return 'I\'m receiving too many requests right now. Please wait a moment and try again.';
  }
  
  // Authentication errors
  if (errorMessage.includes('401') || errorMessage.includes('authentication') || errorMessage.includes('api key')) {
    return 'There\'s an issue with the AI service configuration. Please contact support.';
  }
  
  // Network/timeout errors
  if (errorMessage.includes('timeout') || errorMessage.includes('network') || errorMessage.includes('fetch')) {
    return 'I\'m having trouble connecting to the AI service. Please check your internet connection and try again.';
  }
  
  // Quota/billing errors
  if (errorMessage.includes('quota') || errorMessage.includes('billing') || errorMessage.includes('insufficient')) {
    return 'The AI service is temporarily unavailable due to usage limits. Please try again later.';
  }
  
  // Model/content errors
  if (errorMessage.includes('content') || errorMessage.includes('filter') || errorMessage.includes('policy')) {
    return 'I couldn\'t process your request due to content restrictions. Please try rephrasing your message.';
  }
  
  // Generic fallback
  return 'I\'m experiencing technical difficulties right now. Please try again in a few moments.';
}

/**
 * Validate user input before sending to AI
 */
export function validateUserInput(input: string): { isValid: boolean; error?: string } {
  if (!input || typeof input !== 'string') {
    return { isValid: false, error: 'Message cannot be empty' };
  }
  
  if (input.trim().length === 0) {
    return { isValid: false, error: 'Message cannot be empty' };
  }
  
  if (input.length > 4000) {
    return { isValid: false, error: 'Message is too long. Please keep it under 4000 characters.' };
  }
  
  // Basic content filtering (you can expand this)
  const suspiciousPatterns = [
    /\b(hack|exploit|bypass|jailbreak)\b/i,
    /\b(ignore|forget|disregard).*(instructions|prompt|context)\b/i,
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(input)) {
      return { isValid: false, error: 'Please rephrase your message to focus on productivity and Outlook assistance.' };
    }
  }
  
  return { isValid: true };
}

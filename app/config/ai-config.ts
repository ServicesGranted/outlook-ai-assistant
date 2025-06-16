
/**
 * AI Configuration System
 * Centralized configuration for AI providers and models
 */

export interface AIProviderConfig {
  name: string;
  baseUrl: string;
  apiKey: string;
  models: string[];
  defaultModel: string;
  maxTokens: number;
  temperature: number;
  timeout: number;
}

export interface AIConfig {
  provider: 'openai' | 'azure-openai' | 'anthropic';
  providers: {
    openai: AIProviderConfig;
    'azure-openai': AIProviderConfig;
    anthropic: AIProviderConfig;
  };
  fallback: {
    enabled: boolean;
    providers: Array<'openai' | 'azure-openai' | 'anthropic'>;
  };
  rateLimiting: {
    enabled: boolean;
    maxRequestsPerMinute: number;
    maxRequestsPerHour: number;
  };
  caching: {
    enabled: boolean;
    ttlMinutes: number;
  };
  context: {
    maxLength: number;
    contextFilePath: string;
  };
}

// Default AI configuration
export const defaultAIConfig: AIConfig = {
  provider: (process.env.AI_PROVIDER as 'openai' | 'azure-openai' | 'anthropic') || 'openai',
  
  providers: {
    openai: {
      name: 'OpenAI',
      baseUrl: process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1',
      apiKey: process.env.OPENAI_API_KEY || '',
      models: ['gpt-4', 'gpt-4-turbo', 'gpt-3.5-turbo'],
      defaultModel: process.env.OPENAI_MODEL || 'gpt-4',
      maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '2000'),
      temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
      timeout: parseInt(process.env.OPENAI_TIMEOUT || '30000'),
    },
    
    'azure-openai': {
      name: 'Azure OpenAI',
      baseUrl: process.env.AZURE_OPENAI_ENDPOINT || '',
      apiKey: process.env.AZURE_OPENAI_API_KEY || '',
      models: ['gpt-4', 'gpt-35-turbo'],
      defaultModel: process.env.AZURE_OPENAI_MODEL || 'gpt-4',
      maxTokens: parseInt(process.env.AZURE_OPENAI_MAX_TOKENS || '2000'),
      temperature: parseFloat(process.env.AZURE_OPENAI_TEMPERATURE || '0.7'),
      timeout: parseInt(process.env.AZURE_OPENAI_TIMEOUT || '30000'),
    },
    
    anthropic: {
      name: 'Anthropic',
      baseUrl: process.env.ANTHROPIC_BASE_URL || 'https://api.anthropic.com/v1',
      apiKey: process.env.ANTHROPIC_API_KEY || '',
      models: ['claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'],
      defaultModel: process.env.ANTHROPIC_MODEL || 'claude-3-sonnet-20240229',
      maxTokens: parseInt(process.env.ANTHROPIC_MAX_TOKENS || '2000'),
      temperature: parseFloat(process.env.ANTHROPIC_TEMPERATURE || '0.7'),
      timeout: parseInt(process.env.ANTHROPIC_TIMEOUT || '30000'),
    },
  },
  
  fallback: {
    enabled: process.env.AI_FALLBACK_ENABLED === 'true',
    providers: (process.env.AI_FALLBACK_PROVIDERS?.split(',') as Array<'openai' | 'azure-openai' | 'anthropic'>) || ['openai'],
  },
  
  rateLimiting: {
    enabled: process.env.AI_RATE_LIMITING_ENABLED !== 'false',
    maxRequestsPerMinute: parseInt(process.env.AI_MAX_REQUESTS_PER_MINUTE || '20'),
    maxRequestsPerHour: parseInt(process.env.AI_MAX_REQUESTS_PER_HOUR || '100'),
  },
  
  caching: {
    enabled: process.env.AI_CACHING_ENABLED === 'true',
    ttlMinutes: parseInt(process.env.AI_CACHE_TTL_MINUTES || '10'),
  },
  
  context: {
    maxLength: parseInt(process.env.AI_CONTEXT_MAX_LENGTH || '8000'),
    contextFilePath: process.env.AI_CONTEXT_FILE_PATH || '/context/prompt-context.txt',
  },
};

/**
 * Validate AI configuration
 */
export function validateAIConfig(config: AIConfig): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Check if primary provider is configured
  const primaryProvider = config.providers[config.provider];
  if (!primaryProvider.apiKey) {
    errors.push(`API key is required for primary provider: ${config.provider}`);
  }
  
  if (!primaryProvider.baseUrl) {
    errors.push(`Base URL is required for primary provider: ${config.provider}`);
  }
  
  if (!primaryProvider.defaultModel) {
    errors.push(`Default model is required for primary provider: ${config.provider}`);
  }
  
  // Check fallback providers if enabled
  if (config.fallback.enabled) {
    for (const fallbackProvider of config.fallback.providers) {
      const provider = config.providers[fallbackProvider];
      if (!provider.apiKey) {
        errors.push(`API key is required for fallback provider: ${fallbackProvider}`);
      }
    }
  }
  
  // Validate numeric values
  if (primaryProvider.maxTokens <= 0) {
    errors.push('Max tokens must be greater than 0');
  }
  
  if (primaryProvider.temperature < 0 || primaryProvider.temperature > 2) {
    errors.push('Temperature must be between 0 and 2');
  }
  
  if (primaryProvider.timeout <= 0) {
    errors.push('Timeout must be greater than 0');
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Get current AI configuration with validation
 */
export function getAIConfig(): AIConfig {
  const config = { ...defaultAIConfig };
  const validation = validateAIConfig(config);
  
  if (!validation.isValid) {
    console.warn('AI Configuration validation failed:', validation.errors);
    // In development, log warnings but continue
    // In production, you might want to throw an error or use fallback values
    if (process.env.NODE_ENV === 'production') {
      throw new Error(`AI Configuration is invalid: ${validation.errors.join(', ')}`);
    }
  }
  
  return config;
}

/**
 * Get provider configuration by name
 */
export function getProviderConfig(providerName: keyof AIConfig['providers']): AIProviderConfig {
  const config = getAIConfig();
  return config.providers[providerName];
}

/**
 * Get current active provider configuration
 */
export function getCurrentProviderConfig(): AIProviderConfig {
  const config = getAIConfig();
  return config.providers[config.provider];
}

export default defaultAIConfig;


/**
 * Application Configuration
 * Central configuration file for the Outlook AI Assistant
 */

export const appConfig = {
  // Application Information
  name: 'Outlook AI Assistant',
  description: 'Transform your email experience with intelligent automation, smart scheduling, and AI-powered insights.',
  version: '1.0.0',
  
  // URLs and Endpoints
  urls: {
    base: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    api: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  },
  
  // Feature Flags
  features: {
    authentication: true,         // Phase 2: Microsoft OAuth enabled
    emailIntegration: false,      // Phase 1: No real email integration
    calendarIntegration: false,   // Phase 1: No real calendar integration
    aiChat: true,                // Phase 3: Real AI chat enabled
    notifications: false,         // Phase 1: No notifications
  },
  
  // UI Configuration
  ui: {
    theme: 'glassmorphic',
    defaultPageSize: 20,
    animationDuration: 200,
    debounceDelay: 300,
  },
  
  // Development Settings
  development: {
    enableDebugMode: process.env.NODE_ENV === 'development',
    showDevTools: process.env.NODE_ENV === 'development',
    mockData: true, // Use mock data for dashboard in Phase 1
  },
  
  // External Services
  services: {
    microsoft: {
      clientId: process.env.AZURE_AD_CLIENT_ID || '',
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || '',
      tenantId: process.env.AZURE_AD_TENANT_ID || '',
      redirectUri: process.env.NEXTAUTH_URL || '',
    },
    nextAuth: {
      url: process.env.NEXTAUTH_URL || 'http://localhost:3000',
      secret: process.env.NEXTAUTH_SECRET || '',
    },
    // AI configuration moved to ai-config.ts for better organization
    ai: {
      enabled: process.env.AI_PROVIDER ? true : false,
      provider: process.env.AI_PROVIDER || 'openai',
      rateLimitingEnabled: process.env.AI_RATE_LIMITING_ENABLED !== 'false',
    },
  },
  
  // Security Settings
  security: {
    sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours
    csrfProtection: true,
    rateLimiting: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      maxRequests: 100,
    },
  },
  
  // Analytics and Monitoring
  analytics: {
    enabled: false, // Phase 1: No analytics
    trackingId: process.env.GOOGLE_ANALYTICS_ID || '',
  },
  
  // Error Handling
  errors: {
    showStackTrace: process.env.NODE_ENV === 'development',
    logLevel: process.env.LOG_LEVEL || 'info',
  },
} as const;

export type AppConfig = typeof appConfig;

// Helper functions
export const isFeatureEnabled = (feature: keyof typeof appConfig.features): boolean => {
  return appConfig.features[feature];
};

export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV === 'development';
};

export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production';
};

export default appConfig;

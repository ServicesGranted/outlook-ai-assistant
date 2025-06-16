
/**
 * Application Constants
 * Centralized constants for the Outlook AI Assistant
 */

// Navigation Routes
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  EMAILS: '/emails',
  CALENDAR: '/calendar',
  CHAT: '/chat',
  SETTINGS: '/settings',
  PROFILE: '/profile',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: '/api/auth',
  EMAILS: '/api/emails',
  CALENDAR: '/api/calendar',
  CHAT: '/api/chat',
  USER: '/api/user',
  SETTINGS: '/api/settings',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'outlook-ai-theme',
  USER_PREFERENCES: 'outlook-ai-preferences',
  DRAFT_EMAILS: 'outlook-ai-drafts',
  CHAT_HISTORY: 'outlook-ai-chat-history',
} as const;

// Email Categories
export const EMAIL_CATEGORIES = {
  INBOX: 'inbox',
  SENT: 'sent',
  DRAFTS: 'drafts',
  ARCHIVE: 'archive',
  SPAM: 'spam',
  TRASH: 'trash',
  IMPORTANT: 'important',
  STARRED: 'starred',
} as const;

// Email Priorities
export const EMAIL_PRIORITIES = {
  LOW: 'low',
  NORMAL: 'normal',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

// Calendar Event Types
export const CALENDAR_EVENT_TYPES = {
  MEETING: 'meeting',
  APPOINTMENT: 'appointment',
  REMINDER: 'reminder',
  TASK: 'task',
  PERSONAL: 'personal',
} as const;

// AI Chat Message Types
export const CHAT_MESSAGE_TYPES = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system',
} as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

// Time Formats
export const TIME_FORMATS = {
  SHORT_DATE: 'MMM dd',
  LONG_DATE: 'MMMM dd, yyyy',
  SHORT_TIME: 'h:mm a',
  LONG_TIME: 'h:mm:ss a',
  DATETIME: 'MMM dd, yyyy h:mm a',
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
} as const;

// File Size Limits
export const FILE_LIMITS = {
  MAX_ATTACHMENT_SIZE: 25 * 1024 * 1024, // 25MB
  MAX_ATTACHMENTS: 10,
  ALLOWED_TYPES: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain',
  ],
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 5,
} as const;

// Animation Durations (in milliseconds)
export const ANIMATION_DURATIONS = {
  FAST: 150,
  NORMAL: 200,
  SLOW: 300,
  VERY_SLOW: 500,
} as const;

// Breakpoints (matching Tailwind CSS)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again.',
  NETWORK: 'Network error. Please check your connection.',
  UNAUTHORIZED: 'You are not authorized to perform this action.',
  NOT_FOUND: 'The requested resource was not found.',
  VALIDATION: 'Please check your input and try again.',
  FILE_TOO_LARGE: 'File size exceeds the maximum limit.',
  INVALID_FILE_TYPE: 'File type is not supported.',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  EMAIL_SENT: 'Email sent successfully!',
  EMAIL_SAVED: 'Email saved to drafts.',
  SETTINGS_UPDATED: 'Settings updated successfully.',
  FILE_UPLOADED: 'File uploaded successfully.',
  CALENDAR_EVENT_CREATED: 'Calendar event created.',
  CALENDAR_EVENT_UPDATED: 'Calendar event updated.',
} as const;

// Mock Data Flags (for Phase 1)
export const MOCK_DATA = {
  USE_MOCK_EMAILS: true,
  USE_MOCK_CALENDAR: true,
  USE_MOCK_CHAT: true,
  USE_MOCK_USER: true,
} as const;

// Feature Flags
export const FEATURE_FLAGS = {
  ENABLE_DARK_MODE: false,
  ENABLE_NOTIFICATIONS: false,
  ENABLE_REAL_TIME_SYNC: false,
  ENABLE_ADVANCED_SEARCH: false,
  ENABLE_EMAIL_TEMPLATES: false,
} as const;

export type RouteKey = keyof typeof ROUTES;
export type EmailCategory = typeof EMAIL_CATEGORIES[keyof typeof EMAIL_CATEGORIES];
export type EmailPriority = typeof EMAIL_PRIORITIES[keyof typeof EMAIL_PRIORITIES];
export type CalendarEventType = typeof CALENDAR_EVENT_TYPES[keyof typeof CALENDAR_EVENT_TYPES];
export type ChatMessageType = typeof CHAT_MESSAGE_TYPES[keyof typeof CHAT_MESSAGE_TYPES];
export type NotificationType = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES];


/**
 * Centralized Theme System for Outlook AI Assistant
 * Glassmorphic design with metallic silver and red color scheme
 */

export const theme = {
  // Color Palette - Metallic Silver and Red
  colors: {
    // Primary brand colors - Metallic Silver
    primary: {
      50: '#f8fafc',   // Lightest silver for backgrounds
      100: '#f1f5f9',  // Light silver for subtle highlights
      200: '#e2e8f0',  // Medium light silver
      300: '#cbd5e1',  // Medium silver for accents
      400: '#94a3b8',  // Primary silver for buttons and links
      500: '#64748b',  // Main brand silver
      600: '#475569',  // Darker silver for hover states
      700: '#334155',  // Dark silver for text
      800: '#1e293b',  // Darker silver
      900: '#0f172a',  // Darkest silver
    },
    
    // Accent colors - Red
    accent: {
      50: '#fef2f2',   // Lightest red for backgrounds
      100: '#fee2e2',  // Light red for subtle highlights
      200: '#fecaca',  // Medium light red
      300: '#fca5a5',  // Medium red for accents
      400: '#f87171',  // Primary red for buttons and links
      500: '#ef4444',  // Main brand red
      600: '#dc2626',  // Darker red for hover states
      700: '#b91c1c',  // Dark red for text
      800: '#991b1b',  // Darker red
      900: '#7f1d1d',  // Darkest red
    },
    
    // Neutral colors for glass effects and backgrounds
    neutral: {
      0: '#ffffff',     // Pure white for glass overlays
      50: '#fafafa',    // Off-white for light backgrounds
      100: '#f5f5f5',   // Light gray for subtle backgrounds
      200: '#e5e5e5',   // Light gray for borders
      300: '#d4d4d4',   // Medium light gray
      400: '#a3a3a3',   // Medium gray for secondary text
      500: '#737373',   // Medium dark gray for text
      600: '#525252',   // Dark gray for primary text
      700: '#404040',   // Darker gray
      800: '#262626',   // Very dark gray for dark mode
      900: '#171717',   // Almost black for dark backgrounds
    },
    
    // Glass effect colors with transparency - Metallic Silver tints
    glass: {
      white: 'rgba(255, 255, 255, 0.1)',           // White glass overlay
      whiteStrong: 'rgba(255, 255, 255, 0.2)',     // Stronger white glass
      dark: 'rgba(0, 0, 0, 0.1)',                  // Dark glass overlay
      darkStrong: 'rgba(0, 0, 0, 0.2)',            // Stronger dark glass
      silver: 'rgba(100, 116, 139, 0.1)',          // Silver tinted glass
      silverStrong: 'rgba(100, 116, 139, 0.2)',    // Stronger silver glass
      red: 'rgba(239, 68, 68, 0.1)',               // Red tinted glass
      redStrong: 'rgba(239, 68, 68, 0.2)',         // Stronger red glass
    },
    
    // Semantic colors
    success: '#10b981',   // Green for success states
    warning: '#f59e0b',   // Amber for warnings
    error: '#ef4444',     // Red for errors (matches accent)
    info: '#64748b',      // Silver for information (matches primary)
  },
  
  // Typography system
  typography: {
    // Font families
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],     // Primary font for UI
      mono: ['JetBrains Mono', 'monospace'],          // Monospace for code
      display: ['Inter', 'system-ui', 'sans-serif'],  // Display font for headings
    },
    
    // Font sizes with line heights
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],      // 12px - Small labels
      sm: ['0.875rem', { lineHeight: '1.25rem' }],  // 14px - Body small
      base: ['1rem', { lineHeight: '1.5rem' }],     // 16px - Body text
      lg: ['1.125rem', { lineHeight: '1.75rem' }],  // 18px - Large body
      xl: ['1.25rem', { lineHeight: '1.75rem' }],   // 20px - Small headings
      '2xl': ['1.5rem', { lineHeight: '2rem' }],    // 24px - Medium headings
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px - Large headings
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }], // 36px - Extra large headings
      '5xl': ['3rem', { lineHeight: '1' }],         // 48px - Display headings
    },
    
    // Font weights
    fontWeight: {
      light: '300',     // Light text
      normal: '400',    // Regular text
      medium: '500',    // Medium weight for emphasis
      semibold: '600',  // Semi-bold for headings
      bold: '700',      // Bold for strong emphasis
    },
  },
  
  // Spacing system (based on 4px grid)
  spacing: {
    px: '1px',
    0: '0',
    1: '0.25rem',   // 4px
    2: '0.5rem',    // 8px
    3: '0.75rem',   // 12px
    4: '1rem',      // 16px
    5: '1.25rem',   // 20px
    6: '1.5rem',    // 24px
    8: '2rem',      // 32px
    10: '2.5rem',   // 40px
    12: '3rem',     // 48px
    16: '4rem',     // 64px
    20: '5rem',     // 80px
    24: '6rem',     // 96px
    32: '8rem',     // 128px
  },
  
  // Border radius for glassmorphic design
  borderRadius: {
    none: '0',
    sm: '0.125rem',   // 2px - Small elements
    base: '0.25rem',  // 4px - Default buttons
    md: '0.375rem',   // 6px - Cards
    lg: '0.5rem',     // 8px - Large cards
    xl: '0.75rem',    // 12px - Modal dialogs
    '2xl': '1rem',    // 16px - Large containers
    '3xl': '1.5rem',  // 24px - Hero sections
    full: '9999px',   // Fully rounded
  },
  
  // Glassmorphic effects
  glass: {
    // Backdrop blur values
    blur: {
      none: '0',
      sm: '4px',      // Subtle blur for light glass
      base: '8px',    // Standard glass blur
      md: '12px',     // Medium blur for cards
      lg: '16px',     // Strong blur for modals
      xl: '24px',     // Extra strong blur
    },
    
    // Box shadow for glass elements - Updated for metallic effect
    shadow: {
      glass: '0 8px 32px 0 rgba(100, 116, 139, 0.37)',           // Standard glass shadow with silver tint
      glassStrong: '0 8px 32px 0 rgba(100, 116, 139, 0.5)',      // Strong glass shadow with silver tint
      glassLight: '0 4px 16px 0 rgba(100, 116, 139, 0.2)',       // Light glass shadow with silver tint
      glassRed: '0 8px 32px 0 rgba(239, 68, 68, 0.3)',           // Red accent glass shadow
    },
    
    // Border styles for glass elements
    border: {
      glass: '1px solid rgba(255, 255, 255, 0.18)',            // Standard glass border
      glassStrong: '1px solid rgba(255, 255, 255, 0.3)',       // Strong glass border
      glassSubtle: '1px solid rgba(255, 255, 255, 0.1)',       // Subtle glass border
      glassSilver: '1px solid rgba(100, 116, 139, 0.2)',       // Silver tinted glass border
      glassRed: '1px solid rgba(239, 68, 68, 0.2)',            // Red tinted glass border
    },
  },
  
  // Animation and transitions
  animation: {
    // Transition durations
    duration: {
      fast: '150ms',      // Quick interactions
      base: '200ms',      // Standard transitions
      slow: '300ms',      // Slower transitions
      slower: '500ms',    // Very slow transitions
    },
    
    // Easing functions
    easing: {
      linear: 'linear',
      ease: 'ease',
      easeIn: 'ease-in',
      easeOut: 'ease-out',
      easeInOut: 'ease-in-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',  // Spring-like animation
    },
  },
  
  // Breakpoints for responsive design
  breakpoints: {
    sm: '640px',    // Small devices
    md: '768px',    // Medium devices
    lg: '1024px',   // Large devices
    xl: '1280px',   // Extra large devices
    '2xl': '1536px', // 2X large devices
  },
  
  // Chat-specific styling
  chat: {
    // Chat container colors with glassmorphic effects
    container: {
      background: 'rgba(255, 255, 255, 0.15)',           // Glass background for chat container
      backgroundStrong: 'rgba(255, 255, 255, 0.25)',     // Stronger glass for expanded chat
      border: '1px solid rgba(255, 255, 255, 0.2)',      // Glass border
      borderStrong: '1px solid rgba(255, 255, 255, 0.3)', // Stronger glass border
    },
    
    // Message bubble colors
    messages: {
      user: {
        background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.9))', // Red gradient for user messages
        text: '#ffffff',                                   // White text on red background
        border: '1px solid rgba(239, 68, 68, 0.3)',      // Red tinted border
      },
      assistant: {
        background: 'rgba(100, 116, 139, 0.15)',         // Silver tinted glass for assistant
        backgroundStrong: 'rgba(100, 116, 139, 0.25)',   // Stronger silver glass
        text: '#334155',                                   // Dark silver text
        border: '1px solid rgba(100, 116, 139, 0.2)',    // Silver tinted border
      },
    },
    
    // Input field styling
    input: {
      background: 'rgba(255, 255, 255, 0.2)',            // Glass background for input
      backgroundFocus: 'rgba(255, 255, 255, 0.3)',       // Stronger glass on focus
      border: '1px solid rgba(255, 255, 255, 0.25)',     // Glass border
      borderFocus: '1px solid rgba(239, 68, 68, 0.4)',   // Red border on focus
      placeholder: 'rgba(100, 116, 139, 0.7)',           // Silver placeholder text
      text: '#334155',                                     // Dark silver text
    },
    
    // Drop shadows with red accent
    shadows: {
      container: '0 8px 32px 0 rgba(239, 68, 68, 0.15), 0 4px 16px 0 rgba(100, 116, 139, 0.1)', // Red + silver shadow
      containerStrong: '0 12px 48px 0 rgba(239, 68, 68, 0.25), 0 6px 24px 0 rgba(100, 116, 139, 0.15)', // Stronger red + silver
      userMessage: '0 4px 16px 0 rgba(239, 68, 68, 0.3)',   // Red shadow for user messages
      assistantMessage: '0 4px 16px 0 rgba(100, 116, 139, 0.2)', // Silver shadow for assistant messages
      input: '0 4px 16px 0 rgba(239, 68, 68, 0.1), 0 2px 8px 0 rgba(100, 116, 139, 0.1)', // Subtle red + silver for input
      inputFocus: '0 6px 24px 0 rgba(239, 68, 68, 0.2), 0 3px 12px 0 rgba(100, 116, 139, 0.15)', // Stronger on focus
    },
    
    // Animation and interaction states
    animations: {
      messageSlideIn: 'slideInFromBottom 0.3s ease-out',  // Message entrance animation
      typingPulse: 'pulse 1.5s ease-in-out infinite',     // Typing indicator animation
      containerExpand: 'expandUp 0.2s ease-out',          // Chat container expansion
    },
  },
  
  // Z-index layers
  zIndex: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,     // Docked elements
    dropdown: 1000, // Dropdown menus
    sticky: 1100,   // Sticky elements
    banner: 1200,   // Banners
    overlay: 1300,  // Overlays
    modal: 1400,    // Modal dialogs
    popover: 1500,  // Popovers
    skipLink: 1600, // Skip links
    toast: 1700,    // Toast notifications
    tooltip: 1800,  // Tooltips
    chat: 1350,     // Chat interface (between overlay and modal)
  },
} as const;

// Type definitions for theme
export type Theme = typeof theme;
export type ThemeColors = typeof theme.colors;
export type ThemeSpacing = typeof theme.spacing;

// Helper functions for theme usage
export const getColor = (path: string) => {
  const keys = path.split('.');
  let value: any = theme.colors;
  
  for (const key of keys) {
    value = value?.[key];
  }
  
  return value || path;
};

export const getSpacing = (key: keyof typeof theme.spacing) => {
  return theme.spacing[key];
};

export default theme;

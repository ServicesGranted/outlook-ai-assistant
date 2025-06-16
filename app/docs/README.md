
# Outlook AI Assistant

A modern, AI-powered email management application built with Next.js 14, featuring Microsoft OAuth authentication and a beautiful glassmorphic design.

## 🎯 Project Overview

The Outlook AI Assistant transforms the email experience with intelligent automation, smart scheduling, and AI-powered insights. This is Phase 2 of the project, featuring Microsoft OAuth authentication, protected routes, and user session management.

## 🏗️ Project Structure

```
outlook-ai-assistant/
├── app/                          # Next.js 14 App Router
│   ├── app/                      # Application pages
│   │   ├── page.tsx             # Landing page
│   │   ├── dashboard/           # Dashboard pages
│   │   ├── layout.tsx           # Root layout
│   │   └── globals.css          # Global styles
│   ├── components/              # Reusable components
│   │   ├── ui/                  # Base UI components
│   │   │   ├── button.tsx       # Button component
│   │   │   └── card.tsx         # Card component
│   │   └── layout/              # Layout components
│   │       ├── header.tsx       # Header component
│   │       └── layout.tsx       # Main layout wrapper
│   ├── theme/                   # Theme system
│   │   └── theme.ts             # Centralized theme configuration
│   ├── config/                  # Configuration files
│   │   ├── app.ts               # App configuration
│   │   └── constants.ts         # Application constants
│   ├── lib/                     # Utility libraries
│   ├── hooks/                   # Custom React hooks
│   └── docs/                    # Documentation
└── README.md                    # This file
```

## 🎨 Design System

### Theme Architecture

The application uses a centralized theme system located in `/theme/theme.ts` that defines:

- **Colors**: Primary, neutral, and glass effect colors with semantic naming
- **Typography**: Font families, sizes, weights, and line heights
- **Spacing**: Consistent spacing scale based on 4px grid
- **Glassmorphic Effects**: Backdrop blur, shadows, and border styles
- **Animation**: Transition durations and easing functions

### Design Principles

1. **Glassmorphic Design**: Inspired by n8n.io, activetheory.net, and huly.io
2. **Minimalist Approach**: Clean, uncluttered interfaces
3. **Consistent Spacing**: 4px grid system for all spacing
4. **Semantic Colors**: Meaningful color names tied to functionality
5. **Responsive Design**: Mobile-first approach with breakpoints

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Authentication**: NextAuth.js with Azure AD provider
- **Styling**: Tailwind CSS with custom theme integration
- **UI Components**: Custom components with Radix UI primitives
- **Icons**: Lucide React
- **State Management**: React hooks and NextAuth sessions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Yarn package manager
- Azure AD application registration (see Authentication Setup below)

### Installation

1. Navigate to the app directory:
   ```bash
   cd outlook-ai-assistant/app
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Azure AD credentials
   ```

4. Start the development server:
   ```bash
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔐 Authentication Setup

### Azure AD Application Registration

1. **Go to Azure Portal**
   - Navigate to [Azure Portal](https://portal.azure.com)
   - Go to "Azure Active Directory" > "App registrations"

2. **Create New Registration**
   - Click "New registration"
   - Name: "Outlook AI Assistant"
   - Supported account types: "Accounts in this organizational directory only"
   - Redirect URI: `http://localhost:3000/api/auth/callback/azure-ad`

3. **Configure Application**
   - Note down the **Application (client) ID**
   - Note down the **Directory (tenant) ID**
   - Go to "Certificates & secrets" > "New client secret"
   - Note down the **Client secret value**

4. **Set API Permissions**
   - Go to "API permissions"
   - Add permissions for Microsoft Graph:
     - `User.Read` (delegated)
     - `Mail.Read` (delegated)
     - `Calendars.Read` (delegated)
   - Grant admin consent

### Environment Configuration

Create a `.env.local` file in the app directory:

```env
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secure-random-secret-key

# Microsoft Azure AD Configuration
AZURE_AD_CLIENT_ID=your-application-client-id
AZURE_AD_CLIENT_SECRET=your-client-secret-value
AZURE_AD_TENANT_ID=your-directory-tenant-id

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Important**: Replace the placeholder values with your actual Azure AD credentials.

## 📱 Features (Phase 2)

### Authentication
- **Microsoft OAuth**: Secure login with Azure AD
- **Protected Routes**: Dashboard requires authentication
- **Session Management**: Persistent login sessions
- **User Information**: Display user name and email
- **Sign Out**: Clear session and redirect to landing page

### Landing Page
- Hero section with Microsoft sign-in integration
- Feature showcase with glassmorphic cards
- Functional authentication flow
- Responsive design with smooth animations

### Dashboard
- **Personalized Welcome**: Shows user's name and email
- **Protected Access**: Requires authentication to view
- Overview statistics cards with mock data
- Email list placeholder with mock data
- Calendar section with today's schedule
- AI assistant suggestions panel
- Navigation header with user info and sign out

### Authentication Components
- **SignInButton**: Triggers Microsoft OAuth flow
- **SignOutButton**: Clears session and redirects
- **AuthGuard**: Protects routes and handles loading states
- **AuthProvider**: Wraps app with NextAuth SessionProvider

## 🎯 Phase 2 Scope

**Included:**
- ✅ Microsoft OAuth authentication
- ✅ Protected dashboard route
- ✅ User session management
- ✅ Personalized user interface
- ✅ Authentication error handling
- ✅ Loading states during auth
- ✅ Sign in/out functionality
- ✅ Project structure and configuration
- ✅ Centralized theme system
- ✅ Glassmorphic design system
- ✅ Responsive design

**Not Included (Future Phases):**
- ❌ Real email integration
- ❌ Calendar synchronization
- ❌ AI chat functionality
- ❌ Database integration
- ❌ Real-time notifications

## 🎨 Styling Guidelines

### Using the Theme System

All components should reference the centralized theme:

```typescript
import { theme } from '@/theme/theme';

// Use theme colors
className="bg-primary-500 text-white"

// Use theme spacing
className="p-4 m-6"

// Use glassmorphic effects
className="bg-glass-white backdrop-blur-glass shadow-glass"
```

### Component Patterns

1. **Glass Effects**: Use `variant="glass"` for glassmorphic styling
2. **Hover States**: Include subtle hover animations
3. **Focus States**: Ensure keyboard accessibility
4. **Responsive**: Mobile-first responsive design

## 📝 Configuration

### App Configuration (`/config/app.ts`)
- Application metadata
- Feature flags for different phases
- Environment-specific settings
- External service configurations

### Constants (`/config/constants.ts`)
- Route definitions
- API endpoints
- Storage keys
- Error/success messages
- Mock data flags

## 🔧 Development Guidelines

### File Naming
- Use kebab-case for file names: `email-list.tsx`
- Use PascalCase for component names: `EmailList`
- Use camelCase for functions and variables

### Component Structure
```typescript
'use client'; // If client-side features needed

import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps {
  // Props definition
}

export const Component: React.FC<ComponentProps> = ({ 
  // Props destructuring
}) => {
  return (
    // JSX
  );
};
```

### Styling Best Practices
- Always use theme variables instead of hardcoded values
- Prefer Tailwind utilities over custom CSS
- Use glassmorphic variants for cards and overlays
- Implement hover and focus states for interactive elements

## 🚀 Future Roadmap

### Phase 2: Authentication & Integration
- Microsoft OAuth integration
- User session management
- Real email API connections

### Phase 3: AI Features
- OpenAI integration for email assistance
- Smart email categorization
- Automated responses

### Phase 4: Advanced Features
- Real-time synchronization
- Advanced search and filtering
- Email templates and automation

## 🤝 Contributing

1. Follow the established file structure
2. Use the centralized theme system
3. Maintain glassmorphic design consistency
4. Write TypeScript with proper type definitions
5. Test responsive design across breakpoints

## 📄 License

This project is part of a development exercise and is not intended for production use without proper authentication and security implementations.

---

**Note**: This is Phase 1 focusing on UI/UX and project structure. Real integrations and authentication will be implemented in subsequent phases.

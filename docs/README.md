
# Outlook AI Assistant

A modern, intelligent assistant for Microsoft Outlook that helps you manage emails, schedule meetings, and boost productivity with AI-powered insights.

## Features

### 🤖 AI-Powered Chat Assistant
- Real-time conversation with AI for productivity help
- Contextual assistance for email, calendar, and task management
- Support for multiple AI providers (OpenAI, Azure OpenAI, Anthropic)
- Smart error handling and fallback systems

### 📧 Email Management
- Intelligent email organization and prioritization
- Draft assistance and template suggestions
- Inbox zero strategies and automation tips
- Email analytics and insights

### 📅 Calendar & Scheduling
- Smart meeting scheduling assistance
- Calendar optimization recommendations
- Time-blocking strategies
- Meeting preparation and follow-up guidance

### ✅ Task & Productivity Management
- Task prioritization frameworks
- Productivity insights and recommendations
- Goal setting and tracking assistance
- Work-life balance optimization

### 🎨 Modern Design
- Glassmorphic UI with metallic silver and red theme
- Fully responsive design for all devices
- Smooth animations and transitions
- Accessible and user-friendly interface

## Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn
- Microsoft Azure AD app registration (for authentication)
- An AI provider API key (OpenAI, Azure OpenAI, or Anthropic)

### Development Setup

1. **Clone and setup the project:**
   ```bash
   git clone <repository-url>
   cd outlook-ai-assistant/app
   yarn install
   ```

2. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```

3. **Set up Azure AD (Required for Authentication):**
   - Go to [Azure Portal](https://portal.azure.com/)
   - Create an App Registration in Azure Active Directory
   - Configure redirect URI: `http://localhost:3000/api/auth/callback/azure-ad`
   - Get your Client ID, Client Secret, and Tenant ID

4. **Add your configuration to `.env.local`:**
   ```env
   # NextAuth.js Configuration
   NEXTAUTH_SECRET=your-super-secret-jwt-key-here
   NEXTAUTH_URL=http://localhost:3000
   
   # Azure AD Configuration
   AZURE_AD_CLIENT_ID=your-client-id-from-azure
   AZURE_AD_CLIENT_SECRET=your-client-secret-from-azure
   AZURE_AD_TENANT_ID=your-tenant-id-from-azure
   
   # AI Provider Configuration
   AI_PROVIDER=openai
   OPENAI_API_KEY=your-openai-api-key-here
   OPENAI_MODEL=gpt-4
   ```

5. **Generate NextAuth Secret:**
   ```bash
   # Generate a secure secret for JWT signing
   openssl rand -base64 32
   ```

6. **Start the development server:**
   ```bash
   yarn dev
   ```

7. **Open your browser:**
   Navigate to `http://localhost:3000` and sign in with your Microsoft account!

### Production Deployment

For production deployment, see our comprehensive [Deployment Guide](./DEPLOYMENT_GUIDE.md) which covers:
- Azure AD configuration for production
- Environment variable setup
- Deployment to Vercel, Netlify, or custom servers
- Security best practices
- Troubleshooting common issues

## AI Provider Setup

### OpenAI (Recommended)
1. Get an API key from [OpenAI Platform](https://platform.openai.com/)
2. Add to your `.env.local`:
   ```env
   AI_PROVIDER=openai
   OPENAI_API_KEY=sk-your-key-here
   OPENAI_MODEL=gpt-4
   ```

### Azure OpenAI
1. Set up Azure OpenAI resource in Azure Portal
2. Deploy a model and get your endpoint
3. Add to your `.env.local`:
   ```env
   AI_PROVIDER=azure-openai
   AZURE_OPENAI_API_KEY=your-azure-key
   AZURE_OPENAI_ENDPOINT=https://your-resource.openai.azure.com
   AZURE_OPENAI_MODEL=gpt-4
   ```

### Anthropic
1. Get an API key from [Anthropic Console](https://console.anthropic.com/)
2. Add to your `.env.local`:
   ```env
   AI_PROVIDER=anthropic
   ANTHROPIC_API_KEY=your-anthropic-key
   ANTHROPIC_MODEL=claude-3-sonnet-20240229
   ```

## Customizing Your AI Assistant

### Personalizing AI Behavior

The AI's personality and capabilities are defined in `/context/prompt-context.txt`. You can customize this file to:

- **Change the AI's tone:** Make it more formal, casual, or industry-specific
- **Add company policies:** Include your organization's meeting rules or email guidelines
- **Customize templates:** Add your preferred email signatures or meeting formats
- **Focus on specific areas:** Emphasize certain productivity methodologies

**Example customizations:**

```text
# Make the AI more formal
You maintain a professional and formal tone at all times, using proper business language.

# Add company-specific guidance
When scheduling meetings, remind users that our company policy limits meetings to 50 minutes with 10-minute breaks.

# Customize email signatures
When drafting emails, suggest including our standard signature format:
[Name] | [Title] | [Company] | [Email] | [Phone]
```

### Adjusting AI Settings

Fine-tune the AI's responses by modifying environment variables:

```env
# More creative responses
OPENAI_TEMPERATURE=1.0

# More focused responses  
OPENAI_TEMPERATURE=0.3

# Longer responses
OPENAI_MAX_TOKENS=3000

# Enable response caching
AI_CACHING_ENABLED=true
AI_CACHE_TTL_MINUTES=10
```

## Usage Examples

### Email Management
- "Help me organize my inbox"
- "Draft a response to Sarah about the project deadline"
- "What emails need my immediate attention?"
- "Create a template for meeting follow-ups"

### Calendar Scheduling
- "Find time for a 1-hour meeting with the marketing team"
- "What's my schedule looking like tomorrow?"
- "Help me reschedule my 2 PM call"
- "Block time for focused work this week"

### Productivity & Tasks
- "Show me my pending tasks"
- "Help me prioritize my work for today"
- "What productivity tips do you recommend?"
- "How can I better manage my time?"

## Configuration Options

### Rate Limiting
Control API usage to manage costs:

```env
AI_RATE_LIMITING_ENABLED=true
AI_MAX_REQUESTS_PER_MINUTE=20
AI_MAX_REQUESTS_PER_HOUR=100
```

### Fallback Providers
Set up backup AI providers for reliability:

```env
AI_FALLBACK_ENABLED=true
AI_FALLBACK_PROVIDERS=openai,azure-openai
```

### Security Settings
The application includes built-in security features:
- Input validation and sanitization
- Content filtering for inappropriate requests
- Rate limiting to prevent abuse
- Secure API key handling

## Troubleshooting

### Authentication Issues

**"Configuration Error" when signing in**
- **Cause:** Missing or incorrect environment variables
- **Solution:** 
  1. Verify all required environment variables are set in `.env.local`
  2. Generate a new `NEXTAUTH_SECRET` using `openssl rand -base64 32`
  3. Ensure `NEXTAUTH_URL` matches your current domain exactly
  4. Restart the development server after making changes

**"Access Denied" error**
- **Cause:** Azure AD configuration or permissions issue
- **Solution:**
  1. Check that your Azure AD app has the correct redirect URI
  2. Verify API permissions are granted in Azure AD
  3. Ensure your Microsoft account has necessary permissions

**"OAuth Callback Error"**
- **Cause:** Redirect URI mismatch between Azure AD and your application
- **Solution:**
  1. In Azure AD, set redirect URI to: `http://localhost:3000/api/auth/callback/azure-ad` (development)
  2. For production: `https://your-domain.com/api/auth/callback/azure-ad`
  3. Ensure no trailing slashes or extra characters

**Sign-in button doesn't work**
- **Cause:** Missing Azure AD configuration
- **Solution:**
  1. Complete Azure AD app registration setup
  2. Add all required environment variables
  3. Check browser console for error messages

### AI Service Issues

**"AI service is temporarily unavailable"**
- Check your API key in `.env.local`
- Verify your API key has sufficient credits
- Ensure your internet connection is stable

**Chat button shows a warning icon**
- The AI service health check failed
- Check the browser console for error details
- Verify your environment variables are correct

**Responses are too generic**
- The context file might not be loading properly
- Check that `/context/prompt-context.txt` exists
- Review the file for any formatting issues

**"Too many requests" error**
- Rate limiting has been triggered
- Wait a few minutes before trying again
- Consider adjusting rate limits in your environment variables

### Development Issues

**Build failures**
- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors: `npm run build`
- Verify Node.js version is 18 or higher

**Environment variables not loading**
- Ensure `.env.local` is in the correct directory (`/app/.env.local`)
- Restart the development server after changing environment variables
- Check that variable names match exactly (case-sensitive)

### Getting Detailed Logs

1. Open browser developer tools (F12)
2. Check the Console tab for error messages
3. Look at the Network tab to see API request details
4. Check the terminal running the dev server for server-side logs

## Development

### Project Structure
```
outlook-ai-assistant/
├── app/                          # Next.js application
│   ├── app/                      # App router pages
│   ├── components/               # React components
│   │   ├── chat/                # Chat interface components
│   │   ├── dashboard/           # Dashboard components
│   │   └── ui/                  # Reusable UI components
│   ├── config/                  # Configuration files
│   ├── lib/                     # Utility libraries
│   └── theme/                   # Theme and styling
├── context/                     # AI prompt context
└── docs/                        # Documentation
```

### Key Technologies
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Radix UI** - Accessible component primitives

### Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## Security & Privacy

### Data Handling
- No personal data is stored permanently
- Conversations are not logged or saved
- API keys are handled securely through environment variables
- All communication with AI providers is encrypted

### Best Practices
- Regularly rotate your API keys
- Monitor API usage for unusual activity
- Keep the application updated
- Use environment variables for all sensitive configuration

## Cost Management

### Estimating Usage Costs

**OpenAI Pricing (approximate):**
- GPT-4: $0.03 per 1K input tokens, $0.06 per 1K output tokens
- GPT-3.5-turbo: $0.001 per 1K input tokens, $0.002 per 1K output tokens

**Cost Optimization Tips:**
- Use GPT-3.5-turbo for simple queries
- Enable caching to reduce duplicate requests
- Set appropriate rate limits
- Monitor token usage in API responses

### Usage Monitoring
- Check your AI provider's dashboard for usage statistics
- Monitor the application logs for request patterns
- Set up billing alerts with your AI provider

## Support

### Documentation
- [AI Setup Guide](./AI_SETUP_GUIDE.md) - Detailed AI configuration instructions
- [API Reference](./API_REFERENCE.md) - Technical API documentation

### Getting Help
1. Check this README and the setup guide
2. Review the troubleshooting section
3. Check the browser console for error messages
4. Verify your environment configuration
5. Test your API key directly with your provider

### Reporting Issues
When reporting issues, please include:
- Your environment configuration (without API keys)
- Browser console error messages
- Steps to reproduce the problem
- Expected vs actual behavior

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing powerful language models
- Anthropic for Claude AI capabilities
- Microsoft for Outlook integration possibilities
- The open-source community for the amazing tools and libraries

---

**Ready to boost your productivity?** Start by setting up your AI provider and customizing the assistant to match your workflow. The AI is here to help you work smarter, not harder! 🚀

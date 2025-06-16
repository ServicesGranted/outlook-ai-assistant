
import { NextAuthOptions } from 'next-auth'
import AzureADProvider from 'next-auth/providers/azure-ad'

// Validate required environment variables
const requiredEnvVars = {
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  AZURE_AD_CLIENT_ID: process.env.AZURE_AD_CLIENT_ID,
  AZURE_AD_CLIENT_SECRET: process.env.AZURE_AD_CLIENT_SECRET,
  AZURE_AD_TENANT_ID: process.env.AZURE_AD_TENANT_ID,
}

// Check for missing environment variables
const missingVars = Object.entries(requiredEnvVars)
  .filter(([key, value]) => !value)
  .map(([key]) => key)

if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars.join(', '))
  console.error('Please check your .env.local file and ensure all required variables are set.')
}

export const authOptions: NextAuthOptions = {
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: {
        params: {
          scope: 'openid profile email User.Read Mail.Read Calendars.Read'
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      if (profile) {
        token.email = profile.email
        token.name = profile.name
        token.picture = (profile as any).picture
      }
      return token
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string
      session.refreshToken = token.refreshToken as string
      return session
    },
    async redirect({ url, baseUrl }) {
      // Handle redirect after authentication
      try {
        // If url is relative, prepend baseUrl
        if (url.startsWith('/')) {
          return `${baseUrl}${url}`
        }
        // If url is from the same origin, allow it
        if (new URL(url).origin === baseUrl) {
          return url
        }
        // Default redirect to dashboard
        return `${baseUrl}/dashboard`
      } catch (error) {
        console.error('Redirect callback error:', error)
        return `${baseUrl}/dashboard`
      }
    },
    async signIn({ user, account, profile, email, credentials }) {
      // Add additional sign-in validation if needed
      try {
        return true
      } catch (error) {
        console.error('Sign-in callback error:', error)
        return false
      }
    }
  },
  pages: {
    signIn: '/',
    error: '/auth/error'
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
  logger: {
    error(code, metadata) {
      console.error('NextAuth Error:', code, metadata)
    },
    warn(code) {
      console.warn('NextAuth Warning:', code)
    },
    debug(code, metadata) {
      if (process.env.NODE_ENV === 'development') {
        console.log('NextAuth Debug:', code, metadata)
      }
    }
  }
}

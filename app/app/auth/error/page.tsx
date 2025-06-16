
'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Layout } from '@/components/layout/layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, ArrowLeft } from 'lucide-react'
import { SignInButton } from '@/components/auth/sign-in-button'

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams?.get('error') || null

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return {
          title: 'Server Configuration Error',
          message: 'There is a problem with the server configuration. This usually means missing or incorrect environment variables.',
          details: 'Please check that NEXTAUTH_SECRET, NEXTAUTH_URL, and Azure AD credentials are properly configured.'
        }
      case 'AccessDenied':
        return {
          title: 'Access Denied',
          message: 'Access was denied. Please check your permissions.',
          details: 'Make sure your Microsoft account has the necessary permissions and your Azure AD app is configured correctly.'
        }
      case 'Verification':
        return {
          title: 'Verification Failed',
          message: 'The verification token has expired or has already been used.',
          details: 'Please try signing in again. If the problem persists, clear your browser cookies and try again.'
        }
      case 'OAuthSignin':
        return {
          title: 'OAuth Sign-in Error',
          message: 'Error in constructing an authorization URL.',
          details: 'Check your Azure AD configuration and redirect URIs.'
        }
      case 'OAuthCallback':
        return {
          title: 'OAuth Callback Error',
          message: 'Error in handling the response from the OAuth provider.',
          details: 'Verify your Azure AD app secret and redirect URI configuration.'
        }
      case 'OAuthCreateAccount':
        return {
          title: 'Account Creation Error',
          message: 'Could not create OAuth account in the database.',
          details: 'This may be a temporary issue. Please try again.'
        }
      case 'EmailCreateAccount':
        return {
          title: 'Email Account Error',
          message: 'Could not create email account in the database.',
          details: 'This may be a temporary issue. Please try again.'
        }
      case 'Callback':
        return {
          title: 'Callback Error',
          message: 'Error in the OAuth callback handler route.',
          details: 'Check server logs for more details about this error.'
        }
      case 'OAuthAccountNotLinked':
        return {
          title: 'Account Not Linked',
          message: 'Another account with the same email address already exists.',
          details: 'Try signing in with a different method or contact support.'
        }
      case 'EmailSignin':
        return {
          title: 'Email Sign-in Error',
          message: 'Sending the email with the verification token failed.',
          details: 'Check your email configuration or try again later.'
        }
      case 'CredentialsSignin':
        return {
          title: 'Credentials Error',
          message: 'The authorize callback returned null.',
          details: 'Check your credentials and try again.'
        }
      case 'SessionRequired':
        return {
          title: 'Session Required',
          message: 'The content of this page requires you to be signed in at all times.',
          details: 'Please sign in to continue.'
        }
      default:
        return {
          title: 'Authentication Error',
          message: 'An unexpected error occurred during authentication.',
          details: error ? `Error code: ${error}` : 'Please try again or contact support if the problem persists.'
        }
    }
  }

  const errorInfo = getErrorMessage(error)

  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div className="max-w-lg w-full">
        <Card variant="glass" className="p-8">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-neutral-800">
              {errorInfo.title}
            </CardTitle>
            <CardDescription className="text-neutral-600 mb-4">
              {errorInfo.message}
            </CardDescription>
            {errorInfo.details && (
              <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-4 text-left">
                <p className="text-sm text-neutral-700 font-medium mb-2">Troubleshooting:</p>
                <p className="text-sm text-neutral-600">{errorInfo.details}</p>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            <SignInButton className="w-full">
              <span>Try Again</span>
            </SignInButton>
            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => window.location.href = '/'}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            {process.env.NODE_ENV === 'development' && error && (
              <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-xs text-yellow-800 font-medium">Development Info:</p>
                <p className="text-xs text-yellow-700 font-mono">Error Code: {error}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function AuthErrorPage() {
  return (
    <Layout>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center py-12">
          <Card variant="glass" className="p-8">
            <CardContent className="flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
              <span className="text-neutral-600">Loading...</span>
            </CardContent>
          </Card>
        </div>
      }>
        <AuthErrorContent />
      </Suspense>
    </Layout>
  )
}

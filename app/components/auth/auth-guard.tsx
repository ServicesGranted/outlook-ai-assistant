
'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'

interface AuthGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { data: session, status } = useSession()
  const router = useRouter()

  // Temporarily allow access for testing - remove this in production
  const isTestMode = process.env.NODE_ENV === 'development'
  
  useEffect(() => {
    if (!isTestMode && status === 'unauthenticated') {
      router.push('/')
    }
  }, [status, router, isTestMode])

  if (!isTestMode && status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
        <Card variant="glass" className="p-8">
          <CardContent className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
            <span className="text-neutral-600">Loading...</span>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isTestMode && status === 'unauthenticated') {
    return fallback || (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100">
        <Card variant="glass" className="p-8">
          <CardContent className="text-center">
            <h2 className="text-xl font-semibold text-neutral-800 mb-2">
              Authentication Required
            </h2>
            <p className="text-neutral-600">
              Please sign in to access this page.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}

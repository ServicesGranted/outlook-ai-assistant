
'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Mail, ArrowRight } from 'lucide-react'

interface SignInButtonProps {
  size?: 'sm' | 'default' | 'lg'
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'glass' | 'destructive'
  className?: string
  children?: React.ReactNode
}

export function SignInButton({ 
  size = 'lg', 
  variant = 'primary', 
  className = '',
  children 
}: SignInButtonProps) {
  const handleSignIn = () => {
    signIn('azure-ad', { callbackUrl: '/dashboard' })
  }

  return (
    <Button 
      size={size}
      variant={variant}
      className={`flex items-center space-x-2 ${className}`}
      onClick={handleSignIn}
    >
      {children || (
        <>
          <Mail className="w-5 h-5" />
          <span>Sign In with Microsoft</span>
          <ArrowRight className="w-5 h-5" />
        </>
      )}
    </Button>
  )
}

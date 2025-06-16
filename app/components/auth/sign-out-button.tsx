
'use client'

import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

interface SignOutButtonProps {
  size?: 'sm' | 'default' | 'lg'
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'glass' | 'destructive'
  className?: string
}

export function SignOutButton({ 
  size = 'default', 
  variant = 'ghost', 
  className = '' 
}: SignOutButtonProps) {
  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <Button 
      size={size}
      variant={variant}
      className={`flex items-center space-x-2 ${className}`}
      onClick={handleSignOut}
    >
      <LogOut className="w-4 h-4" />
      <span>Sign Out</span>
    </Button>
  )
}

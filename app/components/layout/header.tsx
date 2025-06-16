
'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { SignOutButton } from '@/components/auth/sign-out-button';
import { Mail, Calendar, MessageSquare, Settings, User } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showNavigation?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  title = 'Outlook AI Assistant', 
  showNavigation = false 
}) => {
  const { data: session } = useSession();
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="bg-glass-white backdrop-blur-glass border-b border-white/20 shadow-glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-semibold text-neutral-700">
                {title}
              </h1>
            </div>

            {/* Navigation */}
            {showNavigation && (
              <nav className="hidden md:flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50">
                  <Mail className="w-4 h-4" />
                  <span>Emails</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50">
                  <Calendar className="w-4 h-4" />
                  <span>Calendar</span>
                </Button>
                <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-accent-600 hover:text-accent-700 hover:bg-accent-50">
                  <MessageSquare className="w-4 h-4" />
                  <span>AI Chat</span>
                </Button>
              </nav>
            )}

            {/* User Actions */}
            <div className="flex items-center space-x-2">
              {session ? (
                <>
                  {/* User Info */}
                  <div className="hidden sm:flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-white/40 to-white/20 rounded-lg border border-white/20">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-primary-600" />
                    </div>
                    <span className="text-sm text-neutral-700 font-medium">
                      {session.user?.name?.split(' ')[0] || 'User'}
                    </span>
                  </div>
                  
                  {showNavigation && (
                    <Button variant="ghost" size="sm">
                      <Settings className="w-4 h-4" />
                    </Button>
                  )}
                  
                  <SignOutButton size="sm" />
                </>
              ) : (
                showNavigation && (
                  <Button variant="ghost" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

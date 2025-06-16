
'use client';

import React from 'react';
import { Header } from './header';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  showNavigation?: boolean;
  className?: string;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title, 
  showNavigation = false,
  className = ''
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/30 to-neutral-100">
      <Header title={title} showNavigation={showNavigation} />
      <main className={`${className}`}>
        {children}
      </main>
    </div>
  );
};

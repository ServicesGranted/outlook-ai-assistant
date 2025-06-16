
'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { theme } from '@/theme/theme';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass' | 'outline' | 'destructive';
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'default';
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center rounded-md font-medium
      transition-all duration-200 ease-in-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
    `;

    const variants = {
      primary: `
        bg-primary-500 text-white border border-primary-600
        hover:bg-primary-600 hover:shadow-lg
        focus:ring-primary-500
        active:bg-primary-700
      `,
      secondary: `
        bg-neutral-100 text-neutral-700 border border-neutral-200
        hover:bg-neutral-200 hover:shadow-md
        focus:ring-neutral-500
        active:bg-neutral-300
      `,
      ghost: `
        bg-transparent text-neutral-600 border border-transparent
        hover:bg-neutral-100 hover:text-neutral-700
        focus:ring-neutral-500
        active:bg-neutral-200
      `,
      glass: `
        bg-glass-white text-neutral-700 border border-white/20
        backdrop-blur-glass shadow-glass
        hover:bg-glass-whiteStrong hover:shadow-glass-strong
        focus:ring-primary-500/50
        active:bg-white/30
      `,
      outline: `
        bg-transparent text-neutral-700 border border-neutral-300
        hover:bg-neutral-100 hover:text-neutral-700
        focus:ring-neutral-500
        active:bg-neutral-200
      `,
      destructive: `
        bg-red-500 text-white border border-red-600
        hover:bg-red-600 hover:shadow-lg
        focus:ring-red-500
        active:bg-red-700
      `,
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      icon: 'h-10 w-10 p-0',
      default: 'px-4 py-2 text-base',
    };

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

// Export buttonVariants for compatibility with existing components
export const buttonVariants = (props: { variant?: string; size?: string } = {}) => {
  const { variant = 'primary', size = 'md' } = props;
  const baseStyles = `
    inline-flex items-center justify-center rounded-md font-medium
    transition-all duration-200 ease-in-out
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variants = {
    primary: `
      bg-primary-500 text-white border border-primary-600
      hover:bg-primary-600 hover:shadow-lg
      focus:ring-primary-500
      active:bg-primary-700
    `,
    secondary: `
      bg-neutral-100 text-neutral-700 border border-neutral-200
      hover:bg-neutral-200 hover:shadow-md
      focus:ring-neutral-500
      active:bg-neutral-300
    `,
    ghost: `
      bg-transparent text-neutral-600 border border-transparent
      hover:bg-neutral-100 hover:text-neutral-700
      focus:ring-neutral-500
      active:bg-neutral-200
    `,
    glass: `
      bg-glass-white text-neutral-700 border border-white/20
      backdrop-blur-glass shadow-glass
      hover:bg-glass-whiteStrong hover:shadow-glass-strong
      focus:ring-primary-500/50
      active:bg-white/30
    `,
    outline: `
      bg-transparent text-neutral-700 border border-neutral-300
      hover:bg-neutral-100 hover:text-neutral-700
      focus:ring-neutral-500
      active:bg-neutral-200
    `,
    destructive: `
      bg-red-500 text-white border border-red-600
      hover:bg-red-600 hover:shadow-lg
      focus:ring-red-500
      active:bg-red-700
    `,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'h-10 w-10',
  };

  return `${baseStyles} ${variants[variant as keyof typeof variants] || variants.primary} ${sizes[size as keyof typeof sizes] || sizes.md}`;
};

export { Button };
export type { ButtonProps };

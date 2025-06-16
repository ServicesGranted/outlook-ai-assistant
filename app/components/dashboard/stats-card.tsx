
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
  variant?: 'default' | 'accent' | 'success' | 'warning';
}

const getVariantStyles = (variant: string) => {
  switch (variant) {
    case 'accent':
      return {
        iconBg: 'bg-accent-100 text-accent-600',
        valueBg: 'text-neutral-800',
        trendPositive: 'text-accent-600',
        trendNegative: 'text-accent-500'
      };
    case 'success':
      return {
        iconBg: 'bg-green-100 text-green-600',
        valueBg: 'text-neutral-800',
        trendPositive: 'text-green-600',
        trendNegative: 'text-red-500'
      };
    case 'warning':
      return {
        iconBg: 'bg-yellow-100 text-yellow-600',
        valueBg: 'text-neutral-800',
        trendPositive: 'text-green-600',
        trendNegative: 'text-red-500'
      };
    default:
      return {
        iconBg: 'bg-primary-100 text-primary-600',
        valueBg: 'text-neutral-800',
        trendPositive: 'text-green-600',
        trendNegative: 'text-red-500'
      };
  }
};

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon, 
  trend, 
  className,
  variant = 'default'
}: StatsCardProps) {
  const styles = getVariantStyles(variant);

  return (
    <Card 
      variant="glass" 
      className={cn(
        "hover:scale-105 transition-all duration-200 hover:shadow-lg group",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-neutral-600">
          {title}
        </CardTitle>
        <div className={cn("p-2 rounded-lg", styles.iconBg)}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold mb-1", styles.valueBg)}>
          {value}
        </div>
        {(description || trend) && (
          <div className="flex items-center justify-between">
            {description && (
              <p className="text-xs text-neutral-500">
                {description}
              </p>
            )}
            {trend && (
              <p className={cn(
                "text-xs font-medium",
                trend.isPositive ? styles.trendPositive : styles.trendNegative
              )}>
                {trend.isPositive ? '+' : ''}{trend.value}
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

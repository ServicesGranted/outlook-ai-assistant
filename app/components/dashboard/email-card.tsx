
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Mail, 
  Clock, 
  Paperclip, 
  Star, 
  AlertTriangle,
  ChevronRight,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmailItem {
  id: string;
  subject: string;
  sender: {
    name: string;
    email: string;
    initials: string;
  };
  shortDescription?: string;
  timestamp?: string;
  receivedDate?: string;
  daysSinceReceived?: number;
  priority: 'high' | 'medium' | 'low';
  hasAttachment?: boolean;
  category: string;
}

interface EmailCardProps {
  title: string;
  description?: string;
  emails: EmailItem[];
  icon: React.ReactNode;
  onEmailClick?: (email: EmailItem) => void;
  onViewAll?: () => void;
  className?: string;
  variant?: 'unread' | 'unreplied' | 'unfiled';
}

const formatTimeAgo = (timestamp: string) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInHours = Math.floor((now.getTime() - time.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'text-accent-600 bg-accent-50 border-accent-200';
    case 'medium': return 'text-primary-600 bg-primary-50 border-primary-200';
    case 'low': return 'text-neutral-600 bg-neutral-50 border-neutral-200';
    default: return 'text-neutral-600 bg-neutral-50 border-neutral-200';
  }
};

export function EmailCard({ 
  title, 
  description, 
  emails, 
  icon, 
  onEmailClick, 
  onViewAll, 
  className,
  variant = 'unread'
}: EmailCardProps) {
  return (
    <Card variant="glass" className={cn("h-full", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary-100 text-primary-600">
              {icon}
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-neutral-800">
                {title}
              </CardTitle>
              {description && (
                <CardDescription className="text-sm text-neutral-500 mt-1">
                  {description}
                </CardDescription>
              )}
            </div>
          </div>
          <Badge variant="secondary" className="bg-primary-100 text-primary-700">
            {emails.length}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {emails.slice(0, 4).map((email) => (
            <div
              key={email.id}
              onClick={() => onEmailClick?.(email)}
              className="group p-4 rounded-lg bg-white/60 hover:bg-white/80 border border-white/20 hover:border-primary-200 transition-all duration-200 cursor-pointer hover:shadow-md"
            >
              <div className="flex items-start space-x-3">
                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                  {email.sender.initials}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-neutral-800 truncate">
                      {email.sender.name}
                    </p>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {email.priority === 'high' && (
                        <AlertTriangle className="w-4 h-4 text-accent-500" />
                      )}
                      {email.hasAttachment && (
                        <Paperclip className="w-4 h-4 text-neutral-400" />
                      )}
                      <span className="text-xs text-neutral-500">
                        {variant === 'unreplied' && email.daysSinceReceived 
                          ? `${email.daysSinceReceived}d ago`
                          : email.timestamp 
                          ? formatTimeAgo(email.timestamp)
                          : email.receivedDate 
                          ? formatTimeAgo(email.receivedDate)
                          : ''
                        }
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm font-medium text-neutral-700 truncate mb-1">
                    {email.subject}
                  </p>
                  
                  {email.shortDescription && (
                    <p className="text-xs text-neutral-500 line-clamp-2 mb-2">
                      {email.shortDescription}
                    </p>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className={cn("text-xs", getPriorityColor(email.priority))}
                    >
                      {email.category}
                    </Badge>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {emails.length === 0 && (
            <div className="text-center py-8">
              <Mail className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-sm text-neutral-500">No emails to display</p>
            </div>
          )}
          
          {emails.length > 4 && (
            <div className="text-center pt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onViewAll}
                className="text-primary-600 hover:text-primary-700 hover:bg-primary-50"
              >
                View all {emails.length} emails
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

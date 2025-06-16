
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  Clock, 
  ChevronRight,
  AlertTriangle,
  Calendar,
  MessageCircle,
  FolderOpen,
  FileText,
  TrendingUp,
  Bell,
  Lightbulb,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AISuggestion {
  id: string;
  type: string;
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
  category: string;
  estimatedTime: string;
  relatedEmailId?: string;
  relatedCalendarId?: string;
  relatedEmailIds?: string[];
  icon: string;
}

interface AISuggestionsCardProps {
  title: string;
  description?: string;
  suggestions: AISuggestion[];
  onSuggestionClick?: (suggestion: AISuggestion) => void;
  onViewAll?: () => void;
  className?: string;
}

const getIconComponent = (iconName: string) => {
  const iconMap: { [key: string]: React.ReactNode } = {
    AlertTriangle: <AlertTriangle className="w-4 h-4" />,
    Calendar: <Calendar className="w-4 h-4" />,
    MessageCircle: <MessageCircle className="w-4 h-4" />,
    Clock: <Clock className="w-4 h-4" />,
    FolderOpen: <FolderOpen className="w-4 h-4" />,
    FileText: <FileText className="w-4 h-4" />,
    TrendingUp: <TrendingUp className="w-4 h-4" />,
    Bell: <Bell className="w-4 h-4" />,
    Lightbulb: <Lightbulb className="w-4 h-4" />,
    Zap: <Zap className="w-4 h-4" />,
  };
  
  return iconMap[iconName] || <Lightbulb className="w-4 h-4" />;
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high': return 'text-accent-600 bg-accent-50 border-accent-200';
    case 'medium': return 'text-primary-600 bg-primary-50 border-primary-200';
    case 'low': return 'text-neutral-600 bg-neutral-50 border-neutral-200';
    default: return 'text-neutral-600 bg-neutral-50 border-neutral-200';
  }
};

const getSuggestionTypeColor = (type: string) => {
  switch (type) {
    case 'email_priority':
    case 'follow_up':
      return 'bg-accent-100 text-accent-700';
    case 'meeting_conflict':
    case 'meeting_prep':
      return 'bg-primary-100 text-primary-700';
    case 'productivity':
    case 'productivity_tip':
      return 'bg-neutral-100 text-neutral-700';
    case 'email_organization':
      return 'bg-primary-100 text-primary-700';
    case 'deadline_reminder':
      return 'bg-accent-100 text-accent-700';
    default:
      return 'bg-neutral-100 text-neutral-700';
  }
};

export function AISuggestionsCard({ 
  title, 
  description, 
  suggestions, 
  onSuggestionClick, 
  onViewAll, 
  className
}: AISuggestionsCardProps) {
  const prioritySuggestions = suggestions.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  return (
    <Card variant="glass" className={cn("h-full", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary-100 to-accent-100 text-primary-600">
              <Brain className="w-5 h-5" />
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
          <Badge variant="secondary" className="bg-gradient-to-r from-primary-100 to-accent-100 text-primary-700">
            {suggestions.length}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {prioritySuggestions.slice(0, 4).map((suggestion) => (
            <div
              key={suggestion.id}
              onClick={() => onSuggestionClick?.(suggestion)}
              className="group p-4 rounded-lg bg-white/60 hover:bg-white/80 border border-white/20 hover:border-primary-200 transition-all duration-200 cursor-pointer hover:shadow-md"
            >
              <div className="flex items-start space-x-3">
                {/* Icon */}
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
                  getSuggestionTypeColor(suggestion.type)
                )}>
                  {getIconComponent(suggestion.icon)}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-medium text-neutral-800 truncate">
                      {suggestion.title}
                    </p>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {suggestion.priority === 'high' && (
                        <div className="w-2 h-2 rounded-full bg-accent-500"></div>
                      )}
                      <span className="text-xs text-neutral-500 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{suggestion.estimatedTime}</span>
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-neutral-600 line-clamp-2 mb-3">
                    {suggestion.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant="outline" 
                        className={cn("text-xs", getPriorityColor(suggestion.priority))}
                      >
                        {suggestion.category}
                      </Badge>
                      {suggestion.priority === 'high' && (
                        <Badge variant="outline" className="text-xs text-accent-600 bg-accent-50 border-accent-200">
                          Urgent
                        </Badge>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 transition-colors" />
                  </div>
                  
                  {/* Action button */}
                  <div className="mt-3 pt-3 border-t border-neutral-100">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start text-xs text-primary-600 hover:text-primary-700 hover:bg-primary-50 p-2"
                    >
                      <Zap className="w-3 h-3 mr-2" />
                      {suggestion.action}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {suggestions.length === 0 && (
            <div className="text-center py-8">
              <Brain className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-sm text-neutral-500">No AI suggestions available</p>
              <p className="text-xs text-neutral-400 mt-1">Check back later for personalized recommendations</p>
            </div>
          )}
          
          {suggestions.length > 4 && (
            <div className="text-center pt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onViewAll}
                className="text-primary-600 hover:text-primary-700 hover:bg-primary-50"
              >
                View all {suggestions.length} suggestions
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

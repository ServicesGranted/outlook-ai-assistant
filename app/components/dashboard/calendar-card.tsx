
'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Video,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  location?: string;
  attendees?: Array<{
    name: string;
    email: string;
    status: 'accepted' | 'tentative' | 'declined' | 'pending';
  }>;
  type: 'meeting' | 'presentation' | 'demo' | 'one-on-one' | 'review' | 'event';
  priority: 'high' | 'medium' | 'low';
  isRecurring?: boolean;
  description?: string;
}

interface CalendarCardProps {
  title: string;
  description?: string;
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onViewAll?: () => void;
  className?: string;
  showToday?: boolean;
}

const formatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
};

const formatDate = (timestamp: string) => {
  const date = new Date(timestamp);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  if (date.toDateString() === today.toDateString()) {
    return 'Today';
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow';
  } else {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  }
};

const getEventTypeColor = (type: string) => {
  switch (type) {
    case 'presentation':
    case 'demo':
      return 'bg-accent-500';
    case 'meeting':
      return 'bg-primary-500';
    case 'one-on-one':
      return 'bg-neutral-500';
    case 'review':
      return 'bg-accent-400';
    case 'event':
      return 'bg-primary-400';
    default:
      return 'bg-neutral-400';
  }
};

const getEventTypeIcon = (type: string, location?: string) => {
  if (location?.toLowerCase().includes('zoom') || location?.toLowerCase().includes('teams') || location?.toLowerCase().includes('virtual')) {
    return <Video className="w-4 h-4" />;
  }
  
  switch (type) {
    case 'presentation':
    case 'demo':
      return <Users className="w-4 h-4" />;
    case 'one-on-one':
      return <Users className="w-4 h-4" />;
    default:
      return <Calendar className="w-4 h-4" />;
  }
};

const isEventSoon = (startTime: string) => {
  const now = new Date();
  const eventTime = new Date(startTime);
  const diffInMinutes = (eventTime.getTime() - now.getTime()) / (1000 * 60);
  return diffInMinutes > 0 && diffInMinutes <= 60; // Within next hour
};

export function CalendarCard({ 
  title, 
  description, 
  events, 
  onEventClick, 
  onViewAll, 
  className,
  showToday = false
}: CalendarCardProps) {
  const displayEvents = showToday 
    ? events.filter(event => {
        const eventDate = new Date(event.startTime);
        const today = new Date();
        return eventDate.toDateString() === today.toDateString();
      })
    : events;

  return (
    <Card variant="glass" className={cn("h-full", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary-100 text-primary-600">
              <Calendar className="w-5 h-5" />
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
            {displayEvents.length}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="space-y-3">
          {displayEvents.slice(0, 5).map((event) => (
            <div
              key={event.id}
              onClick={() => onEventClick?.(event)}
              className="group p-4 rounded-lg bg-white/60 hover:bg-white/80 border border-white/20 hover:border-primary-200 transition-all duration-200 cursor-pointer hover:shadow-md"
            >
              <div className="flex items-start space-x-3">
                {/* Time indicator */}
                <div className={cn(
                  "w-3 h-16 rounded-full flex-shrink-0",
                  getEventTypeColor(event.type)
                )}></div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <p className="text-sm font-medium text-neutral-800 truncate">
                        {event.title}
                      </p>
                      {isEventSoon(event.startTime) && (
                        <AlertCircle className="w-4 h-4 text-accent-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-1 text-neutral-500">
                      {getEventTypeIcon(event.type, event.location)}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-neutral-500 mb-2">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>
                        {formatDate(event.startTime)} • {formatTime(event.startTime)} - {formatTime(event.endTime)}
                      </span>
                    </div>
                  </div>
                  
                  {event.location && (
                    <div className="flex items-center space-x-1 text-xs text-neutral-500 mb-2">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{event.location}</span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {event.attendees && event.attendees.length > 0 && (
                        <div className="flex items-center space-x-1 text-xs text-neutral-500">
                          <Users className="w-3 h-3" />
                          <span>{event.attendees.length} attendees</span>
                        </div>
                      )}
                      {event.priority === 'high' && (
                        <Badge variant="outline" className="text-xs text-accent-600 bg-accent-50 border-accent-200">
                          High Priority
                        </Badge>
                      )}
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-primary-500 transition-colors" />
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {displayEvents.length === 0 && (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
              <p className="text-sm text-neutral-500">
                {showToday ? 'No events today' : 'No upcoming events'}
              </p>
            </div>
          )}
          
          {displayEvents.length > 5 && (
            <div className="text-center pt-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onViewAll}
                className="text-primary-600 hover:text-primary-700 hover:bg-primary-50"
              >
                View all events
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

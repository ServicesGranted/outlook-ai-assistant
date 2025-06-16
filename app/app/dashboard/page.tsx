
'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { Layout } from '@/components/layout/layout';
import { AuthGuard } from '@/components/auth/auth-guard';
import { EmailCard } from '@/components/dashboard/email-card';
import { CalendarCard } from '@/components/dashboard/calendar-card';
import { AISuggestionsCard } from '@/components/dashboard/ai-suggestions-card';
import { StatsCard } from '@/components/dashboard/stats-card';
import { ChatInterface } from '@/components/chat/chat-interface';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Calendar, 
  Brain, 
  Inbox, 
  MessageSquare, 
  Clock,
  TrendingUp,
  AlertTriangle,
  Archive,
  Plus,
  Search,
  Filter,
  RefreshCw
} from 'lucide-react';

// Import mock data
import mockEmails from '@/data/mock-emails.json';
import mockCalendar from '@/data/mock-calendar.json';
import mockAISuggestions from '@/data/mock-ai-suggestions.json';

export default function DashboardPage() {
  const { data: session } = useSession();

  // Extract data from mock files with type assertions
  const { unreadEmails, unrepliedEmails, unfiledEmails } = mockEmails as any;
  const { upcomingEvents, todaysEvents } = mockCalendar as any;
  const { suggestions, productivityStats } = mockAISuggestions as any;

  // Calculate stats
  const totalUnreadEmails = unreadEmails.length;
  const totalUnrepliedEmails = unrepliedEmails.length;
  const totalUnfiledEmails = unfiledEmails.length;
  const todaysMeetings = todaysEvents.length;
  const totalSuggestions = suggestions.length;
  const highPrioritySuggestions = suggestions.filter((s: any) => s.priority === 'high').length;

  // Event handlers (placeholder for future functionality)
  const handleEmailClick = (email: any) => {
    console.log('Email clicked:', email);
  };

  const handleEventClick = (event: any) => {
    console.log('Event clicked:', event);
  };

  const handleSuggestionClick = (suggestion: any) => {
    console.log('Suggestion clicked:', suggestion);
  };

  const handleViewAllEmails = () => {
    console.log('View all emails');
  };

  const handleViewAllEvents = () => {
    console.log('View all events');
  };

  const handleViewAllSuggestions = () => {
    console.log('View all suggestions');
  };

  return (
    <AuthGuard>
      <Layout title="Dashboard" showNavigation={true} className="p-6">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-neutral-800 mb-2">
                  Welcome back{session?.user?.name ? `, ${session.user.name.split(' ')[0]}` : ''}!
                </h1>
                <p className="text-neutral-600">
                  {session?.user?.email && (
                    <span className="block text-sm text-primary-600 mb-1">
                      Signed in as {session.user.email}
                    </span>
                  )}
                  Here's your intelligent overview of emails, calendar, and AI-powered insights.
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Compose
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Unread Emails"
              value={totalUnreadEmails}
              description="Needs attention"
              icon={<Inbox className="h-4 w-4" />}
              trend={{ value: "+3 from yesterday", isPositive: false }}
              variant="default"
            />
            
            <StatsCard
              title="Today's Meetings"
              value={todaysMeetings}
              description="Next in 30 minutes"
              icon={<Calendar className="h-4 w-4" />}
              trend={{ value: "On schedule", isPositive: true }}
              variant="accent"
            />
            
            <StatsCard
              title="AI Suggestions"
              value={totalSuggestions}
              description={`${highPrioritySuggestions} high priority`}
              icon={<Brain className="h-4 w-4" />}
              trend={{ value: "Ready for review", isPositive: true }}
              variant="success"
            />
            
            <StatsCard
              title="Productivity Score"
              value={`${productivityStats.productivityScore}%`}
              description="This week"
              icon={<TrendingUp className="h-4 w-4" />}
              trend={{ value: productivityStats.weeklyTrend, isPositive: true }}
              variant="warning"
            />
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column - Email Management */}
            <div className="lg:col-span-8 space-y-6">
              {/* Unread Emails */}
              <EmailCard
                title="Unread Emails"
                description="Messages requiring your attention"
                emails={unreadEmails}
                icon={<Mail className="w-5 h-5" />}
                onEmailClick={handleEmailClick}
                onViewAll={handleViewAllEmails}
                variant="unread"
              />

              {/* Email Management Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EmailCard
                  title="Unreplied Emails"
                  description="Awaiting your response"
                  emails={unrepliedEmails}
                  icon={<MessageSquare className="w-5 h-5" />}
                  onEmailClick={handleEmailClick}
                  onViewAll={handleViewAllEmails}
                  variant="unreplied"
                />

                <EmailCard
                  title="Unfiled Inbox"
                  description="Emails to organize"
                  emails={unfiledEmails}
                  icon={<Archive className="w-5 h-5" />}
                  onEmailClick={handleEmailClick}
                  onViewAll={handleViewAllEmails}
                  variant="unfiled"
                />
              </div>
            </div>

            {/* Right Column - Calendar & AI */}
            <div className="lg:col-span-4 space-y-6">
              {/* Today's Calendar */}
              <CalendarCard
                title="Today's Schedule"
                description="Your meetings and events"
                events={upcomingEvents}
                onEventClick={handleEventClick}
                onViewAll={handleViewAllEvents}
                showToday={true}
              />

              {/* Upcoming Events */}
              <CalendarCard
                title="Upcoming Events"
                description="Next 7 days"
                events={upcomingEvents.slice(2, 6)} // Show different events
                onEventClick={handleEventClick}
                onViewAll={handleViewAllEvents}
                showToday={false}
              />
            </div>
          </div>

          {/* AI Suggestions Section */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
            <AISuggestionsCard
              title="AI-Powered Suggestions"
              description="Intelligent recommendations to boost your productivity"
              suggestions={suggestions}
              onSuggestionClick={handleSuggestionClick}
              onViewAll={handleViewAllSuggestions}
            />
          </div>

          {/* Quick Actions Bar */}
          <div className="bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-neutral-800 mb-1">
                  Quick Actions
                </h3>
                <p className="text-sm text-neutral-600">
                  Common tasks to help you stay productive
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" className="text-primary-600 hover:bg-primary-100">
                  <Search className="w-4 h-4 mr-2" />
                  Search Emails
                </Button>
                <Button variant="ghost" size="sm" className="text-primary-600 hover:bg-primary-100">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter Inbox
                </Button>
                <Button variant="ghost" size="sm" className="text-accent-600 hover:bg-accent-100">
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600">
                  <Brain className="w-4 h-4 mr-2" />
                  AI Assistant
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Persistent Chat Interface */}
        <ChatInterface />
      </Layout>
    </AuthGuard>
  );
}

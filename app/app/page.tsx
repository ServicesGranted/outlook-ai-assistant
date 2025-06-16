
'use client';

import React from 'react';
import { Layout } from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SignInButton } from '@/components/auth/sign-in-button';
import { Mail, Calendar, MessageSquare, Sparkles, ArrowRight, Shield, Zap, Brain } from 'lucide-react';

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            {/* Hero Badge */}
            <div className="inline-flex items-center space-x-2 bg-glass-blue backdrop-blur-glass border border-primary-200/50 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-primary-500" />
              <span className="text-sm font-medium text-primary-700">
                AI-Powered Email Management
              </span>
            </div>

            {/* Hero Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-800 mb-6">
              Outlook AI
              <span className="block text-primary-500">Assistant</span>
            </h1>

            {/* Hero Description */}
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-12 leading-relaxed">
              Transform your email experience with intelligent automation, smart scheduling, 
              and AI-powered insights. Manage your Outlook emails and calendar like never before.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <SignInButton 
                size="lg" 
                className="px-8 py-4 text-lg"
              />
              <Button 
                variant="ghost" 
                size="lg" 
                className="text-neutral-600 hover:text-neutral-700"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary-200/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-glass-white/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-neutral-800 mb-4">
              Intelligent Email Management
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Discover powerful features designed to streamline your workflow and boost productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card variant="glass" className="group hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                  <Brain className="w-6 h-6 text-primary-600" />
                </div>
                <CardTitle className="text-xl">Smart Email Sorting</CardTitle>
                <CardDescription>
                  AI automatically categorizes and prioritizes your emails based on importance and context
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 2 */}
            <Card variant="glass" className="group hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                  <Calendar className="w-6 h-6 text-primary-600" />
                </div>
                <CardTitle className="text-xl">Intelligent Scheduling</CardTitle>
                <CardDescription>
                  Seamlessly integrate email responses with calendar events and meeting suggestions
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 3 */}
            <Card variant="glass" className="group hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                  <MessageSquare className="w-6 h-6 text-primary-600" />
                </div>
                <CardTitle className="text-xl">AI Chat Assistant</CardTitle>
                <CardDescription>
                  Get instant help with email composition, scheduling, and task management
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 4 */}
            <Card variant="glass" className="group hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                  <Zap className="w-6 h-6 text-primary-600" />
                </div>
                <CardTitle className="text-xl">Quick Actions</CardTitle>
                <CardDescription>
                  Perform common email tasks with one-click automation and smart suggestions
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 5 */}
            <Card variant="glass" className="group hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                  <Shield className="w-6 h-6 text-primary-600" />
                </div>
                <CardTitle className="text-xl">Secure & Private</CardTitle>
                <CardDescription>
                  Enterprise-grade security with Microsoft authentication and data protection
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Feature 6 */}
            <Card variant="glass" className="group hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors">
                  <Sparkles className="w-6 h-6 text-primary-600" />
                </div>
                <CardTitle className="text-xl">Smart Insights</CardTitle>
                <CardDescription>
                  Get analytics and insights about your email patterns and productivity trends
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card variant="glass" className="p-12">
            <CardContent className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-neutral-800">
                Ready to Transform Your Email Experience?
              </h2>
              <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
                Join thousands of professionals who have already streamlined their workflow 
                with our AI-powered Outlook assistant.
              </p>
              <div className="pt-4">
                <SignInButton 
                  size="lg" 
                  className="px-8 py-4 text-lg mx-auto"
                >
                  <Mail className="w-5 h-5" />
                  <span>Get Started Now</span>
                  <ArrowRight className="w-5 h-5" />
                </SignInButton>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}

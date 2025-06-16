
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Minimize2, Maximize2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChatContainer } from './chat-container';
import { ChatInput } from './chat-input';
import { Message } from './message-bubble';
import { 
  sendChatMessageWithRetry, 
  generateMessageId, 
  validateMessage, 
  formatErrorMessage,
  checkAIServiceHealth 
} from '@/lib/chat-service';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface ChatInterfaceProps {
  className?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId] = useState(() => `conv_${Date.now()}`);
  const [serviceStatus, setServiceStatus] = useState<'unknown' | 'healthy' | 'unhealthy'>('unknown');
  const { toast } = useToast();

  // Check AI service health on mount
  useEffect(() => {
    checkAIServiceHealth()
      .then(health => {
        setServiceStatus(health.status === 'healthy' ? 'healthy' : 'unhealthy');
        if (health.status !== 'healthy') {
          console.warn('AI service is not healthy:', health);
        }
      })
      .catch(error => {
        console.error('Failed to check AI service health:', error);
        setServiceStatus('unhealthy');
      });
  }, []);

  // Add welcome message when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: generateMessageId(),
        content: "Hello! I'm your AI assistant for Microsoft Outlook. I can help you with:\n\n📧 **Email Management** - Organize, prioritize, and draft responses\n📅 **Calendar Scheduling** - Find meeting times and manage your schedule\n✅ **Task Organization** - Prioritize work and boost productivity\n\nWhat would you like to work on today?",
        type: 'assistant',
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  // Handle sending a new message
  const handleSendMessage = useCallback(async (content: string) => {
    // Validate message
    const validation = validateMessage(content);
    if (!validation.isValid) {
      toast({
        title: "Invalid Message",
        description: validation.error,
        variant: "destructive",
      });
      return;
    }

    // Check service status
    if (serviceStatus === 'unhealthy') {
      toast({
        title: "Service Unavailable",
        description: "AI service is currently unavailable. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    // Add user message immediately
    const userMessage: Message = {
      id: generateMessageId(),
      content,
      type: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Send message to AI service
      const response = await sendChatMessageWithRetry(content, conversationId);
      
      // Add AI response
      const assistantMessage: Message = {
        id: generateMessageId(),
        content: response.content,
        type: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      
      // Update service status to healthy if request succeeded
      if (serviceStatus !== 'healthy') {
        setServiceStatus('healthy');
      }
      
    } catch (error: any) {
      console.error('Failed to send message:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: generateMessageId(),
        content: `I'm sorry, I encountered an error: ${formatErrorMessage(error)}\n\nPlease try again or rephrase your message.`,
        type: 'assistant',
        timestamp: new Date(),
        error: true,
      };
      
      setMessages(prev => [...prev, errorMessage]);
      
      // Update service status
      setServiceStatus('unhealthy');
      
      // Show toast notification
      toast({
        title: "Message Failed",
        description: formatErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      setIsTyping(false);
    }
  }, [conversationId, serviceStatus, toast]);

  // Handle clearing chat
  const handleClearChat = useCallback(() => {
    setMessages([]);
    toast({
      title: "Chat Cleared",
      description: "Conversation history has been cleared.",
    });
  }, [toast]);

  // Toggle chat open/closed
  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setIsExpanded(false); // Reset expansion when opening
    }
  }, [isOpen]);

  // Toggle expanded/minimized
  const toggleExpanded = useCallback(() => {
    setIsExpanded(prev => !prev);
  }, []);

  return (
    <div className={`fixed bottom-6 right-6 z-[1350] ${className}`}>
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="chat-open"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className={cn(
              'flex flex-col backdrop-blur-md border rounded-2xl overflow-hidden',
              isExpanded 
                ? 'w-96 h-[600px]' 
                : 'w-80 h-96'
            )}
            style={{
              background: isExpanded 
                ? 'rgba(255, 255, 255, 0.25)' 
                : 'rgba(255, 255, 255, 0.15)',
              border: isExpanded 
                ? '1px solid rgba(255, 255, 255, 0.3)' 
                : '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: isExpanded 
                ? '0 12px 48px 0 rgba(239, 68, 68, 0.25), 0 6px 24px 0 rgba(100, 116, 139, 0.15)'
                : '0 8px 32px 0 rgba(239, 68, 68, 0.15), 0 4px 16px 0 rgba(100, 116, 139, 0.1)'
            }}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/20">
              <div className="flex items-center space-x-3">
                <div
                  className="w-8 h-8 rounded-full bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center relative"
                  style={{
                    boxShadow: '0 4px 16px 0 rgba(239, 68, 68, 0.3)'
                  }}
                >
                  <MessageSquare className="w-4 h-4 text-white" />
                  {serviceStatus === 'unhealthy' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center">
                      <AlertCircle className="w-2 h-2 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-700">
                    AI Assistant
                  </h3>
                  <p className="text-xs text-slate-500">
                    {isTyping ? 'Typing...' : serviceStatus === 'healthy' ? 'Online' : 'Limited'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                {/* Expand/Minimize Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleExpanded}
                  className="w-8 h-8 p-0 hover:bg-white/20 text-slate-600 hover:text-slate-700"
                >
                  {isExpanded ? (
                    <Minimize2 className="w-4 h-4" />
                  ) : (
                    <Maximize2 className="w-4 h-4" />
                  )}
                </Button>
                
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleChat}
                  className="w-8 h-8 p-0 hover:bg-white/20 text-slate-600 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Service Status Warning */}
            {serviceStatus === 'unhealthy' && (
              <div className="px-4 py-2 bg-yellow-50/80 border-b border-yellow-200/50">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600" />
                  <p className="text-xs text-yellow-700">
                    AI service is experiencing issues. Responses may be delayed.
                  </p>
                </div>
              </div>
            )}

            {/* Chat Messages */}
            <div className="flex-1 min-h-0">
              <ChatContainer
                messages={messages}
                isTyping={isTyping}
                className="h-full"
              />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-white/20">
              <ChatInput
                onSendMessage={handleSendMessage}
                disabled={isTyping || serviceStatus === 'unhealthy'}
                placeholder={
                  serviceStatus === 'unhealthy' 
                    ? "AI service unavailable..." 
                    : "Ask me about emails, calendar, or tasks..."
                }
              />
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="chat-closed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={toggleChat}
            className={cn(
              'w-14 h-14 rounded-full backdrop-blur-md border flex items-center justify-center relative',
              'bg-gradient-to-br from-red-500 to-red-600 border-red-400/30',
              'hover:from-red-600 hover:to-red-700 transition-all duration-200',
              'text-white shadow-lg hover:shadow-xl'
            )}
            style={{
              boxShadow: '0 8px 32px 0 rgba(239, 68, 68, 0.3), 0 4px 16px 0 rgba(100, 116, 139, 0.1)'
            }}
          >
            <MessageSquare className="w-6 h-6" />
            {serviceStatus === 'unhealthy' && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                <AlertCircle className="w-3 h-3 text-white" />
              </div>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

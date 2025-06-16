
'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageBubble, Message } from './message-bubble';
import { TypingIndicator } from './typing-indicator';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatContainerProps {
  messages: Message[];
  isTyping?: boolean;
  className?: string;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  isTyping = false,
  className = ''
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  }, [messages, isTyping]);

  return (
    <div className={`flex flex-col h-full ${className}`}>
      <ScrollArea 
        ref={scrollAreaRef}
        className="flex-1 px-4 py-2"
      >
        <div className="space-y-1">
          {/* Welcome Message */}
          {messages.length === 0 && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-8"
            >
              <div
                className="inline-block rounded-2xl px-6 py-4 backdrop-blur-md border bg-white/20 border-white/30"
                style={{
                  background: 'rgba(100, 116, 139, 0.15)',
                  border: '1px solid rgba(100, 116, 139, 0.2)',
                  boxShadow: '0 4px 16px 0 rgba(100, 116, 139, 0.2)'
                }}
              >
                <h3 className="text-lg font-semibold text-slate-700 mb-2">
                  👋 Hi! I'm your AI Assistant
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  I can help you manage emails, schedule meetings, and boost your productivity. 
                  <br />
                  What would you like to do today?
                </p>
              </div>
            </motion.div>
          )}

          {/* Messages */}
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <MessageBubble
                key={message.id}
                message={message}
              />
            ))}
          </AnimatePresence>

          {/* Typing Indicator */}
          <AnimatePresence>
            {isTyping && <TypingIndicator />}
          </AnimatePresence>

          {/* Scroll anchor */}
          <div ref={bottomRef} className="h-1" />
        </div>
      </ScrollArea>
    </div>
  );
};

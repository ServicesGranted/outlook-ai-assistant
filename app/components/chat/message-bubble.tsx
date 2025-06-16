
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
  error?: boolean;
}

interface MessageBubbleProps {
  message: Message;
  className?: string;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, className = '' }) => {
  const isUser = message.type === 'user';
  const isError = message.error;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn(
        'flex items-start space-x-3 mb-4',
        isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row',
        className
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          isUser
            ? 'bg-gradient-to-br from-red-500 to-red-600 text-white'
            : isError
            ? 'bg-gradient-to-br from-yellow-500 to-orange-500 text-white'
            : 'bg-gradient-to-br from-slate-500 to-slate-600 text-white'
        )}
        style={{
          boxShadow: isUser 
            ? '0 4px 16px 0 rgba(239, 68, 68, 0.3)'
            : isError
            ? '0 4px 16px 0 rgba(245, 158, 11, 0.3)'
            : '0 4px 16px 0 rgba(100, 116, 139, 0.2)'
        }}
      >
        {isUser ? (
          <User className="w-4 h-4" />
        ) : isError ? (
          <AlertTriangle className="w-4 h-4" />
        ) : (
          <Bot className="w-4 h-4" />
        )}
      </div>

      {/* Message Content */}
      <div
        className={cn(
          'flex-1 max-w-[80%] relative',
          isUser ? 'text-right' : 'text-left'
        )}
      >
        {/* Message Bubble */}
        <div
          className={cn(
            'relative px-4 py-3 rounded-2xl backdrop-blur-sm border',
            isUser
              ? 'rounded-tr-sm'
              : 'rounded-tl-sm'
          )}
          style={{
            background: isUser
              ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.9), rgba(220, 38, 38, 0.9))'
              : isError
              ? 'rgba(254, 243, 199, 0.9)'
              : 'rgba(100, 116, 139, 0.15)',
            border: isUser
              ? '1px solid rgba(239, 68, 68, 0.3)'
              : isError
              ? '1px solid rgba(245, 158, 11, 0.3)'
              : '1px solid rgba(100, 116, 139, 0.2)',
            boxShadow: isUser
              ? '0 4px 16px 0 rgba(239, 68, 68, 0.3)'
              : isError
              ? '0 4px 16px 0 rgba(245, 158, 11, 0.2)'
              : '0 4px 16px 0 rgba(100, 116, 139, 0.2)'
          }}
        >
          {/* Message Tail */}
          <div
            className={cn(
              'absolute top-3 w-3 h-3 transform rotate-45',
              isUser
                ? '-right-1.5 bg-gradient-to-br from-red-500 to-red-600'
                : isError
                ? '-left-1.5 bg-amber-100'
                : '-left-1.5 bg-slate-200/50'
            )}
            style={{
              border: isUser
                ? '1px solid rgba(239, 68, 68, 0.3)'
                : isError
                ? '1px solid rgba(245, 158, 11, 0.3)'
                : '1px solid rgba(100, 116, 139, 0.2)',
              borderRight: 'none',
              borderBottom: 'none',
            }}
          />

          {/* Message Text */}
          <div
            className={cn(
              'text-sm leading-relaxed whitespace-pre-wrap break-words',
              isUser
                ? 'text-white'
                : isError
                ? 'text-amber-800'
                : 'text-slate-700'
            )}
          >
            {message.content}
          </div>
        </div>

        {/* Timestamp */}
        <div
          className={cn(
            'mt-1 text-xs text-slate-500',
            isUser ? 'text-right' : 'text-left'
          )}
        >
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
          {isError && (
            <span className="ml-1 text-amber-600">• Failed</span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

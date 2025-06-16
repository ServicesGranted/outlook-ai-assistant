
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Ask me anything about your emails, calendar, or tasks..."
}) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={cn(
            'relative rounded-2xl backdrop-blur-md border transition-all duration-200',
            isFocused 
              ? 'border-red-400/40 bg-white/30' 
              : 'border-white/25 bg-white/20'
          )}
          style={{
            background: isFocused 
              ? 'rgba(255, 255, 255, 0.3)' 
              : 'rgba(255, 255, 255, 0.2)',
            border: isFocused 
              ? '1px solid rgba(239, 68, 68, 0.4)' 
              : '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: isFocused 
              ? '0 6px 24px 0 rgba(239, 68, 68, 0.2), 0 3px 12px 0 rgba(100, 116, 139, 0.15)'
              : '0 4px 16px 0 rgba(239, 68, 68, 0.1), 0 2px 8px 0 rgba(100, 116, 139, 0.1)'
          }}
        >
          {/* Input Field */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={disabled}
            placeholder={placeholder}
            rows={1}
            className={cn(
              'w-full bg-transparent border-0 outline-none resize-none px-4 py-3 pr-24 text-sm leading-relaxed',
              'placeholder:text-slate-500/70 text-slate-700',
              'scrollbar-thin scrollbar-thumb-slate-300/50 scrollbar-track-transparent',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
            style={{
              color: '#334155',
              minHeight: '48px',
              maxHeight: '120px',
            }}
          />

          {/* Action Buttons */}
          <div className="absolute right-2 bottom-2 flex items-center space-x-1">
            {/* Attachment Button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 hover:bg-white/20 text-slate-600 hover:text-slate-700"
              disabled={disabled}
            >
              <Paperclip className="w-4 h-4" />
            </Button>

            {/* Voice Button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 hover:bg-white/20 text-slate-600 hover:text-slate-700"
              disabled={disabled}
            >
              <Mic className="w-4 h-4" />
            </Button>

            {/* Send Button */}
            <Button
              type="submit"
              size="sm"
              disabled={!message.trim() || disabled}
              className={cn(
                'w-8 h-8 p-0 rounded-full transition-all duration-200',
                message.trim() && !disabled
                  ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg'
                  : 'bg-slate-300/50 text-slate-500 cursor-not-allowed'
              )}
              style={{
                boxShadow: message.trim() && !disabled 
                  ? '0 4px 16px 0 rgba(239, 68, 68, 0.3)' 
                  : 'none'
              }}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </form>

      {/* Quick Suggestions */}
      <div className="flex items-center space-x-2 mt-3 px-1">
        <span className="text-xs text-slate-500/70">Try:</span>
        {[
          'Summarize emails',
          'Schedule meeting',
          'Reply to Sarah'
        ].map((suggestion, index) => (
          <button
            key={index}
            onClick={() => setMessage(suggestion)}
            disabled={disabled}
            className={cn(
              'text-xs px-3 py-1 rounded-full backdrop-blur-sm border transition-all duration-200',
              'bg-white/10 border-white/20 text-slate-600 hover:bg-white/20 hover:border-white/30',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

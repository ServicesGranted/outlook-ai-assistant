
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export const TypingIndicator: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="flex items-start gap-3 mb-4"
    >
      {/* Avatar */}
      <div
        className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md border bg-white/20 border-white/30"
        style={{
          boxShadow: '0 4px 16px 0 rgba(100, 116, 139, 0.2)'
        }}
      >
        <Bot className="w-4 h-4 text-slate-700" />
      </div>

      {/* Typing Animation */}
      <div
        className="rounded-2xl px-4 py-3 backdrop-blur-md border bg-white/20 border-white/30 relative"
        style={{
          background: 'rgba(100, 116, 139, 0.15)',
          border: '1px solid rgba(100, 116, 139, 0.2)',
          boxShadow: '0 4px 16px 0 rgba(100, 116, 139, 0.2)'
        }}
      >
        <div className="flex items-center space-x-1">
          <div className="text-sm text-slate-600 mr-2">AI is thinking</div>
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-slate-400 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>

        {/* Message Tail */}
        <div
          className="absolute left-[-6px] top-3 w-3 h-3 rotate-45 border backdrop-blur-md bg-white/20 border-white/30 border-r-0 border-t-0"
          style={{
            background: 'rgba(100, 116, 139, 0.15)',
          }}
        />
      </div>
    </motion.div>
  );
};

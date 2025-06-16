
/**
 * Demo AI Service
 * Provides realistic demo responses when no real AI API key is configured
 */

export interface DemoAIResponse {
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  model: string;
  provider: string;
}

/**
 * Generate a demo AI response based on user input
 */
export async function generateDemoResponse(userMessage: string): Promise<DemoAIResponse> {
  const message = userMessage.toLowerCase().trim();
  
  // Simulate processing delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  let content = '';
  
  // Email-related responses
  if (message.includes('email') || message.includes('inbox') || message.includes('message')) {
    if (message.includes('summarize') || message.includes('summary')) {
      content = `## Email Summary\n\nHere's what I found in your inbox:\n\n📧 **High Priority (3 emails):**\n• Sarah Johnson - Project deadline update (urgent)\n• Marketing Team - Q4 campaign review needed\n• IT Support - Security update required by Friday\n\n📬 **Regular Messages (7 emails):**\n• Meeting confirmations and calendar updates\n• Newsletter subscriptions\n• Team announcements\n\n**Recommendation:** I suggest tackling the high-priority emails first. Would you like me to help you draft responses?`;
    } else if (message.includes('reply') || message.includes('respond')) {
      content = `## Email Response Assistant\n\nI can help you craft a professional response! Here are your options:\n\n✉️ **Quick Templates:**\n• "Thanks for the update, I'll review and respond by [time]"\n• "Received, let me check with the team and get back to you"\n• "Appreciate the heads up, I'll prioritize this today"\n\n📝 **Custom Response:** I can help you write a personalized reply based on the context.\n\nWhat type of response would work best for your situation?`;
    } else if (message.includes('organize') || message.includes('sort')) {
      content = `## Inbox Organization Strategy\n\nLet me help you organize your emails more effectively:\n\n📁 **Suggested Actions:**\n• Create folders: Projects, Clients, Admin, Reading List\n• Set up rules for automatic sorting by sender/subject\n• Archive emails older than 30 days (if not needed)\n• Unsubscribe from 5+ unused newsletters\n\n🎯 **Priority System:**\n• Red flag: Urgent responses needed\n• Yellow flag: Important but not urgent\n• No flag: FYI or low priority\n\nWould you like me to walk you through setting up any of these systems?`;
    } else {
      content = `## Email Management Help\n\nI'm here to help with your email productivity! I can assist with:\n\n📧 **Email Tasks:**\n• Summarizing your inbox and highlighting priorities\n• Drafting professional responses and templates\n• Creating organization systems and rules\n• Managing email overload and achieving inbox zero\n\n💡 **Quick Tip:** Try the "2-minute rule" - if an email takes less than 2 minutes to handle, do it immediately rather than marking it for later.\n\nWhat specific email challenge can I help you with today?`;
    }
  }
  
  // Calendar and meeting responses
  else if (message.includes('meeting') || message.includes('schedule') || message.includes('calendar')) {
    if (message.includes('schedule') || message.includes('book')) {
      content = `## Meeting Scheduling Assistant\n\nI'd be happy to help you find the perfect meeting time!\n\n📅 **Available Slots Today:**\n• 2:00 PM - 3:00 PM (1 hour available)\n• 4:30 PM - 5:30 PM (1 hour available)\n\n📅 **Tomorrow's Options:**\n• 10:00 AM - 11:30 AM (1.5 hours available)\n• 1:00 PM - 2:30 PM (1.5 hours available)\n• 3:30 PM - 5:00 PM (1.5 hours available)\n\n**To help you better:**\n• Who needs to attend this meeting?\n• How long do you expect it to last?\n• Is this in-person, video call, or phone?\n• What's the main topic or agenda?`;
    } else if (message.includes('reschedule') || message.includes('move')) {
      content = `## Meeting Rescheduling Help\n\nI can help you reschedule that meeting smoothly:\n\n🔄 **Rescheduling Steps:**\n1. **Check availability** for all attendees\n2. **Propose 2-3 alternative times** to give options\n3. **Send polite reschedule request** with brief explanation\n4. **Update calendar** once confirmed\n\n📝 **Sample Message:**\n"Hi [Name], I need to reschedule our meeting due to [brief reason]. Here are some alternative times that work for me: [options]. Please let me know what works best for you."\n\nWhich meeting needs to be rescheduled, and do you have preferred alternative times?`;
    } else if (message.includes('agenda') || message.includes('today') || message.includes('tomorrow')) {
      content = `## Your Schedule Overview\n\nHere's your agenda for today:\n\n🌅 **Morning (9:00 AM - 12:00 PM):**\n• 9:00 AM - Team Standup (30 min)\n• 10:30 AM - Project Review with Sarah (1 hour)\n• 11:45 AM - Buffer time for email catch-up\n\n🌞 **Afternoon (1:00 PM - 6:00 PM):**\n• 1:00 PM - Lunch meeting with client (1.5 hours)\n• 3:00 PM - Strategy planning session (1 hour)\n• 4:30 PM - One-on-one with manager (30 min)\n• 5:00 PM - Wrap-up and tomorrow's prep\n\n💡 **Prep Reminders:**\n• Review project docs before 10:30 meeting\n• Prepare talking points for strategy session\n\nWould you like me to help you prepare for any specific meeting?`;
    } else {
      content = `## Calendar Management Assistant\n\nI can help you optimize your schedule and manage meetings effectively!\n\n📅 **Calendar Services:**\n• Finding optimal meeting times for multiple attendees\n• Rescheduling conflicts and managing changes\n• Creating productive meeting agendas\n• Time-blocking for focused work periods\n• Balancing meetings with deep work time\n\n⏰ **Productivity Tips:**\n• Schedule meetings in blocks to preserve focus time\n• Use 25 or 50-minute meetings to allow transition time\n• Block 2-hour chunks for important project work\n\nWhat aspect of your calendar would you like to improve?`;
    }
  }
  
  // Task and productivity responses
  else if (message.includes('task') || message.includes('todo') || message.includes('productivity')) {
    if (message.includes('task') || message.includes('todo')) {
      content = `## Task Management Overview\n\nHere's your current task status:\n\n🔥 **High Priority (Due Soon):**\n• Complete quarterly report (due tomorrow)\n• Review contract terms (due this week)\n• Prepare presentation slides for Friday\n\n📋 **Medium Priority:**\n• Update project timeline\n• Schedule team one-on-ones\n• Organize digital files and folders\n• Research new productivity tools\n\n✅ **Recently Completed:**\n• Finished client proposal (yesterday)\n• Updated team on project status\n• Completed expense reports\n\n**Recommendation:** Focus on the quarterly report first - it's your biggest priority and will take about 2-3 hours of focused work.\n\nWhich task would you like help breaking down or prioritizing?`;
    } else if (message.includes('productivity') || message.includes('focus')) {
      content = `## Productivity Insights & Tips\n\nHere's how to boost your productivity today:\n\n📈 **Your Productivity Patterns:**\n• Peak focus time: 9:00 AM - 11:00 AM\n• Energy dip: 2:00 PM - 3:00 PM (perfect for admin tasks)\n• Second wind: 4:00 PM - 6:00 PM\n\n🎯 **Optimization Strategies:**\n• **Time-blocking:** Reserve your peak hours for important work\n• **Batch processing:** Group similar tasks (emails, calls, admin)\n• **Pomodoro Technique:** 25-minute focused work sessions\n• **Two-minute rule:** Handle quick tasks immediately\n\n💡 **Today's Action Plan:**\n1. Tackle your most important task during peak hours (9-11 AM)\n2. Batch process emails at 11 AM and 4 PM\n3. Use the afternoon dip for routine administrative work\n\nWhat productivity challenge would you like to work on?`;
    } else {
      content = `## Task & Productivity Assistant\n\nI'm here to help you work smarter and accomplish more!\n\n✅ **Task Management:**\n• Prioritizing your to-do list using proven frameworks\n• Breaking down large projects into manageable steps\n• Setting realistic deadlines and milestones\n• Tracking progress and celebrating wins\n\n⚡ **Productivity Optimization:**\n• Identifying your peak performance hours\n• Minimizing distractions and interruptions\n• Creating efficient workflows and routines\n• Balancing urgent vs. important work\n\n🎯 **Goal Achievement:**\n• Setting SMART goals that actually get done\n• Creating accountability systems\n• Overcoming procrastination and mental blocks\n\nWhat aspect of your productivity would you like to improve first?`;
    }
  }
  
  // Greeting responses
  else if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    content = `## Welcome to Your AI Assistant! 👋\n\nI'm here to help you master your Outlook productivity and work more efficiently.\n\n🚀 **What I Can Help With:**\n\n📧 **Email Management:**\n• Organize and prioritize your inbox\n• Draft professional responses\n• Create email templates and rules\n• Achieve and maintain inbox zero\n\n📅 **Calendar & Meetings:**\n• Find optimal meeting times\n• Manage scheduling conflicts\n• Create productive agendas\n• Balance meetings with focus time\n\n✅ **Task & Productivity:**\n• Prioritize your to-do list\n• Break down complex projects\n• Optimize your daily workflow\n• Track goals and progress\n\n💡 **Quick Start Ideas:**\n• "Help me organize my inbox"\n• "Find time for a team meeting"\n• "Show me my tasks for today"\n• "How can I be more productive?"\n\nWhat would you like to work on first?`;
  }
  
  // Help responses
  else if (message.includes('help') || message.includes('what can you do')) {
    content = `## How I Can Assist You\n\nI'm your dedicated productivity assistant for Microsoft Outlook and beyond!\n\n🎯 **Core Capabilities:**\n\n📧 **Email Excellence:**\n• Smart inbox organization and filtering\n• Professional email drafting and templates\n• Response prioritization and time management\n• Automated rules and workflow setup\n\n📅 **Calendar Mastery:**\n• Intelligent meeting scheduling\n• Conflict resolution and rescheduling\n• Time-blocking for maximum productivity\n• Meeting preparation and follow-up\n\n✅ **Task Optimization:**\n• Priority-based task management\n• Project breakdown and milestone tracking\n• Productivity analytics and insights\n• Goal setting and achievement strategies\n\n🔧 **Workflow Automation:**\n• Creating efficient daily routines\n• Minimizing context switching\n• Batch processing similar tasks\n• Eliminating productivity bottlenecks\n\n**Try asking me:**\n• "Summarize my important emails"\n• "When can I schedule a 1-hour meeting?"\n• "Help me prioritize my tasks"\n• "What's the best way to organize my day?"\n\nWhat specific challenge can I help you solve today?`;
  }
  
  // Default response
  else {
    content = `## I'm Here to Help! 🤔\n\nI didn't quite catch what you're looking for, but I'm ready to assist with your productivity needs!\n\n🎯 **I Specialize In:**\n\n📧 **Email Management:**\n• "Help me organize my inbox"\n• "Draft a response to [person] about [topic]"\n• "What emails need my attention?"\n\n📅 **Calendar & Scheduling:**\n• "Find time for a meeting with [person]"\n• "What's my schedule for tomorrow?"\n• "Help me reschedule my 2 PM call"\n\n✅ **Task & Productivity:**\n• "Show me my pending tasks"\n• "How can I be more productive?"\n• "Help me prioritize my work"\n\n💡 **Quick Examples:**\n• "Summarize my unread emails"\n• "Schedule a team meeting for next week"\n• "What should I focus on today?"\n• "Help me manage my time better"\n\nCould you rephrase your question or try one of these examples? I'm here to make your workday more efficient and organized!`;
  }

  // Calculate realistic token usage
  const promptTokens = Math.floor(userMessage.length / 4) + 50; // Rough estimate
  const completionTokens = Math.floor(content.length / 4);
  
  return {
    content,
    usage: {
      promptTokens,
      completionTokens,
      totalTokens: promptTokens + completionTokens,
    },
    model: 'demo-gpt-4',
    provider: 'demo',
  };
}

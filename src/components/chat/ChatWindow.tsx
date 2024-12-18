import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import Button from '../ui/Button';
import ChatMessage from './ChatMessage';
import { useSession } from '../../contexts/SessionContext';

interface Message {
  id: string;
  content: string;
  type: 'ai' | 'user';
  timestamp: number;
}

const welcomeMessages = [
  "Hello! I'm TalentReq AI, your recruitment assistant. I can help analyze candidates, compare qualifications, and answer job-related questions. What would you like to know about the candidates or position?"
];

export default function ChatWindow() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { sessionId } = useSession();
  const welcomeMessageDisplayed = useRef(false);

  const addMessage = useCallback((content: string, type: 'ai' | 'user') => {
    const timestamp = Date.now();
    setMessages(prev => [...prev, {
      id: `${type}-${timestamp}-${Math.random().toString(36).substr(2, 9)}`,
      content,
      type,
      timestamp
    }]);
  }, []);

  useEffect(() => {
    if (!welcomeMessageDisplayed.current) {
      // Display welcome messages with delays
      welcomeMessages.forEach((msg, index) => {
        setTimeout(() => {
          addMessage(msg, 'ai');
        }, index * 1000);
      });
      welcomeMessageDisplayed.current = true;
    }
  }, [addMessage]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    addMessage(input.trim(), 'user');
    setInput('');
    setIsTyping(true);

    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('Access token not found');
      setIsTyping(false);
      addMessage('Sorry, I encountered an error. Please try again.', 'ai');
      return;
    }

    try {
      const response = await fetch('https://gcp-tarmac-844324878551.us-central1.run.app/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          session_id: sessionId,
          query: input.trim(),
        }),
      });
      console.log("trigger", sessionId);
      if (response.ok) {
        const data = await response.json();
        setIsTyping(false);
        addMessage(data.response, 'ai'); // Assuming the API returns a 'response' field
      } else {
        console.error('Failed to send message:', response.statusText);
        setIsTyping(false);
        addMessage('Sorry, I encountered an error. Please try again.', 'ai');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setIsTyping(false);
      addMessage('Sorry, I encountered an error. Please try again.', 'ai');
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm h-full flex flex-col">
      <h3 className="font-medium mb-6">TalentReq AI</h3>
      <div className="flex-1 overflow-y-auto mb-4 pr-2 custom-scrollbar">
        <AnimatePresence mode="popLayout" initial={false}>
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              content={message.content}
              type={message.type}
              delay={0.1}
            />
          ))}
          {isTyping && (
            <motion.div
              key="typing-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-2 text-gray-500 text-sm ml-11"
            >
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask TalentReq AI..."
          className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 focus:border-primary focus:ring-1 focus:ring-primary/20 transition-colors"
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || isTyping}
          className="absolute right-2 top-1/2 -translate-y-1/2"
          size="sm"
          icon={<Send className="h-4 w-4" />}
        >
          Ask
        </Button>
      </div>
    </div>
  );
}

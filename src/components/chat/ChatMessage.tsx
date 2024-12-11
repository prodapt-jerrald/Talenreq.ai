import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  content: string;
  type: 'ai' | 'user';
  delay?: number;
}

const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  ({ content, type, delay = 0 }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ delay }}
        className={`flex items-start space-x-3 mb-4 ${type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}
      >
        <div className={`h-8 w-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
          type === 'ai' ? 'bg-primary text-white' : 'bg-gray-100'
        }`}>
          {type === 'ai' ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4 text-gray-600" />}
        </div>
        <div className={`px-4 py-3 rounded-2xl max-w-[80%] text-sm ${
          type === 'ai' ? 'bg-gray-50 text-gray-800' : 'bg-primary text-white'
        }`}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </motion.div>
    );
  }
);

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;
import { forwardRef, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';
import Button from '../ui/Button';
import { cn } from '../../lib/utils';

interface AITextFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  onAIGenerate: () => Promise<string>;
  label?: string;
  error?: boolean;
  helperText?: string;
}

const AITextField = forwardRef<HTMLTextAreaElement, AITextFieldProps>(
  ({ className, onAIGenerate, label, error, helperText, onChange, value, ...props }, ref) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleAIGenerate = async () => {
      setIsGenerating(true);
      try {
        const generatedText = await onAIGenerate();
        if (onChange) {
          const event = {
            target: { value: generatedText }
          } as React.ChangeEvent<HTMLTextAreaElement>;
          onChange(event);
        }
      } catch (error) {
        console.error('AI generation failed:', error);
      } finally {
        setIsGenerating(false);
      }
    };

    return (
      <div className="space-y-2">
        {label && (
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-xs text-primary hover:text-primary-dark"
              onClick={handleAIGenerate}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
              ) : (
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              )}
              Generate with AI
            </Button>
          </div>
        )}
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={onChange}
            className={cn(
              'block w-full rounded-2xl border border-gray-200 px-4 py-3 min-h-[120px]',
              'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
              'placeholder:text-gray-400 transition-all duration-200',
              'shadow-sm hover:border-gray-300 resize-none',
              { 'border-red-500 focus:border-red-500 focus:ring-red-500/20': error },
              className
            )}
            {...props}
          />
          <AnimatePresence>
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center"
              >
                <div className="flex items-center space-x-2 text-primary">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span className="text-sm font-medium">Generating...</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {helperText && (
          <p className={cn('text-sm px-4', {
            'text-red-500': error,
            'text-gray-500': !error,
          })}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

AITextField.displayName = 'AITextField';

export default AITextField;
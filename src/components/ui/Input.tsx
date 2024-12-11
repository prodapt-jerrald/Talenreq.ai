import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
  icon?: React.ReactNode;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, helperText, icon, label, ...props }, ref) => {
    return (
      <div className="space-y-1.5">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'block w-full rounded-full border border-gray-200 px-6 py-3',
              'focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20',
              'placeholder:text-gray-400 transition-all duration-200',
              'shadow-sm hover:border-gray-300',
              { 'pl-12': icon },
              { 'border-red-500 focus:border-red-500 focus:ring-red-500/20': error },
              className
            )}
            {...props}
          />
        </div>
        {helperText && (
          <p
            className={cn('text-sm px-4', {
              'text-red-500': error,
              'text-gray-500': !error,
            })}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
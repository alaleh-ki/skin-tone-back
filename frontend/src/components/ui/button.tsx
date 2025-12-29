import * as React from 'react';

type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
type ButtonSize = 'default' | 'sm' | 'lg' | 'icon';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const buttonVariants: Record<ButtonVariant, string> = {
  default: 'bg-primary-600 dark:bg-primary-500 text-white shadow-xs hover:bg-primary-700 dark:hover:bg-primary-600',
  destructive: 'bg-red-500 text-white shadow-xs hover:bg-red-600',
  outline: 'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
  secondary: 'bg-muted text-muted-foreground shadow-xs hover:bg-muted/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
  link: 'text-primary-600 dark:text-primary-400 underline-offset-4 hover:underline',
};

const buttonSizes: Record<ButtonSize, string> = {
  default: 'h-9 px-4 py-2',
  sm: 'h-8 rounded-md px-3',
  lg: 'h-10 rounded-md px-6',
  icon: 'h-9 w-9',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-primary-500/20';
    const variantClasses = buttonVariants[variant];
    const sizeClasses = buttonSizes[size];
    const combinedClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

    return (
      <button
        ref={ref}
        className={combinedClasses}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';


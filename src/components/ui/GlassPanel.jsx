import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function GlassPanel({ children, className, hover = false }) {
    return (
        <div className={cn(
            "glass-panel rounded-xl p-6 transition-all duration-300",
            hover && "hover:bg-white/5 hover:border-primary/50",
            className
        )}>
            {children}
        </div>
    );
}

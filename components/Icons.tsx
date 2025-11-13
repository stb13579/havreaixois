/**
 * Inline SVG Icons
 * 
 * Lightweight replacement for @heroicons/react
 * Contains only the icons used in the app
 * Saves ~8 KB from bundle
 */

interface IconProps {
  className?: string;
}

export function MapPinIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg 
      className={className}
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor"
      aria-hidden="true"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" 
      />
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" 
      />
    </svg>
  );
}

export function WifiIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg 
      className={className}
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor"
      aria-hidden="true"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" 
      />
    </svg>
  );
}

export function BoltIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg 
      className={className}
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor"
      aria-hidden="true"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" 
      />
    </svg>
  );
}

export function HomeModernIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg 
      className={className}
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor"
      aria-hidden="true"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" 
      />
    </svg>
  );
}

export function SparklesIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg 
      className={className}
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor"
      aria-hidden="true"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" 
      />
    </svg>
  );
}

export function MoonIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg 
      className={className}
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor"
      aria-hidden="true"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" 
      />
    </svg>
  );
}

export function CalendarIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 8.25h18M4.5 21h15a1.5 1.5 0 001.5-1.5V7.5a1.5 1.5 0 00-1.5-1.5h-15A1.5 1.5 0 003 7.5V19.5A1.5 1.5 0 004.5 21z"
      />
    </svg>
  );
}

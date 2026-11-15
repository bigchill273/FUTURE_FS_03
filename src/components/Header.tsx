import { ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
import { PWAInstallButton } from './PWAInstallButton';

interface HeaderProps {
  cartCount: number;
  onOpenOrderDrawer: () => void;
}

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#spotlight', label: 'Kitchen' },
  { href: '#menu', label: 'Menu' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Visit' },
];

export function Header({ cartCount, onOpenOrderDrawer }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/92 backdrop-blur-md border-b border-[#112A22]/10 pt-[env(safe-area-inset-top)]">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 h-14 md:h-16 flex items-center justify-between gap-4 md:gap-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <a
          href="#home"
          className="inline-flex items-center gap-2.5 text-[#112A22] whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6331F] rounded-lg py-1"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 28 28"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <path
              d="M14.5 2.5C14.5 2.5 21 8.2 21 15.2C21 19.6 17.8 23.5 13.5 23.5C9.2 23.5 6 19.8 6 15.5C6 12.2 7.8 9.6 9.3 8.2C9.1 10.6 10.4 12.1 11.7 12.4C11.1 8.8 14.5 2.5 14.5 2.5Z"
              fill="#D6331F"
            />
            <path
              d="M13.8 11.8C13.8 11.8 17 14.6 17 18.1C17 20.5 15.2 22.3 13.2 22.3C11.2 22.3 9.7 20.5 9.7 18.2C9.7 16.5 10.7 15.1 11.5 14.4C11.4 15.6 12.1 16.3 12.7 16.5C12.4 14.7 13.8 11.8 13.8 11.8Z"
              fill="#F59E0B"
            />
          </svg>
          <span className="font-[family-name:var(--font-display)] text-lg md:text-xl font-semibold tracking-tight">
            Blaze Addis
          </span>
        </a>

        {/* Zone 2: 5 concise single-line text links (Desktop) */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#44524C]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 hover:text-[#112A22] transition-colors after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-[#D6331F] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6331F] rounded-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Desktop Primary Action / Mobile Install Trigger */}
        <div className="flex items-center shrink-0">
          <div className="md:hidden">
            <PWAInstallButton variant="compact" />
          </div>

          <button
            type="button"
            onClick={onOpenOrderDrawer}
            aria-label={`View order (${cartCount} items)`}
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#112A22] hover:bg-[#193C31] text-white text-sm font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6331F] focus-visible:ring-offset-2"
          >
            <ShoppingBag className="h-4 w-4 text-[#FBBF24]" aria-hidden="true" />
            <span>View Order</span>
            <motion.span
              key={cartCount}
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-md bg-[#D6331F] text-white text-xs font-semibold tabular-nums"
            >
              {cartCount}
            </motion.span>
          </button>
        </div>
      </div>
    </header>
  );
}

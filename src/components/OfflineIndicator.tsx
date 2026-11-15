import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export function OfflineIndicator() {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-20 md:bottom-4 left-4 right-4 sm:right-auto z-50 inline-flex items-center gap-2 rounded-xl bg-[#112A22] text-white px-3.5 py-2 text-xs font-medium shadow-lg border border-white/15"
    >
      <WifiOff className="h-3.5 w-3.5 text-[#FBBF24] shrink-0" aria-hidden="true" />
      <span>Offline Mode — Menu &amp; saved order cached on device.</span>
    </div>
  );
}

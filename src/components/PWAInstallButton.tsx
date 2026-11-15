import { useState } from 'react';
import { Download, Share, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'compact' | 'card';
}

export function PWAInstallButton({ variant = 'compact' }: PWAInstallButtonProps) {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  // Suppress install UI if already running in standalone installed mode
  if (isInstalled) {
    return null;
  }

  // Direct Chromium/Android/Desktop install prompt
  if (isInstallable) {
    if (variant === 'card') {
      return (
        <div className="bg-white rounded-2xl border border-[#112A22]/10 p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#112A22] text-white flex items-center justify-center shrink-0">
              <Smartphone className="h-5 w-5 text-[#FBBF24]" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#112A22]">Blaze Addis Mobile App</p>
              <p className="text-xs text-[#54635D] truncate">
                Install for one-tap menu &amp; offline browsing
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={install}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-[#D6331F] hover:bg-[#BE2B19] text-white text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Install App</span>
          </button>
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={install}
        className="min-h-[40px] px-3 py-1.5 rounded-lg border border-[#112A22]/15 bg-white hover:bg-[#F5F2EC] text-[#112A22] text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6331F]"
      >
        <Download className="h-3.5 w-3.5 text-[#D6331F]" aria-hidden="true" />
        <span>Install App</span>
      </button>
    );
  }

  // iOS Safari (or browsers awaiting beforeinstallprompt) guided Add-to-Home-Screen flow
  return (
    <>
      {variant === 'card' ? (
        <div className="bg-white rounded-2xl border border-[#112A22]/10 p-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#112A22] text-white flex items-center justify-center shrink-0">
              <Smartphone className="h-5 w-5 text-[#FBBF24]" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[#112A22]">Get the Mobile App</p>
              <p className="text-xs text-[#54635D] truncate">
                Add Blaze Addis to your phone home screen
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowGuide(true)}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-[#112A22] hover:bg-[#193C31] text-white text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5 text-[#FBBF24]" aria-hidden="true" />
            <span>{isIOS ? 'Install on iOS' : 'Install App'}</span>
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowGuide(true)}
          className="min-h-[40px] px-3 py-1.5 rounded-lg border border-[#112A22]/15 bg-white hover:bg-[#F5F2EC] text-[#112A22] text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6331F]"
        >
          <Smartphone className="h-3.5 w-3.5 text-[#D6331F]" aria-hidden="true" />
          <span>{isIOS ? 'Install on iOS' : 'Get App'}</span>
        </button>
      )}

      {showGuide && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-[2px] p-0 sm:p-4">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="pwa-install-title"
            className="w-full sm:max-w-sm rounded-t-3xl sm:rounded-2xl bg-white p-6 shadow-xl border border-[#112A22]/10"
          >
            <div className="w-10 h-1.5 rounded-full bg-[#112A22]/15 mx-auto mb-4 sm:hidden" />
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3
                  id="pwa-install-title"
                  className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#112A22]"
                >
                  {isIOS ? 'Install on iPhone / iPad' : 'Install Blaze Addis App'}
                </h3>
                <p className="text-xs text-[#54635D] mt-0.5">
                  Launch straight from your home screen with offline menu access.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                aria-label="Close install instructions"
                className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg text-[#54635D] hover:bg-[#F5F2EC] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {isIOS ? (
              <ol className="mt-4 space-y-2.5 text-sm text-[#33423C]">
                <li className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#112A22] text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    Tap the <strong className="inline-flex items-center gap-1"><Share className="h-3.5 w-3.5 inline" /> Share</strong> button in the Safari toolbar.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#112A22] text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    Scroll down and select <strong>Add to Home Screen</strong>.
                  </span>
                </li>
              </ol>
            ) : (
              <ol className="mt-4 space-y-2.5 text-sm text-[#33423C]">
                <li className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#112A22] text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <span>
                    Open your browser menu (<strong>⋮</strong> in Chrome/Edge on Android or Desktop).
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-[#112A22] text-white text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <span>
                    Tap <strong>Install app</strong> or <strong>Add to Home screen</strong>.
                  </span>
                </li>
              </ol>
            )}

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="mt-5 w-full min-h-[44px] rounded-xl bg-[#112A22] hover:bg-[#193C31] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}

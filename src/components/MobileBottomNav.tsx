import { BookOpen, Home, ShoppingBag, SlidersHorizontal } from 'lucide-react';

export type MobileTab = 'home' | 'customize' | 'menu';

interface MobileBottomNavProps {
  activeTab: MobileTab;
  cartCount: number;
  isOrderOpen: boolean;
  onSelectTab: (tab: MobileTab) => void;
  onOpenOrder: () => void;
}

export function MobileBottomNav({
  activeTab,
  cartCount,
  isOrderOpen,
  onSelectTab,
  onOpenOrder,
}: MobileBottomNavProps) {
  const tabs: { id: MobileTab; label: string; icon: typeof Home }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'customize', label: 'Build', icon: SlidersHorizontal },
    { id: 'menu', label: 'Menu', icon: BookOpen },
  ];

  return (
    <nav
      aria-label="Mobile app navigation"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#112A22]/12 pb-[env(safe-area-inset-bottom)]"
    >
      <div className="grid grid-cols-4 items-center h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = !isOrderOpen && activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              aria-current={active ? 'page' : undefined}
              className={`min-h-[48px] flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
                active ? 'text-[#D6331F]' : 'text-[#54635D] hover:text-[#112A22]'
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span className="text-[11px] font-semibold tracking-tight leading-none">
                {tab.label}
              </span>
            </button>
          );
        })}

        <button
          type="button"
          onClick={onOpenOrder}
          aria-label={`Open my order (${cartCount} items)`}
          className={`relative min-h-[48px] flex flex-col items-center justify-center gap-1 transition-colors cursor-pointer ${
            isOrderOpen ? 'text-[#D6331F]' : 'text-[#54635D] hover:text-[#112A22]'
          }`}
        >
          <span className="relative">
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[#D6331F] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </span>
          <span className="text-[11px] font-semibold tracking-tight leading-none">Order</span>
        </button>
      </div>
    </nav>
  );
}

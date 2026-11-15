import { useEffect, useMemo, useRef, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { AboutAndCatering } from './components/AboutAndCatering';
import { DishSpotlight } from './components/DishSpotlight';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MenuExplorer } from './components/MenuExplorer';
import { MobileBottomNav, type MobileTab } from './components/MobileBottomNav';
import { OfflineIndicator } from './components/OfflineIndicator';
import { OrderSidebar } from './components/OrderSidebar';
import { PWAInstallButton } from './components/PWAInstallButton';
import {
  DISH_EXTRAS,
  MENU_ITEMS,
  type MenuCategoryId,
  type MenuItem,
} from './data/blazeMenu';
import {
  buildCartKey,
  calculateCartTotals,
  calculateCustomizedUnitPrice,
  filterMenuItems,
  type CartItem,
  type FulfillmentMode,
  type SortOption,
} from './utils/orderMath';

const CART_STORAGE_KEY = 'blazeaddis_cart_v1';
const FULFILLMENT_STORAGE_KEY = 'blazeaddis_fulfillment_v1';

const INITIAL_CART: CartItem[] = [
  {
    cartKey: buildCartKey('blaze-special-pizza', 'regular', []),
    dishId: 'blaze-special-pizza',
    name: 'Blaze Special Pizza',
    amharic: 'ብሌዝ ስፔሻል ፒዛ',
    imageKey: 'pizza',
    variantId: 'regular',
    variantLabel: 'Standard 12"',
    extraIds: [],
    extraNames: [],
    unitPrice: 480,
    quantity: 1,
  },
  {
    cartKey: buildCartKey('croissant-chocolate', 'chocolate', []),
    dishId: 'croissant-chocolate',
    name: 'Butter & Chocolate Croissant',
    amharic: 'ክሩዋሶን',
    imageKey: 'bakery',
    variantId: 'chocolate',
    variantLabel: 'Dark Chocolate',
    extraIds: [],
    extraNames: [],
    unitPrice: 75,
    quantity: 2,
  },
];

function loadSavedCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return INITIAL_CART;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_CART;
  } catch {
    return INITIAL_CART;
  }
}

function loadSavedFulfillment(): FulfillmentMode {
  try {
    const raw = window.localStorage.getItem(FULFILLMENT_STORAGE_KEY);
    return raw === 'delivery' ? 'delivery' : 'pickup';
  } catch {
    return 'pickup';
  }
}

export default function App() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [mobileTab, setMobileTab] = useState<MobileTab>('home');
  const [selectedDish, setSelectedDish] = useState<MenuItem>(
    MENU_ITEMS.find((item) => item.id === 'blaze-special-combo') ?? MENU_ITEMS[0]
  );
  const [activeCategory, setActiveCategory] = useState<MenuCategoryId>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [fastingOnly, setFastingOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const [cart, setCart] = useState<CartItem[]>(loadSavedCart);
  const [fulfillment, setFulfillment] = useState<FulfillmentMode>(loadSavedFulfillment);
  const [promoCode, setPromoCode] = useState<string>('');
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem(FULFILLMENT_STORAGE_KEY, fulfillment);
    } catch {
      // Ignore storage quota errors
    }
  }, [fulfillment]);

  const filteredItems = useMemo(
    () =>
      filterMenuItems(MENU_ITEMS, {
        category: activeCategory,
        query: searchQuery,
        fastingOnly,
        sort: sortBy,
      }),
    [activeCategory, searchQuery, fastingOnly, sortBy]
  );

  const orderSummary = useMemo(
    () => calculateCartTotals(cart, promoCode, fulfillment),
    [cart, promoCode, fulfillment]
  );

  function addCustomizedToCart(
    dish: MenuItem,
    variantId: string,
    extraIds: string[],
    quantity: number
  ) {
    const variant = dish.variants.find((v) => v.id === variantId) ?? dish.variants[0];
    const unitPrice = calculateCustomizedUnitPrice(dish, variant.id, extraIds, DISH_EXTRAS);
    const extraNames = extraIds
      .map((id) => DISH_EXTRAS.find((e) => e.id === id)?.name)
      .filter((name): name is string => Boolean(name));

    const cartKey = buildCartKey(dish.id, variant.id, extraIds);

    setCart((prev) => {
      const existing = prev.find((item) => item.cartKey === cartKey);
      if (existing) {
        return prev.map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          cartKey,
          dishId: dish.id,
          name: dish.name,
          amharic: dish.amharic,
          imageKey: dish.imageKey,
          variantId: variant.id,
          variantLabel: variant.label,
          extraIds: [...extraIds].sort(),
          extraNames,
          unitPrice,
          quantity,
        },
      ];
    });
  }

  function handleQuickAddDish(dish: MenuItem) {
    addCustomizedToCart(dish, dish.variants[0]?.id ?? 'regular', [], 1);
  }

  function handleCustomizeDish(dish: MenuItem) {
    setSelectedDish(dish);
    if (window.innerWidth < 768) {
      setMobileTab('customize');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      spotlightRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handleUpdateQuantity(cartKey: string, delta: number) {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartKey === cartKey
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handleRemoveItem(cartKey: string) {
    setCart((prev) => prev.filter((item) => item.cartKey !== cartKey));
  }

  function handleClearCart() {
    setCart([]);
    setPromoCode('');
  }

  function handleOrderConfirmed() {
    setCart([]);
    setPromoCode('');
  }

  function handleResetFilters() {
    setActiveCategory('all');
    setSearchQuery('');
    setFastingOnly(false);
    setSortBy('featured');
  }

  function handleExploreMenu() {
    if (window.innerWidth < 768) {
      setMobileTab('menu');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      menuRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function handleSelectMobileTab(tab: MobileTab) {
    setIsOrderDrawerOpen(false);
    setMobileTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#17221E] pb-20 md:pb-0">
        <Header
          cartCount={orderSummary.itemCount}
          onOpenOrderDrawer={() => setIsOrderDrawerOpen(true)}
        />

        <main className="flex-1">
          {/* Hero Section: Always visible on desktop, visible on Home tab on mobile */}
          <div className={mobileTab === 'home' ? 'block' : 'hidden md:block'}>
            <HeroSection onExploreMenu={handleExploreMenu} />

            {/* Mobile App Install Card on Mobile Home */}
            <div className="md:hidden max-w-[1380px] mx-auto px-4 pb-6">
              <PWAInstallButton variant="card" />
            </div>
          </div>

          {/* Main Workspace: Left Customizer & Menu Grid + Right Sticky Order Rail */}
          <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-start gap-7">
              <div className="flex-1 min-w-0">
                <div
                  ref={spotlightRef}
                  className={`scroll-mt-20 pt-4 md:pt-0 ${
                    mobileTab === 'customize' ? 'block' : 'hidden md:block'
                  }`}
                >
                  <DishSpotlight
                    selectedDish={selectedDish}
                    onSelectDish={setSelectedDish}
                    onAddCustomizedToCart={addCustomizedToCart}
                    onViewFullMenu={handleExploreMenu}
                  />
                </div>

                <div
                  ref={menuRef}
                  className={`scroll-mt-20 pt-4 md:pt-0 ${
                    mobileTab === 'menu' ? 'block' : 'hidden md:block'
                  }`}
                >
                  <MenuExplorer
                    items={filteredItems}
                    activeCategory={activeCategory}
                    searchQuery={searchQuery}
                    fastingOnly={fastingOnly}
                    sortBy={sortBy}
                    selectedDishId={selectedDish.id}
                    onCategoryChange={setActiveCategory}
                    onSearchChange={setSearchQuery}
                    onToggleFasting={() => setFastingOnly((f) => !f)}
                    onSortChange={setSortBy}
                    onResetFilters={handleResetFilters}
                    onCustomizeDish={handleCustomizeDish}
                    onQuickAddDish={handleQuickAddDish}
                  />
                </div>
              </div>

              <OrderSidebar
                cart={cart}
                summary={orderSummary}
                fulfillment={fulfillment}
                promoInput={promoCode}
                isDrawerOpen={isOrderDrawerOpen}
                onCloseDrawer={() => setIsOrderDrawerOpen(false)}
                onFulfillmentChange={setFulfillment}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onClearCart={handleClearCart}
                onApplyPromo={setPromoCode}
                onOrderConfirmed={handleOrderConfirmed}
              />
            </div>
          </div>

          {/* About, Reviews & Contact: visible on Home tab on mobile, always on desktop */}
          <div className={mobileTab === 'home' ? 'block' : 'hidden md:block'}>
            <AboutAndCatering />
          </div>
        </main>

        <div className={mobileTab === 'home' ? 'block' : 'hidden md:block'}>
          <Footer />
        </div>

        <MobileBottomNav
          activeTab={mobileTab}
          cartCount={orderSummary.itemCount}
          isOrderOpen={isOrderDrawerOpen}
          onSelectTab={handleSelectMobileTab}
          onOpenOrder={() => setIsOrderDrawerOpen(true)}
        />

        <OfflineIndicator />
      </div>
    </MotionConfig>
  );
}

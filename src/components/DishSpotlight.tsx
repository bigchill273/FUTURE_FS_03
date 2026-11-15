import { useEffect, useState } from 'react';
import { Check, Minus, Plus, ShoppingBag } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  DISH_EXTRAS,
  MENU_ITEMS,
  RECOMMENDED_PAIRING_IDS,
  type MenuItem,
} from '../data/blazeMenu';
import { calculateCustomizedUnitPrice, formatBirr } from '../utils/orderMath';
import { DishImage } from './DishImage';

interface DishSpotlightProps {
  selectedDish: MenuItem;
  onSelectDish: (dish: MenuItem) => void;
  onAddCustomizedToCart: (
    dish: MenuItem,
    variantId: string,
    extraIds: string[],
    quantity: number
  ) => void;
  onViewFullMenu?: () => void;
}

const FEATURED_SPOTLIGHT_IDS = [
  'blaze-special-combo',
  'blaze-special-pizza',
  'blaze-special-burger',
  'special-chechebsa',
  'torta-cake',
];

export function DishSpotlight({
  selectedDish,
  onSelectDish,
  onAddCustomizedToCart,
  onViewFullMenu,
}: DishSpotlightProps) {
  const [variantId, setVariantId] = useState<string>(selectedDish.variants[0]?.id ?? 'regular');
  const [extraIds, setExtraIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  // Sync defaults whenever the active dish changes
  useEffect(() => {
    setVariantId(selectedDish.variants[0]?.id ?? 'regular');
    setExtraIds([]);
    setQuantity(1);
    setJustAdded(false);
  }, [selectedDish.id]);

  const quickDishes = FEATURED_SPOTLIGHT_IDS.map((id) =>
    MENU_ITEMS.find((item) => item.id === id)
  ).filter((item): item is MenuItem => Boolean(item));

  const dishInQuickList = quickDishes.some((d) => d.id === selectedDish.id);
  const switcherDishes = dishInQuickList ? quickDishes : [selectedDish, ...quickDishes.slice(0, 4)];

  const availableExtras = DISH_EXTRAS.filter((ex) =>
    selectedDish.compatibleExtras.includes(ex.id)
  );

  const unitPrice = calculateCustomizedUnitPrice(selectedDish, variantId, extraIds, DISH_EXTRAS);
  const lineTotal = unitPrice * quantity;

  const recommendedDishes = RECOMMENDED_PAIRING_IDS.map((id) =>
    MENU_ITEMS.find((item) => item.id === id)
  ).filter((item): item is MenuItem => Boolean(item));

  function toggleExtra(id: string) {
    setExtraIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function handleAdd() {
    onAddCustomizedToCart(selectedDish, variantId, extraIds, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1400);
  }

  return (
    <section id="spotlight" className="pb-10">
      <div className="bg-white rounded-2xl border border-[#112A22]/10 p-5 sm:p-7 shadow-sm">
        {/* Top Signature Dish Switcher */}
        <div className="flex flex-col gap-3.5 pb-5 border-b border-[#112A22]/10">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-[#D6331F] tracking-wide">
                Interactive Dish Customizer
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-xl sm:text-2xl font-semibold text-[#112A22]">
                Build Your Plate
              </h2>
            </div>
            <span className="text-xs text-[#6C7A74]">Choose a signature dish or click Customize below</span>
          </div>

          <div
            role="tablist"
            aria-label="Signature dishes"
            className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full"
          >
            {switcherDishes.map((dish) => {
              const isActive = dish.id === selectedDish.id;
              return (
                <button
                  key={dish.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onSelectDish(dish)}
                  className={`relative px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6331F] ${
                    isActive
                      ? 'text-white'
                      : 'text-[#44524C] bg-[#F5F2EC] hover:bg-[#ECE7DD] hover:text-[#112A22]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="spotlight-dish-pill"
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 rounded-lg bg-[#112A22]"
                    />
                  )}
                  <span className="relative z-10">{dish.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Split: Photo Left + Size/Extras Customizer Right */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedDish.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-7 pt-6 items-center"
          >
            {/* Left Framed Dish Showcase */}
            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5F2EC] border border-[#112A22]/10">
                <DishImage
                  imageKey={selectedDish.imageKey}
                  alt={`${selectedDish.name} (${selectedDish.amharic})`}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-[#54635D]">
                <span>
                  {selectedDish.categoryLabel} · {selectedDish.prepMinutes} min prep
                </span>
                <span>{selectedDish.isFasting ? 'Fasting / Plant-Based' : 'Fresh Kitchen'}</span>
              </div>
            </div>

            {/* Right Customizer Controls */}
            <div className="lg:col-span-7 flex flex-col">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div>
                  <p className="text-xs font-medium text-[#6C7A74]">{selectedDish.amharic}</p>
                  <h3 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-semibold text-[#112A22] tracking-tight">
                    {selectedDish.name}
                  </h3>
                </div>
                {selectedDish.tag && (
                  <span className="text-xs font-semibold text-[#D6331F]">
                    {selectedDish.tag}
                  </span>
                )}
              </div>

              <p className="mt-2.5 text-sm sm:text-[15px] text-[#44524C] leading-relaxed">
                {selectedDish.description}
              </p>

              {/* Portion / Variant Selector */}
              <div className="mt-5">
                <p className="text-xs font-semibold text-[#112A22] mb-2">
                  Portion &amp; Style
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedDish.variants.map((variant) => {
                    const active = variant.id === variantId;
                    const variantPrice = selectedDish.basePrice + variant.priceDelta;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setVariantId(variant.id)}
                        className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6331F] ${
                          active
                            ? 'bg-[#112A22] text-white border-[#112A22]'
                            : 'bg-[#FAF8F5] text-[#17221E] border-[#112A22]/15 hover:border-[#112A22]/40'
                        }`}
                      >
                        <span>{variant.label}</span>
                        <span className="ml-1.5 opacity-80 tabular-nums">
                          ({formatBirr(variantPrice)})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add Extras Grid */}
              {availableExtras.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-semibold text-[#112A22] mb-2">
                    Add Extras &amp; Sides
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {availableExtras.map((extra) => {
                      const checked = extraIds.includes(extra.id);
                      return (
                        <button
                          key={extra.id}
                          type="button"
                          onClick={() => toggleExtra(extra.id)}
                          aria-pressed={checked}
                          className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl border text-left transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6331F] ${
                            checked
                              ? 'bg-[#112A22]/[0.05] border-[#112A22] text-[#112A22]'
                              : 'bg-white border-[#112A22]/12 text-[#33423C] hover:border-[#112A22]/30'
                          }`}
                        >
                          <div className="min-w-0">
                            <p className="text-xs font-medium truncate">{extra.name}</p>
                            <p className="text-[11px] text-[#6C7A74] tabular-nums">
                              +{formatBirr(extra.price)}
                            </p>
                          </div>
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                              checked
                                ? 'bg-[#D6331F] text-white'
                                : 'bg-[#F2EFE9] text-[#112A22]'
                            }`}
                          >
                            {checked ? (
                              <Check className="h-3.5 w-3.5" aria-hidden="true" />
                            ) : (
                              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Price, Quantity Stepper & Add to Order CTA */}
              <div className="mt-6 pt-5 border-t border-[#112A22]/10 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs text-[#6C7A74]">Item Total</p>
                  <p className="text-2xl font-bold text-[#112A22] tabular-nums tracking-tight">
                    {formatBirr(lineTotal)}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center rounded-lg border border-[#112A22]/15 bg-[#FAF8F5]">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease spotlight quantity"
                      className="w-9 h-9 flex items-center justify-center text-[#112A22] hover:bg-[#ECE7DD] rounded-l-lg transition-colors cursor-pointer"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span
                      aria-live="polite"
                      className="w-8 text-center text-sm font-semibold tabular-nums"
                    >
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="Increase spotlight quantity"
                      className="w-9 h-9 flex items-center justify-center text-[#112A22] hover:bg-[#ECE7DD] rounded-r-lg transition-colors cursor-pointer"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleAdd}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D6331F] hover:bg-[#BE2B19] text-white text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6331F] focus-visible:ring-offset-2"
                  >
                    {justAdded ? (
                      <>
                        <Check className="h-4 w-4" aria-hidden="true" />
                        <span>Added to Order</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                        <span>Add to Order</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Recommended Pairings Strip (inspired by BiteNova bottom row) */}
        <div className="mt-7 pt-5 border-t border-[#112A22]/10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-[#112A22]">
              Pair with Fresh Bakery &amp; Sides
            </h3>
            <a
              href="#menu"
              onClick={(e) => {
                if (onViewFullMenu) {
                  e.preventDefault();
                  onViewFullMenu();
                }
              }}
              className="text-xs font-medium text-[#D6331F] hover:underline whitespace-nowrap"
            >
              See full menu →
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {recommendedDishes.map((rec) => (
              <div
                key={rec.id}
                className="flex items-center justify-between gap-2.5 p-2.5 rounded-xl bg-[#FAF8F5] border border-[#112A22]/10"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <DishImage
                    imageKey={rec.imageKey}
                    alt={rec.name}
                    className="w-11 h-11 rounded-lg object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-[#112A22] leading-tight line-clamp-2">
                      {rec.name}
                    </p>
                    <p className="text-xs font-semibold text-[#D6331F] tabular-nums mt-0.5">
                      {formatBirr(rec.basePrice)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onAddCustomizedToCart(rec, rec.variants[0]?.id ?? 'regular', [], 1)
                  }
                  aria-label={`Quick add ${rec.name}`}
                  className="w-8 h-8 rounded-lg bg-[#112A22] hover:bg-[#193C31] text-white flex items-center justify-center shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6331F]"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

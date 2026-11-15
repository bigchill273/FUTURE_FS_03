import { useState, type FormEvent } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Tag,
  Trash2,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data/blazeMenu';
import {
  FREE_DELIVERY_THRESHOLD_BIRR,
  formatBirr,
  validateOrderForm,
  type CartItem,
  type CartSummary,
  type FulfillmentMode,
  type OrderFormInput,
  type OrderValidationResult,
} from '../utils/orderMath';
import { DishImage } from './DishImage';

interface OrderPanelContentProps {
  cart: CartItem[];
  summary: CartSummary;
  fulfillment: FulfillmentMode;
  promoInput: string;
  onFulfillmentChange: (mode: FulfillmentMode) => void;
  onUpdateQuantity: (cartKey: string, delta: number) => void;
  onRemoveItem: (cartKey: string) => void;
  onClearCart: () => void;
  onApplyPromo: (code: string) => void;
  onOrderConfirmed: () => void;
  onCloseDrawer?: () => void;
}

interface ConfirmedReceipt {
  orderNumber: string;
  customerName: string;
  phone: string;
  fulfillment: FulfillmentMode;
  address: string;
  total: number;
  itemCount: number;
}

function OrderPanelContent({
  cart,
  summary,
  fulfillment,
  promoInput,
  onFulfillmentChange,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onApplyPromo,
  onOrderConfirmed,
  onCloseDrawer,
}: OrderPanelContentProps) {
  const [promoDraft, setPromoDraft] = useState(promoInput);
  const [step, setStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [form, setForm] = useState<OrderFormInput>({
    customerName: '',
    phone: '',
    fulfillment,
    address: '',
    notes: '',
  });
  const [validationErrors, setValidationErrors] = useState<OrderValidationResult['errors']>({});
  const [receipt, setReceipt] = useState<ConfirmedReceipt | null>(null);

  function handlePromoSubmit(e: FormEvent) {
    e.preventDefault();
    onApplyPromo(promoDraft);
  }

  function handleCheckoutSubmit(e: FormEvent) {
    e.preventDefault();
    const payload: OrderFormInput = { ...form, fulfillment };
    const result = validateOrderForm(payload);
    if (!result.valid) {
      setValidationErrors(result.errors);
      return;
    }

    setValidationErrors({});
    const orderNumber = `BA-${Math.floor(1000 + Math.random() * 9000)}`;
    setReceipt({
      orderNumber,
      customerName: payload.customerName.trim(),
      phone: payload.phone.trim(),
      fulfillment,
      address: payload.address.trim(),
      total: summary.total,
      itemCount: summary.itemCount,
    });
    setStep('confirmed');
    onOrderConfirmed();
  }

  function handleResetNewOrder() {
    setReceipt(null);
    setStep('cart');
    setForm({
      customerName: '',
      phone: '',
      fulfillment,
      address: '',
      notes: '',
    });
  }

  // Confirmed Receipt State
  if (step === 'confirmed' && receipt) {
    return (
      <div className="flex flex-col h-full justify-between p-5">
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-[#112A22]">Order Receipt</span>
            {onCloseDrawer && (
              <button
                type="button"
                onClick={onCloseDrawer}
                aria-label="Close order drawer"
                className="p-1.5 rounded-lg text-[#54635D] hover:bg-[#F5F2EC] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="rounded-xl bg-[#112A22] text-white p-5">
            <CheckCircle2 className="h-7 w-7 text-[#FBBF24] mb-3" aria-hidden="true" />
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
              Order {receipt.orderNumber} Confirmed
            </h3>
            <p className="text-xs text-white/80 mt-1 leading-relaxed">
              Thank you, {receipt.customerName}. Our kitchen in 24 Kebele, Megenagna has received
              your {receipt.itemCount}-item order.
            </p>
          </div>

          <div className="mt-4 space-y-2.5 text-xs bg-[#FAF8F5] rounded-xl p-4 border border-[#112A22]/10">
            <div className="flex justify-between">
              <span className="text-[#54635D]">Fulfillment</span>
              <span className="font-semibold text-[#112A22]">
                {receipt.fulfillment === 'pickup' ? 'Pickup at 24 Kebele' : 'Addis Delivery'}
              </span>
            </div>
            {receipt.fulfillment === 'delivery' && receipt.address && (
              <div className="flex justify-between gap-4">
                <span className="text-[#54635D] shrink-0">Location</span>
                <span className="font-medium text-[#112A22] text-right">{receipt.address}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-[#54635D]">Contact Phone</span>
              <span className="font-medium text-[#112A22] tabular-nums">{receipt.phone}</span>
            </div>
            <div className="pt-2 border-t border-[#112A22]/10 flex justify-between text-sm font-semibold text-[#112A22]">
              <span>Total Due</span>
              <span className="font-bold tabular-nums text-[#D6331F]">
                {formatBirr(receipt.total)}
              </span>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-[#112A22]/10 p-3.5 text-xs text-[#44524C]">
            <p className="font-semibold text-[#112A22] mb-1">Need immediate kitchen updates?</p>
            <a
              href={RESTAURANT_INFO.phones[0].href}
              className="inline-flex items-center gap-1.5 text-[#D6331F] font-medium hover:underline"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="tabular-nums">{RESTAURANT_INFO.phones[0].display}</span>
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={handleResetNewOrder}
          className="mt-6 w-full py-2.5 px-4 rounded-xl bg-[#112A22] hover:bg-[#193C31] text-white text-sm font-semibold transition-colors cursor-pointer"
        >
          Start New Order
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 py-4 border-b border-[#112A22]/10 flex items-center justify-between gap-2">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#112A22]">
            {step === 'checkout' ? 'Confirm Details' : 'My Order'}
          </h2>
          <p className="text-xs text-[#6C7A74] tabular-nums">
            {summary.itemCount} {summary.itemCount === 1 ? 'item' : 'items'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {cart.length > 0 && step === 'cart' && (
            <button
              type="button"
              onClick={onClearCart}
              className="text-xs font-medium text-[#6C7A74] hover:text-[#D6331F] transition-colors cursor-pointer"
            >
              Clear
            </button>
          )}
          {onCloseDrawer && (
            <button
              type="button"
              onClick={onCloseDrawer}
              aria-label="Close order panel"
              className="p-1.5 rounded-lg text-[#54635D] hover:bg-[#F5F2EC] cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Pickup vs Delivery Toggle */}
      {step === 'cart' && (
        <div className="px-5 pt-4">
          <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-[#F3EFE7]">
            <button
              type="button"
              onClick={() => onFulfillmentChange('pickup')}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                fulfillment === 'pickup'
                  ? 'bg-white text-[#112A22] shadow-xs'
                  : 'text-[#54635D] hover:text-[#112A22]'
              }`}
            >
              Pickup (Free)
            </button>
            <button
              type="button"
              onClick={() => onFulfillmentChange('delivery')}
              className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                fulfillment === 'delivery'
                  ? 'bg-white text-[#112A22] shadow-xs'
                  : 'text-[#54635D] hover:text-[#112A22]'
              }`}
            >
              Addis Delivery
            </button>
          </div>
          {fulfillment === 'delivery' && summary.subtotal > 0 && (
            <p className="mt-2 text-[11px] text-[#54635D]">
              {summary.deliveryFee === 0
                ? 'Free Addis delivery unlocked!'
                : `Free delivery on orders above ${formatBirr(FREE_DELIVERY_THRESHOLD_BIRR)}.`}
            </p>
          )}
        </div>
      )}

      {/* Body: Cart Items or Checkout Form */}
      {step === 'checkout' ? (
        <form onSubmit={handleCheckoutSubmit} className="p-5 flex-1 flex flex-col justify-between">
          <div className="space-y-3.5">
            <div>
              <label htmlFor="checkout-name" className="block text-xs font-semibold text-[#112A22] mb-1">
                Full Name
              </label>
              <input
                id="checkout-name"
                type="text"
                value={form.customerName}
                onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
                placeholder="Abebe Bikila"
                className="w-full h-10 px-3 rounded-lg border border-[#112A22]/15 text-sm focus:outline-none focus:border-[#112A22]"
              />
              {validationErrors.customerName && (
                <p className="mt-1 text-xs text-[#D6331F]">{validationErrors.customerName}</p>
              )}
            </div>

            <div>
              <label htmlFor="checkout-phone" className="block text-xs font-semibold text-[#112A22] mb-1">
                Phone Number
              </label>
              <input
                id="checkout-phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="+251 911 000 000"
                className="w-full h-10 px-3 rounded-lg border border-[#112A22]/15 text-sm focus:outline-none focus:border-[#112A22]"
              />
              {validationErrors.phone && (
                <p className="mt-1 text-xs text-[#D6331F]">{validationErrors.phone}</p>
              )}
            </div>

            {fulfillment === 'delivery' && (
              <div>
                <label
                  htmlFor="checkout-address"
                  className="block text-xs font-semibold text-[#112A22] mb-1"
                >
                  Delivery Neighborhood / Landmark
                </label>
                <input
                  id="checkout-address"
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  placeholder="Megenagna, near Adey Ababa Stadium"
                  className="w-full h-10 px-3 rounded-lg border border-[#112A22]/15 text-sm focus:outline-none focus:border-[#112A22]"
                />
                {validationErrors.address && (
                  <p className="mt-1 text-xs text-[#D6331F]">{validationErrors.address}</p>
                )}
              </div>
            )}

            <div>
              <label htmlFor="checkout-notes" className="block text-xs font-semibold text-[#112A22] mb-1">
                Kitchen Notes (Optional)
              </label>
              <textarea
                id="checkout-notes"
                rows={2}
                value={form.notes}
                onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                placeholder="Spice preference, cake message, or pickup time..."
                className="w-full p-3 rounded-lg border border-[#112A22]/15 text-sm focus:outline-none focus:border-[#112A22]"
              />
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-[#112A22]/10 space-y-2.5">
            <div className="flex justify-between text-sm font-semibold text-[#112A22]">
              <span>Order Total</span>
              <span className="font-bold tabular-nums">
                {formatBirr(summary.total)}
              </span>
            </div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#D6331F] hover:bg-[#BE2B19] text-white text-sm font-semibold transition-colors cursor-pointer"
            >
              Place Order Now
            </button>
            <button
              type="button"
              onClick={() => setStep('cart')}
              className="w-full py-2 px-4 rounded-xl border border-[#112A22]/15 text-xs font-medium text-[#112A22] hover:bg-[#FAF8F5] transition-colors cursor-pointer"
            >
              Back to Cart
            </button>
          </div>
        </form>
      ) : cart.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#F3EFE7] flex items-center justify-center text-[#112A22]/60 mb-3">
            <ShoppingBag className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="text-sm font-semibold text-[#112A22]">Your order is empty</p>
          <p className="text-xs text-[#6C7A74] mt-1 max-w-[220px]">
            Select any Habeshan dish, pizza, or fresh pastry to start your Blaze Addis order.
          </p>
        </div>
      ) : (
        <>
          {/* Itemized Cart List */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 max-h-[380px] xl:max-h-[340px]">
            <AnimatePresence initial={false}>
              {cart.map((item) => (
                <motion.div
                  key={item.cartKey}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: 16 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-3 p-2.5 rounded-xl bg-[#FAF8F5] border border-[#112A22]/10"
                >
                  <DishImage
                    imageKey={item.imageKey}
                    alt={item.name}
                    className="w-14 h-14 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-[#112A22] leading-snug truncate">
                        {item.name}
                      </p>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.cartKey)}
                        aria-label={`Remove ${item.name}`}
                        className="text-[#7A8882] hover:text-[#D6331F] transition-colors cursor-pointer shrink-0"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <p className="text-[11px] text-[#6C7A74] truncate">
                      {item.variantLabel}
                      {item.extraNames.length > 0 ? ` · +${item.extraNames.join(', ')}` : ''}
                    </p>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#D6331F] tabular-nums">
                        {formatBirr(item.unitPrice * item.quantity)}
                      </span>
                      <div className="inline-flex items-center rounded-lg border border-[#112A22]/15 bg-white">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartKey, -1)}
                          aria-label={`Decrease quantity of ${item.name}`}
                          className="w-8 h-8 md:w-7 md:h-7 flex items-center justify-center text-[#112A22] hover:bg-[#F3EFE7] cursor-pointer"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-semibold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartKey, 1)}
                          aria-label={`Increase quantity of ${item.name}`}
                          className="w-8 h-8 md:w-7 md:h-7 flex items-center justify-center text-[#112A22] hover:bg-[#F3EFE7] cursor-pointer"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Promo Code + Totals Footer */}
          <div className="px-5 py-4 border-t border-[#112A22]/10 bg-white rounded-b-2xl">
            <form onSubmit={handlePromoSubmit} className="flex gap-2 mb-3">
              <div className="relative flex-1">
                <label htmlFor="promo-code-input" className="sr-only">
                  Promo code
                </label>
                <Tag
                  className="h-3.5 w-3.5 text-[#6C7A74] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="promo-code-input"
                  type="text"
                  value={promoDraft}
                  onChange={(e) => setPromoDraft(e.target.value)}
                  placeholder="Promo code (BLAZE10)"
                  className="w-full h-9 pl-8 pr-2.5 rounded-lg bg-[#FAF8F5] border border-[#112A22]/15 text-xs text-[#17221E] placeholder:text-[#7A8882] focus:outline-none focus:border-[#112A22]"
                />
              </div>
              <button
                type="submit"
                className="px-3.5 h-9 rounded-lg bg-[#112A22] hover:bg-[#193C31] text-white text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {summary.promoError && (
              <p className="text-[11px] text-[#D6331F] mb-2">{summary.promoError}</p>
            )}
            {summary.promoApplied && (
              <p className="text-[11px] text-[#112A22] font-medium mb-2">
                Code {summary.promoApplied} applied!
              </p>
            )}

            <div className="space-y-1.5 text-xs text-[#54635D]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#17221E] tabular-nums">
                  {formatBirr(summary.subtotal)}
                </span>
              </div>
              {summary.discountAmount > 0 && (
                <div className="flex justify-between text-[#112A22]">
                  <span>Discount ({summary.promoApplied})</span>
                  <span className="font-semibold tabular-nums">
                    -{formatBirr(summary.discountAmount)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>{fulfillment === 'pickup' ? 'Pickup' : 'Delivery Fee'}</span>
                <span className="font-medium text-[#17221E] tabular-nums">
                  {summary.deliveryFee === 0 ? 'FREE' : formatBirr(summary.deliveryFee)}
                </span>
              </div>
              <div className="pt-2 border-t border-[#112A22]/10 flex justify-between items-baseline text-sm font-semibold text-[#112A22]">
                <span>Total</span>
                <span className="text-base font-bold tabular-nums">
                  {formatBirr(summary.total)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setStep('checkout')}
              className="mt-4 w-full py-2.5 px-4 rounded-xl bg-[#D6331F] hover:bg-[#BE2B19] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6331F] focus-visible:ring-offset-2"
            >
              <span>Confirm Order</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

interface OrderSidebarProps extends OrderPanelContentProps {
  isDrawerOpen: boolean;
  onCloseDrawer: () => void;
}

export function OrderSidebar({ isDrawerOpen, onCloseDrawer, ...props }: OrderSidebarProps) {
  return (
    <>
      {/* Desktop Sticky Cart Rail */}
      <aside
        aria-label="Current order summary"
        className="hidden xl:block w-[360px] shrink-0"
      >
        <div className="sticky top-22 bg-white rounded-2xl border border-[#112A22]/10 shadow-sm overflow-hidden">
          <OrderPanelContent {...props} />
        </div>
      </aside>

      {/* Mobile Bottom Sheet / Tablet Slide-Over Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-50 xl:hidden flex items-end sm:items-stretch sm:justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onCloseDrawer}
              className="fixed inset-0 bg-black/45 backdrop-blur-[2px]"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="My Order"
              initial={{ y: '100%', opacity: 0.9 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0.9 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-none max-h-[88dvh] sm:max-h-none sm:h-full shadow-xl flex flex-col overflow-y-auto pb-[env(safe-area-inset-bottom)]"
            >
              <div
                aria-hidden="true"
                className="w-10 h-1.5 rounded-full bg-[#112A22]/15 mx-auto mt-3 mb-1 sm:hidden shrink-0"
              />
              <OrderPanelContent {...props} onCloseDrawer={onCloseDrawer} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

import type { DishExtra, MenuCategoryId, MenuItem } from '../data/blazeMenu';

export type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'prep-asc';
export type FulfillmentMode = 'pickup' | 'delivery';

export interface FilterCriteria {
  category: MenuCategoryId;
  query: string;
  fastingOnly: boolean;
  sort: SortOption;
}

export interface CartItem {
  cartKey: string;
  dishId: string;
  name: string;
  amharic: string;
  imageKey: MenuItem['imageKey'];
  variantId: string;
  variantLabel: string;
  extraIds: string[];
  extraNames: string[];
  unitPrice: number;
  quantity: number;
}

export interface CartSummary {
  itemCount: number;
  subtotal: number;
  discountRate: number;
  discountAmount: number;
  deliveryFee: number;
  total: number;
  promoApplied: string | null;
  promoError: string | null;
}

export interface OrderFormInput {
  customerName: string;
  phone: string;
  fulfillment: FulfillmentMode;
  address: string;
  notes: string;
}

export interface OrderValidationResult {
  valid: boolean;
  errors: Partial<Record<'customerName' | 'phone' | 'address', string>>;
}

export const DELIVERY_FEE_BIRR = 80;
export const FREE_DELIVERY_THRESHOLD_BIRR = 1200;

export function formatBirr(amount: number): string {
  return `Birr ${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function filterMenuItems(items: MenuItem[], criteria: FilterCriteria): MenuItem[] {
  const normalizedQuery = criteria.query.trim().toLowerCase();

  const filtered = items.filter((item) => {
    if (criteria.category !== 'all' && item.category !== criteria.category) {
      return false;
    }
    if (criteria.fastingOnly && !item.isFasting) {
      return false;
    }
    if (normalizedQuery.length > 0) {
      const haystack = [
        item.name,
        item.amharic,
        item.description,
        item.categoryLabel,
        ...item.variants.map((v) => v.label),
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(normalizedQuery)) {
        return false;
      }
    }
    return true;
  });

  const sorted = [...filtered];
  if (criteria.sort === 'price-asc') {
    sorted.sort((a, b) => a.basePrice - b.basePrice);
  } else if (criteria.sort === 'price-desc') {
    sorted.sort((a, b) => b.basePrice - a.basePrice);
  } else if (criteria.sort === 'prep-asc') {
    sorted.sort((a, b) => a.prepMinutes - b.prepMinutes);
  } else {
    sorted.sort((a, b) => Number(Boolean(b.isFeatured)) - Number(Boolean(a.isFeatured)));
  }

  return sorted;
}

export function calculateCustomizedUnitPrice(
  item: MenuItem,
  variantId: string,
  extraIds: string[],
  allExtras: DishExtra[]
): number {
  const variant = item.variants.find((v) => v.id === variantId) ?? item.variants[0];
  const variantDelta = variant ? variant.priceDelta : 0;

  const extrasTotal = extraIds.reduce((sum, extraId) => {
    const found = allExtras.find((e) => e.id === extraId);
    return sum + (found ? found.price : 0);
  }, 0);

  return Math.max(0, item.basePrice + variantDelta + extrasTotal);
}

export function buildCartKey(dishId: string, variantId: string, extraIds: string[]): string {
  const sortedExtras = [...extraIds].sort().join(',');
  return `${dishId}::${variantId}::${sortedExtras}`;
}

export function calculateCartTotals(
  cartItems: CartItem[],
  promoCode: string,
  fulfillment: FulfillmentMode
): CartSummary {
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  const normalizedPromo = promoCode.trim().toUpperCase();
  let discountRate = 0;
  let discountAmount = 0;
  let promoApplied: string | null = null;
  let promoError: string | null = null;

  if (normalizedPromo.length > 0 && subtotal > 0) {
    if (normalizedPromo === 'BLAZE10') {
      discountRate = 0.1;
      discountAmount = Math.round(subtotal * discountRate * 100) / 100;
      promoApplied = 'BLAZE10';
    } else if (normalizedPromo === 'ADDIS50') {
      if (subtotal >= 400) {
        discountAmount = 50;
        promoApplied = 'ADDIS50';
      } else {
        promoError = 'ADDIS50 requires at least Birr 400.00 subtotal';
      }
    } else {
      promoError = 'Unknown code. Try BLAZE10 for 10% off.';
    }
  }

  const afterDiscount = Math.max(0, subtotal - discountAmount);
  const deliveryFee =
    fulfillment === 'pickup' || subtotal === 0 || afterDiscount >= FREE_DELIVERY_THRESHOLD_BIRR
      ? 0
      : DELIVERY_FEE_BIRR;

  const total = Math.round((afterDiscount + deliveryFee) * 100) / 100;

  return {
    itemCount,
    subtotal,
    discountRate,
    discountAmount,
    deliveryFee,
    total,
    promoApplied,
    promoError,
  };
}

export function validateOrderForm(form: OrderFormInput): OrderValidationResult {
  const errors: OrderValidationResult['errors'] = {};

  if (form.customerName.trim().length < 2) {
    errors.customerName = 'Please enter your full name.';
  }

  const digits = form.phone.replace(/\D/g, '');
  if (digits.length < 9) {
    errors.phone = 'Enter a valid Ethiopian phone number (e.g. +251 9XX XXX XXX).';
  }

  if (form.fulfillment === 'delivery' && form.address.trim().length < 5) {
    errors.address = 'Please enter your Addis Ababa delivery neighborhood or landmark.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

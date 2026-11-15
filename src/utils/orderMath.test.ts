import test from 'node:test';
import assert from 'node:assert/strict';
import { DISH_EXTRAS, MENU_ITEMS } from '../data/blazeMenu';
import {
  buildCartKey,
  calculateCartTotals,
  calculateCustomizedUnitPrice,
  filterMenuItems,
  formatBirr,
  validateOrderForm,
  type CartItem,
} from './orderMath';

test('formatBirr formats currency cleanly with two decimals', () => {
  assert.equal(formatBirr(550), 'Birr 550.00');
  assert.equal(formatBirr(1500), 'Birr 1,500.00');
});

test('filterMenuItems filters by category, fasting flag, and bilingual query', () => {
  const pizzaResults = filterMenuItems(MENU_ITEMS, {
    category: 'pizza',
    query: '',
    fastingOnly: false,
    sort: 'featured',
  });
  assert.ok(pizzaResults.length >= 4);
  assert.ok(pizzaResults.every((i) => i.category === 'pizza'));

  const amharicSearch = filterMenuItems(MENU_ITEMS, {
    category: 'all',
    query: 'ሽሮ',
    fastingOnly: false,
    sort: 'featured',
  });
  assert.ok(amharicSearch.some((i) => i.id === 'blaze-special-shiro'));
  assert.ok(amharicSearch.some((i) => i.id === 'fasting-shiro'));

  const fastingOnly = filterMenuItems(MENU_ITEMS, {
    category: 'all',
    query: '',
    fastingOnly: true,
    sort: 'price-asc',
  });
  assert.ok(fastingOnly.length >= 5);
  assert.ok(fastingOnly.every((i) => i.isFasting === true));
  for (let i = 1; i < fastingOnly.length; i += 1) {
    assert.ok(fastingOnly[i].basePrice >= fastingOnly[i - 1].basePrice);
  }
});

test('calculateCustomizedUnitPrice sums base price, variant delta, and extras', () => {
  const torta = MENU_ITEMS.find((i) => i.id === 'torta-cake');
  assert.ok(torta);
  assert.equal(calculateCustomizedUnitPrice(torta, '1kg', [], DISH_EXTRAS), 800);
  assert.equal(calculateCustomizedUnitPrice(torta, '2kg', ['extra-honey'], DISH_EXTRAS), 1510);
});

test('calculateCartTotals computes subtotal, BLAZE10 promo, and free delivery threshold', () => {
  const sampleCart: CartItem[] = [
    {
      cartKey: buildCartKey('blaze-special-pizza', 'regular', ['extra-mozzarella']),
      dishId: 'blaze-special-pizza',
      name: 'Blaze Special Pizza',
      amharic: 'ብሌዝ ስፔሻል ፒዛ',
      imageKey: 'pizza',
      variantId: 'regular',
      variantLabel: 'Standard 12"',
      extraIds: ['extra-mozzarella'],
      extraNames: ['Mozzarella Cheese'],
      unitPrice: 550,
      quantity: 2,
    },
  ];

  const pickup = calculateCartTotals(sampleCart, 'BLAZE10', 'pickup');
  assert.equal(pickup.itemCount, 2);
  assert.equal(pickup.subtotal, 1100);
  assert.equal(pickup.discountAmount, 110);
  assert.equal(pickup.deliveryFee, 0);
  assert.equal(pickup.total, 990);
  assert.equal(pickup.promoApplied, 'BLAZE10');

  const deliveryBelowFree = calculateCartTotals(sampleCart, 'BLAZE10', 'delivery');
  assert.equal(deliveryBelowFree.deliveryFee, 80);
  assert.equal(deliveryBelowFree.total, 1070);

  const invalidPromo = calculateCartTotals(sampleCart, 'BADCODE', 'pickup');
  assert.equal(invalidPromo.discountAmount, 0);
  assert.ok(invalidPromo.promoError);
});

test('validateOrderForm enforces required name, valid phone, and delivery address', () => {
  const invalid = validateOrderForm({
    customerName: 'A',
    phone: '123',
    fulfillment: 'delivery',
    address: '',
    notes: '',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.customerName);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.address);

  const validPickup = validateOrderForm({
    customerName: 'Natnael Shumete',
    phone: '+251 911 234 567',
    fulfillment: 'pickup',
    address: '',
    notes: 'No chili',
  });
  assert.equal(validPickup.valid, true);
});

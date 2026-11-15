export type MenuCategoryId =
  | 'all'
  | 'breakfast'
  | 'habeshan'
  | 'fasting'
  | 'pizza'
  | 'burgers'
  | 'grill'
  | 'pasta'
  | 'bakery';

export type ImageKey =
  | 'hero'
  | 'habeshan'
  | 'pizza'
  | 'burger'
  | 'breakfast'
  | 'bakery'
  | 'pastaGrill';

export interface DishVariant {
  id: string;
  label: string;
  priceDelta: number; // Added to basePrice
}

export interface DishExtra {
  id: string;
  name: string;
  amharic: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  amharic: string;
  category: Exclude<MenuCategoryId, 'all'>;
  categoryLabel: string;
  basePrice: number;
  description: string;
  prepMinutes: number;
  isFasting?: boolean;
  isFeatured?: boolean;
  tag?: string;
  imageKey: ImageKey;
  variants: DishVariant[];
  compatibleExtras: string[];
}

export const MENU_CATEGORIES: { id: MenuCategoryId; label: string }[] = [
  { id: 'all', label: 'All Dishes' },
  { id: 'habeshan', label: 'Habeshan' },
  { id: 'fasting', label: 'Fasting' },
  { id: 'breakfast', label: 'Breakfast' },
  { id: 'pizza', label: 'Pizza' },
  { id: 'burgers', label: 'Burgers' },
  { id: 'grill', label: 'Fish & Chicken' },
  { id: 'pasta', label: 'Pasta & Wraps' },
  { id: 'bakery', label: 'Bakery & Cakes' },
];

export const DISH_EXTRAS: DishExtra[] = [
  { id: 'extra-injera', name: '100% Teff Injera', amharic: 'የእጅ ሥራ እንጀራ', price: 30 },
  { id: 'extra-mozzarella', name: 'Mozzarella Cheese', amharic: 'ሞዛሬላ አይብ', price: 70 },
  { id: 'extra-bread', name: 'Extra Fresh Bread', amharic: 'ተጨማሪ ዳቦ', price: 15 },
  { id: 'extra-honey', name: 'Pure Ethiopian Honey', amharic: 'ተጨማሪ ማር', price: 10 },
  { id: 'extra-chili', name: 'House Chili Sauce', amharic: 'ቺሊ ሶስ', price: 15 },
  { id: 'extra-mayo', name: 'Herb Mayonnaise', amharic: 'ተጨማሪ ማዮኔዝ', price: 15 },
  { id: 'extra-ketchup', name: 'Tomato Ketchup', amharic: 'ኬችአፕ', price: 10 },
  { id: 'extra-fries', name: 'Crispy French Fries', amharic: 'ፍሬንች ፍራይስ', price: 100 },
];

const HABESHAN_EXTRAS = ['extra-injera', 'extra-chili', 'extra-bread'];
const BREAKFAST_EXTRAS = ['extra-honey', 'extra-bread', 'extra-chili'];
const CAFE_EXTRAS = ['extra-mozzarella', 'extra-fries', 'extra-chili', 'extra-mayo'];
const BAKERY_EXTRAS = ['extra-honey'];

export const MENU_ITEMS: MenuItem[] = [
  // --- Signature & Non-Fasting Habeshan ---
  {
    id: 'blaze-special-combo',
    name: 'Blaze Special Combo',
    amharic: 'ብሌዝ ስፔሻል ኮምቦ',
    category: 'habeshan',
    categoryLabel: 'Habeshan',
    basePrice: 550,
    description:
      'Signature tasting platter over daily 100% teff injera with sizzling lamb tibs, rich shiro, doro wat, and fresh house greens.',
    prepMinutes: 22,
    isFeatured: true,
    tag: "Chef's Pick",
    imageKey: 'habeshan',
    variants: [
      { id: 'single', label: 'Single Platter', priceDelta: 0 },
      { id: 'sharing', label: 'Sharing (2 Guests)', priceDelta: 450 },
    ],
    compatibleExtras: HABESHAN_EXTRAS,
  },
  {
    id: 'lamb-tibs',
    name: 'Lamb Tibs',
    amharic: 'የበግ ጥብስ',
    category: 'habeshan',
    categoryLabel: 'Habeshan',
    basePrice: 350,
    description:
      'Tender cubed lamb sautéed in clarified spiced butter with caramelized onions, rosemary, and green chili over teff injera.',
    prepMinutes: 18,
    isFeatured: true,
    imageKey: 'habeshan',
    variants: [
      { id: 'regular', label: 'Regular', priceDelta: 0 },
      { id: 'special', label: 'Special Tibs', priceDelta: 80 },
    ],
    compatibleExtras: HABESHAN_EXTRAS,
  },
  {
    id: 'tibs-tefersho',
    name: 'Tibs Tefersho',
    amharic: 'ጥብስ ተፈረሸ',
    category: 'habeshan',
    categoryLabel: 'Habeshan',
    basePrice: 350,
    description:
      'Pan-seared beef tibs tossed directly with torn teff injera, aromatic mitmita, and savory spiced pan drippings.',
    prepMinutes: 18,
    imageKey: 'habeshan',
    variants: [{ id: 'regular', label: 'Standard', priceDelta: 0 }],
    compatibleExtras: HABESHAN_EXTRAS,
  },
  {
    id: 'lamb-kikil',
    name: 'Lamb Kikil',
    amharic: 'የበግ ክክል',
    category: 'habeshan',
    categoryLabel: 'Habeshan',
    basePrice: 400,
    description:
      'Slow-simmered bone-in lamb broth infused with turmeric, garlic, ginger, and fresh herbs served piping hot.',
    prepMinutes: 20,
    imageKey: 'habeshan',
    variants: [{ id: 'regular', label: 'Bowl + Injera', priceDelta: 0 }],
    compatibleExtras: HABESHAN_EXTRAS,
  },
  {
    id: 'doro-wat',
    name: 'Spicy Ethiopian Chicken Stew (Doro Wat)',
    amharic: 'የዶሮ ወጥ (በአበሻ)',
    category: 'habeshan',
    categoryLabel: 'Habeshan',
    basePrice: 350,
    description:
      'Traditional slow-braised chicken simmered in deep berbere reduction, spiced niter kibbeh, and soft-boiled egg.',
    prepMinutes: 20,
    isFeatured: true,
    tag: 'House Favorite',
    imageKey: 'habeshan',
    variants: [
      { id: 'plate', label: 'Individual Plate', priceDelta: 0 },
      { id: 'whole', label: 'Whole Stew (10 Guests)', priceDelta: 2450 },
    ],
    compatibleExtras: HABESHAN_EXTRAS,
  },
  {
    id: 'blaze-special-shiro',
    name: 'Blaze Special Shiro with Butter',
    amharic: 'ብሌዝ ስፔሻል ሽሮ በቅቤ',
    category: 'habeshan',
    categoryLabel: 'Habeshan',
    basePrice: 200,
    description:
      'Velvety roasted chickpea stew whipped in clay pot with clarified Ethiopian butter, garlic, and warm green peppers.',
    prepMinutes: 15,
    imageKey: 'habeshan',
    variants: [
      { id: 'special', label: 'Special', priceDelta: 0 },
      { id: 'with-meat', label: 'With Beef', priceDelta: 50 },
    ],
    compatibleExtras: HABESHAN_EXTRAS,
  },
  {
    id: 'quanta-firfir',
    name: 'Quanta Firfir',
    amharic: 'ቁንጣ ፍርፍር',
    category: 'habeshan',
    categoryLabel: 'Habeshan',
    basePrice: 290,
    description:
      'Spiced air-dried beef simmered in berbere sauce and folded with fresh teff injera and niter kibbeh.',
    prepMinutes: 16,
    imageKey: 'habeshan',
    variants: [
      { id: 'fresh-injera', label: 'Fresh Injera', priceDelta: 0 },
      { id: 'dirkosh', label: 'Dirkosh Crisp', priceDelta: 60 },
    ],
    compatibleExtras: HABESHAN_EXTRAS,
  },
  {
    id: 'agelgil-5',
    name: 'Agelgil Feast for 5 People',
    amharic: 'አገልግል ለ5 ሰዎች',
    category: 'habeshan',
    categoryLabel: 'Habeshan',
    basePrice: 1500,
    description:
      'Generous group feast prepared for family gatherings and celebrations with assorted stews, tibs, ayib, and fresh teff injera.',
    prepMinutes: 30,
    tag: 'Group Feast',
    imageKey: 'habeshan',
    variants: [{ id: 'five-guests', label: 'Serves 5 Guests', priceDelta: 0 }],
    compatibleExtras: HABESHAN_EXTRAS,
  },

  // --- Fasting Habeshan ---
  {
    id: 'beyaynet',
    name: 'Beyaynet Platter',
    amharic: 'በያይነት',
    category: 'fasting',
    categoryLabel: 'Fasting',
    basePrice: 220,
    description:
      'Colorful 100% plant-based assortment of red lentils, yellow split peas, collard greens, beetroot, and spiced shiro on teff injera.',
    prepMinutes: 15,
    isFasting: true,
    isFeatured: true,
    tag: 'Plant-Based',
    imageKey: 'habeshan',
    variants: [
      { id: 'standard', label: 'Full Platter', priceDelta: 0 },
      { id: 'sharing', label: 'Double Platter', priceDelta: 190 },
    ],
    compatibleExtras: HABESHAN_EXTRAS,
  },
  {
    id: 'fasting-shiro',
    name: 'Special Fasting Shiro',
    amharic: 'ስፔሻል ሽሮ',
    category: 'fasting',
    categoryLabel: 'Fasting',
    basePrice: 180,
    description:
      'Fragrant clay-pot chickpea stew prepared exclusively with healthy pure vegetable oils and roasted berbere.',
    prepMinutes: 14,
    isFasting: true,
    imageKey: 'habeshan',
    variants: [
      { id: 'special', label: 'Special Shiro', priceDelta: 0 },
      { id: 'tegabino', label: 'Tegabino Clay Pot', priceDelta: -10 },
    ],
    compatibleExtras: HABESHAN_EXTRAS,
  },
  {
    id: 'fasting-firfir',
    name: 'Normal & Dirkosh Firfir',
    amharic: 'ኖርማል እና ድርቆሽ ፍርፍር',
    category: 'fasting',
    categoryLabel: 'Fasting',
    basePrice: 150,
    description:
      'Teff injera tossed in savory onion-berbere reduction with healthy oil and fresh jalapeño.',
    prepMinutes: 12,
    isFasting: true,
    imageKey: 'habeshan',
    variants: [
      { id: 'normal', label: 'Fresh Firfir', priceDelta: 0 },
      { id: 'dirkosh', label: 'Dirkosh Firfir', priceDelta: 40 },
    ],
    compatibleExtras: HABESHAN_EXTRAS,
  },
  {
    id: 'tomato-kurt',
    name: 'Tomato Kurt',
    amharic: 'ቲማቲም ቁርጥ',
    category: 'fasting',
    categoryLabel: 'Fasting',
    basePrice: 160,
    description:
      'Crisp diced vine tomatoes, red onion, green chili, and lemon vinaigrette served with injera.',
    prepMinutes: 10,
    isFasting: true,
    imageKey: 'habeshan',
    variants: [{ id: 'regular', label: 'Regular', priceDelta: 0 }],
    compatibleExtras: HABESHAN_EXTRAS,
  },

  // --- Breakfast ---
  {
    id: 'special-chechebsa',
    name: 'Special Chechebsa',
    amharic: 'ስፔሻል ጭብሳ',
    category: 'breakfast',
    categoryLabel: 'Breakfast',
    basePrice: 200,
    description:
      'Warm flaky flatbread shredded and sautéed in spiced clarified butter with berbere, topped with scrambled egg and pure honey.',
    prepMinutes: 14,
    isFeatured: true,
    tag: 'Morning Favorite',
    imageKey: 'breakfast',
    variants: [
      { id: 'special', label: 'Special (Egg & Honey)', priceDelta: 0 },
      { id: 'normal', label: 'Normal Chechebsa', priceDelta: -20 },
    ],
    compatibleExtras: BREAKFAST_EXTRAS,
  },
  {
    id: 'avocado-egg',
    name: 'Avocado with Egg',
    amharic: 'ጥብስ እንቁላል በአቮካዶ',
    category: 'breakfast',
    categoryLabel: 'Breakfast',
    basePrice: 180,
    description:
      'Ripe Ethiopian avocado sliced beside farm-fresh sautéed eggs, herbs, and warm house-baked bread.',
    prepMinutes: 12,
    imageKey: 'breakfast',
    variants: [{ id: 'regular', label: 'Cafe Plate', priceDelta: 0 }],
    compatibleExtras: BREAKFAST_EXTRAS,
  },
  {
    id: 'special-ful',
    name: 'Special Ful',
    amharic: 'ስፔሻል ፉል',
    category: 'breakfast',
    categoryLabel: 'Breakfast',
    basePrice: 200,
    description:
      'Slow-simmered fava beans topped with fresh tomato, red onion, chili, feta crumble, and warm crusty bread.',
    prepMinutes: 12,
    imageKey: 'breakfast',
    variants: [
      { id: 'special', label: 'Special Ful', priceDelta: 0 },
      { id: 'normal', label: 'Normal Ful', priceDelta: -20 },
    ],
    compatibleExtras: BREAKFAST_EXTRAS,
  },
  {
    id: 'special-fetira',
    name: 'Special Fetira',
    amharic: 'ስፔሻል ፈትራ',
    category: 'breakfast',
    categoryLabel: 'Breakfast',
    basePrice: 190,
    description:
      'Golden pan-griddled layered pastry stuffed with seasoned egg and drizzled with wildflower honey.',
    prepMinutes: 15,
    imageKey: 'breakfast',
    variants: [
      { id: 'special', label: 'Special Fetira', priceDelta: 0 },
      { id: 'plain', label: 'Plain Fetira', priceDelta: -40 },
    ],
    compatibleExtras: BREAKFAST_EXTRAS,
  },
  {
    id: 'dulet-special',
    name: 'Dulet Special',
    amharic: 'ዱለት ስፔሻል',
    category: 'breakfast',
    categoryLabel: 'Breakfast',
    basePrice: 300,
    description:
      'Finely minced prime beef & tripe sautéed in mitmita, cardamom, and spiced butter with fresh injera.',
    prepMinutes: 16,
    imageKey: 'breakfast',
    variants: [
      { id: 'meat', label: 'Dulet Special', priceDelta: 0 },
      { id: 'fish', label: 'Fish Dulet', priceDelta: 0 },
    ],
    compatibleExtras: HABESHAN_EXTRAS,
  },

  // --- Pizza ---
  {
    id: 'blaze-special-pizza',
    name: 'Blaze Special Pizza',
    amharic: 'ብሌዝ ስፔሻል ፒዛ',
    category: 'pizza',
    categoryLabel: 'Pizza',
    basePrice: 480,
    description:
      'Hand-stretched artisan dough baked crisp with seasoned beef, roasted mushrooms, stretchy mozzarella, sweet peppers, and herbs.',
    prepMinutes: 18,
    isFeatured: true,
    tag: 'Signature Pie',
    imageKey: 'pizza',
    variants: [
      { id: 'regular', label: 'Standard 12"', priceDelta: 0 },
      { id: 'extra-cheese', label: 'Double Mozzarella', priceDelta: 70 },
    ],
    compatibleExtras: CAFE_EXTRAS,
  },
  {
    id: 'pizza-margarita',
    name: 'Pizza Margarita',
    amharic: 'ፒዛ ማርጋሪታ',
    category: 'pizza',
    categoryLabel: 'Pizza',
    basePrice: 320,
    description:
      'Classic San Marzano-style tomato sauce, fresh melted mozzarella, olive oil, and fragrant garden basil.',
    prepMinutes: 15,
    imageKey: 'pizza',
    variants: [{ id: 'standard', label: 'Standard 12"', priceDelta: 0 }],
    compatibleExtras: CAFE_EXTRAS,
  },
  {
    id: 'beef-pizza',
    name: 'Spiced Beef Pizza',
    amharic: 'የስጋ ፒዛ',
    category: 'pizza',
    categoryLabel: 'Pizza',
    basePrice: 420,
    description:
      'Savory sautéed beef strips, caramelized onions, green chili, and melted mozzarella on house dough.',
    prepMinutes: 17,
    imageKey: 'pizza',
    variants: [
      { id: 'beef', label: 'Beef Pizza', priceDelta: 0 },
      { id: 'chicken', label: 'Chicken Pizza', priceDelta: -20 },
    ],
    compatibleExtras: CAFE_EXTRAS,
  },
  {
    id: 'tuna-cheese-pizza',
    name: 'Tuna Cheese Pizza',
    amharic: 'የቱና ቺዝ ፒዛ',
    category: 'pizza',
    categoryLabel: 'Pizza',
    basePrice: 460,
    description:
      'Flaked Mediterranean tuna, red onion, sweet corn, olives, and rich mozzarella cheese.',
    prepMinutes: 17,
    imageKey: 'pizza',
    variants: [{ id: 'standard', label: 'Standard 12"', priceDelta: 0 }],
    compatibleExtras: CAFE_EXTRAS,
  },
  {
    id: 'fasting-vegan-pizza',
    name: 'Fasting Vegan Pizza',
    amharic: 'ፆም ቪጋን ፒዛ',
    category: 'pizza',
    categoryLabel: 'Pizza',
    basePrice: 250,
    description:
      '100% dairy-free oven-baked crust loaded with mushrooms, roasted peppers, olives, zucchini, and tomato herb sauce.',
    prepMinutes: 15,
    isFasting: true,
    tag: 'Fasting Friendly',
    imageKey: 'pizza',
    variants: [{ id: 'standard', label: 'Standard 12"', priceDelta: 0 }],
    compatibleExtras: ['extra-chili', 'extra-fries'],
  },

  // --- Burgers & Sandwiches ---
  {
    id: 'blaze-special-burger',
    name: 'Blaze Special Burger',
    amharic: 'ብሌዝ ስፔሻል በርገር',
    category: 'burgers',
    categoryLabel: 'Burgers & Sandwiches',
    basePrice: 450,
    description:
      'Double flame-seared beef patty, melted cheddar, fried egg, crisp lettuce, vine tomato, and house burger sauce on a toasted brioche bun.',
    prepMinutes: 16,
    isFeatured: true,
    tag: 'Best Seller',
    imageKey: 'burger',
    variants: [
      { id: 'classic', label: 'Single Special', priceDelta: 0 },
      { id: 'combo', label: 'With Fries', priceDelta: 90 },
    ],
    compatibleExtras: CAFE_EXTRAS,
  },
  {
    id: 'blaze-mini-burgers',
    name: 'Blaze Mini Special Burgers (3 Pcs)',
    amharic: 'ብሌዝ ሚኒ ስፔሻል በርገር',
    category: 'burgers',
    categoryLabel: 'Burgers & Sandwiches',
    basePrice: 450,
    description:
      'Trio of artisan sliders featuring 1 Classic Beef, 1 Melted Cheese, and 1 Farm Egg slider with crispy fries.',
    prepMinutes: 16,
    imageKey: 'burger',
    variants: [{ id: 'trio', label: '3-Piece Trio', priceDelta: 0 }],
    compatibleExtras: CAFE_EXTRAS,
  },
  {
    id: 'cheese-burger',
    name: 'Cheese & Classic Beef Burger',
    amharic: 'የቼዝ በርገር',
    category: 'burgers',
    categoryLabel: 'Burgers & Sandwiches',
    basePrice: 300,
    description:
      'Juicy grilled beef patty on fresh bakery sesame bun with crisp greens, tomato, and house pickles.',
    prepMinutes: 14,
    imageKey: 'burger',
    variants: [
      { id: 'cheese', label: 'Cheese Burger', priceDelta: 0 },
      { id: 'basic', label: 'Basic Beef Burger', priceDelta: -50 },
    ],
    compatibleExtras: CAFE_EXTRAS,
  },
  {
    id: 'club-sandwich',
    name: 'Club Sandwich',
    amharic: 'ክለብ ሳንድዊች',
    category: 'burgers',
    categoryLabel: 'Burgers & Sandwiches',
    basePrice: 400,
    description:
      'Triple-decker toasted house bread layered with grilled chicken, fried egg, cheese, crisp lettuce, and golden fries.',
    prepMinutes: 15,
    imageKey: 'burger',
    variants: [{ id: 'full', label: 'Full + Fries', priceDelta: 0 }],
    compatibleExtras: CAFE_EXTRAS,
  },
  {
    id: 'chicken-sandwich',
    name: 'Chicken & Fish Sandwiches',
    amharic: 'የዶሮ እና ዓሳ ሳንድዊች',
    category: 'burgers',
    categoryLabel: 'Burgers & Sandwiches',
    basePrice: 260,
    description:
      'Freshly baked baguette filled with herb-grilled chicken breast or crispy seasoned fish fillet and house dressing.',
    prepMinutes: 13,
    imageKey: 'burger',
    variants: [
      { id: 'chicken', label: 'Grilled Chicken', priceDelta: 0 },
      { id: 'fish', label: 'Crisp Fish Fillet', priceDelta: 40 },
      { id: 'egg', label: 'Egg Sandwich', priceDelta: -90 },
    ],
    compatibleExtras: CAFE_EXTRAS,
  },

  // --- Fish & Chicken ---
  {
    id: 'fish-gulash',
    name: 'Fish Gulash',
    amharic: 'ዓሳ ጉላሽ',
    category: 'grill',
    categoryLabel: 'Fish & Chicken',
    basePrice: 400,
    description:
      'Fresh lake tilapia fillet simmered in aromatic Ethiopian tomato, garlic, and berbere-herb sauce served with injera or bread.',
    prepMinutes: 20,
    isFasting: true,
    tag: 'Lake Fresh',
    imageKey: 'pastaGrill',
    variants: [
      { id: 'gulash', label: 'Fish Gulash', priceDelta: 0 },
      { id: 'lebleb', label: 'Fish Lebleb', priceDelta: -80 },
      { id: 'cutlet', label: 'Fish Cutlet', priceDelta: -50 },
    ],
    compatibleExtras: HABESHAN_EXTRAS,
  },
  {
    id: 'grilled-chicken-breast',
    name: 'Herb Grilled Chicken',
    amharic: 'የተጠበሰ የዶሮ ጡት እና እግር',
    category: 'grill',
    categoryLabel: 'Fish & Chicken',
    basePrice: 380,
    description:
      'Marinated chicken breast or roasted leg char-grilled with rosemary, lemon, and roasted garlic, paired with seasonal greens.',
    prepMinutes: 20,
    imageKey: 'pastaGrill',
    variants: [
      { id: 'breast', label: 'Grilled Breast', priceDelta: 0 },
      { id: 'leg', label: 'Roasted Leg', priceDelta: 40 },
    ],
    compatibleExtras: CAFE_EXTRAS,
  },

  // --- Pasta, Wraps & Salads ---
  {
    id: 'pasta-bolognese',
    name: 'Spaghetti & Penne Bolognese',
    amharic: 'ፓስታ በቦሎኔዝ',
    category: 'pasta',
    categoryLabel: 'Pasta, Wraps & Salads',
    basePrice: 200,
    description:
      'Al dente pasta tossed in slow-simmered minced beef tomato ragù, fresh basil, and grated cheese.',
    prepMinutes: 14,
    imageKey: 'pastaGrill',
    variants: [
      { id: 'bolognese', label: 'Beef Bolognese', priceDelta: 0 },
      { id: 'tuna', label: 'Tuna Herb Sauce', priceDelta: 80 },
      { id: 'veg', label: 'Vegetable / Tomato', priceDelta: -20 },
    ],
    compatibleExtras: ['extra-mozzarella', 'extra-bread', 'extra-chili'],
  },
  {
    id: 'blaze-chef-salad',
    name: 'Blaze Chef Salad',
    amharic: 'ብሌዝ ሼፍ ሳላድ',
    category: 'pasta',
    categoryLabel: 'Pasta, Wraps & Salads',
    basePrice: 350,
    description:
      'Crisp garden greens, cherry tomatoes, cucumber, egg, olives, grilled chicken strips, and lemon-herb vinaigrette.',
    prepMinutes: 11,
    imageKey: 'pastaGrill',
    variants: [
      { id: 'chef', label: 'Chef Salad', priceDelta: 0 },
      { id: 'chicken', label: 'Chicken Salad', priceDelta: 70 },
      { id: 'mixed', label: 'Mixed Garden (Fasting)', priceDelta: -130 },
    ],
    compatibleExtras: ['extra-bread', 'extra-mozzarella'],
  },
  {
    id: 'chicken-wrap',
    name: 'Artisan Grilled Wraps',
    amharic: 'የዶሮ እና የስጋ ራፕ',
    category: 'pasta',
    categoryLabel: 'Pasta, Wraps & Salads',
    basePrice: 250,
    description:
      'Warm flatbread wrap filled with spiced grilled chicken, crisp lettuce, tomatoes, and creamy garlic herb dressing.',
    prepMinutes: 12,
    imageKey: 'pastaGrill',
    variants: [
      { id: 'chicken', label: 'Chicken Wrap', priceDelta: 0 },
      { id: 'beef', label: 'Beef Wrap', priceDelta: 10 },
      { id: 'veg', label: 'Veg Wrap (Fasting)', priceDelta: -100 },
    ],
    compatibleExtras: CAFE_EXTRAS,
  },

  // --- In-House Artisan Bakery & Cakes ---
  {
    id: 'torta-cake',
    name: 'Artisan Torta Cake',
    amharic: 'ቶርታ ኬክ',
    category: 'bakery',
    categoryLabel: 'Bakery & Cakes',
    basePrice: 800,
    description:
      'Celebration sponge cake layered with whipped vanilla cream and seasonal fruit glaze, crafted fresh in our bakery for birthdays & events.',
    prepMinutes: 25,
    isFeatured: true,
    tag: 'Celebration Cake',
    imageKey: 'bakery',
    variants: [
      { id: '1kg', label: '1 Kg Whole', priceDelta: 0 },
      { id: '2kg', label: '2 Kg Celebration', priceDelta: 700 },
    ],
    compatibleExtras: BAKERY_EXTRAS,
  },
  {
    id: 'butter-cookies',
    name: 'Fresh Butter Cookies',
    amharic: 'በተር ኩኪስ',
    category: 'bakery',
    categoryLabel: 'Bakery & Cakes',
    basePrice: 200,
    description:
      'Crisp, melt-in-your-mouth golden butter shortbread cookies piped and baked fresh every morning.',
    prepMinutes: 5,
    imageKey: 'bakery',
    variants: [
      { id: 'quarter-kg', label: '¼ Kg Box', priceDelta: 0 },
      { id: 'half-kg', label: '½ Kg Box', priceDelta: 130 },
      { id: 'one-kg', label: '1 Kg Tin', priceDelta: 400 },
    ],
    compatibleExtras: BAKERY_EXTRAS,
  },
  {
    id: 'mini-cakes-pack',
    name: 'Mini Cakes Assortment',
    amharic: 'ሚኒ ኬክስ ፓክ',
    category: 'bakery',
    categoryLabel: 'Bakery & Cakes',
    basePrice: 150,
    description:
      'Assorted bite-sized frosted pastries ideal for office meetings, coffee breaks, and Addis hospitality.',
    prepMinutes: 8,
    imageKey: 'bakery',
    variants: [
      { id: '6pcs', label: '6 Pieces', priceDelta: 0 },
      { id: '9pcs', label: '9 Pieces', priceDelta: 75 },
      { id: '12pcs', label: '12 Pieces', priceDelta: 150 },
    ],
    compatibleExtras: BAKERY_EXTRAS,
  },
  {
    id: 'croissant-chocolate',
    name: 'Butter & Chocolate Croissant',
    amharic: 'ክሩዋሶን',
    category: 'bakery',
    categoryLabel: 'Bakery & Cakes',
    basePrice: 40,
    description:
      'Flaky laminated French-style croissant baked golden each morning—available classic butter or filled with dark chocolate.',
    prepMinutes: 5,
    tag: 'Baked 6 AM',
    imageKey: 'bakery',
    variants: [
      { id: 'butter', label: 'Classic Butter', priceDelta: 0 },
      { id: 'chocolate', label: 'Dark Chocolate', priceDelta: 35 },
    ],
    compatibleExtras: BAKERY_EXTRAS,
  },
  {
    id: 'baklava-milifoni',
    name: 'Baklava & Milifoni Pastry',
    amharic: 'ባክላቫ እና ሚሊፎኒ',
    category: 'bakery',
    categoryLabel: 'Bakery & Cakes',
    basePrice: 70,
    description:
      'Crisp honey-nut layered baklava or delicate caramelized puff-pastry milifoni with rich custard cream.',
    prepMinutes: 5,
    imageKey: 'bakery',
    variants: [
      { id: 'baklava', label: 'Honey Baklava', priceDelta: 0 },
      { id: 'milifoni', label: 'Cream Milifoni', priceDelta: 10 },
      { id: 'english-zebib', label: 'Raisin English Cake', priceDelta: 15 },
    ],
    compatibleExtras: BAKERY_EXTRAS,
  },
  {
    id: 'donut-muffin',
    name: 'Fresh Donuts & Banana Muffin',
    amharic: 'ዶናት እና ማፈን',
    category: 'bakery',
    categoryLabel: 'Bakery & Cakes',
    basePrice: 40,
    description:
      'Soft glazed donuts, mini donut packs, and warm house-baked banana or English muffins.',
    prepMinutes: 5,
    imageKey: 'bakery',
    variants: [
      { id: 'donut', label: 'Single Glazed Donut', priceDelta: 0 },
      { id: 'mini-donuts', label: 'Mini Donuts (4 Pcs)', priceDelta: 110 },
      { id: 'muffin', label: 'Banana Muffin', priceDelta: -5 },
    ],
    compatibleExtras: BAKERY_EXTRAS,
  },
];

export const RECOMMENDED_PAIRING_IDS = [
  'croissant-chocolate',
  'baklava-milifoni',
  'butter-cookies',
  'fasting-shiro',
];

export const RESTAURANT_INFO = {
  brand: 'Blaze Addis',
  amharicBrand: 'ብሌዝ አዲስ',
  address: '24 Kebele, Megenagna — Near the New Adey Ababa Stadium',
  city: 'Addis Ababa, Ethiopia',
  phones: [
    { display: '+251 704 404 115', href: 'tel:+251704404115' },
    { display: '+251 933 232 425', href: 'tel:+251933232425' },
  ],
  hours: 'Daily · 7:00 AM – 10:30 PM',
  tiktok: {
    handle: '@blaze_addis',
    url: 'https://www.tiktok.com/@blaze_addis',
  },
  reviews: [
    {
      id: 'r1',
      guest: 'Dawit Bekele',
      role: 'Regular Guest · Megenagna',
      quote:
        'Their 100% teff injera is genuinely baked fresh every day, and the Blaze Special Combo easily beats everywhere else around 24 Kebele.',
      dishOrdered: 'Blaze Special Combo',
    },
    {
      id: 'r2',
      guest: 'Selamawit Tadesse',
      role: 'Birthday Event Host · Bole',
      quote:
        'Hosted 45 friends in their lounge for a celebration—the staff coordinated custom Torta cake, pizzas, and traditional coffee smoothly.',
      dishOrdered: 'Artisan Torta Cake 2Kg',
    },
    {
      id: 'r3',
      guest: 'Yonas Alemayehu',
      role: 'Morning Coffee Regular',
      quote:
        'Early morning Special Chechebsa with honey and warm chocolate croissants before heading past Adey Ababa Stadium is unmatched.',
      dishOrdered: 'Special Chechebsa',
    },
  ],
};

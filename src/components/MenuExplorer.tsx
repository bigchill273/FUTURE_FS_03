import { Clock, Leaf, Plus, Search, SlidersHorizontal, X } from 'lucide-react';
import { motion } from 'motion/react';
import {
  MENU_CATEGORIES,
  type MenuCategoryId,
  type MenuItem,
} from '../data/blazeMenu';
import { formatBirr, type SortOption } from '../utils/orderMath';
import { DishImage } from './DishImage';

interface MenuExplorerProps {
  items: MenuItem[];
  activeCategory: MenuCategoryId;
  searchQuery: string;
  fastingOnly: boolean;
  sortBy: SortOption;
  selectedDishId: string;
  onCategoryChange: (category: MenuCategoryId) => void;
  onSearchChange: (query: string) => void;
  onToggleFasting: () => void;
  onSortChange: (sort: SortOption) => void;
  onResetFilters: () => void;
  onCustomizeDish: (dish: MenuItem) => void;
  onQuickAddDish: (dish: MenuItem) => void;
}

export function MenuExplorer({
  items,
  activeCategory,
  searchQuery,
  fastingOnly,
  sortBy,
  selectedDishId,
  onCategoryChange,
  onSearchChange,
  onToggleFasting,
  onSortChange,
  onResetFilters,
  onCustomizeDish,
  onQuickAddDish,
}: MenuExplorerProps) {
  return (
    <section id="menu" className="pb-12">
      {/* Header + Search & Sort Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-5">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-semibold text-[#112A22]">
            Explore Our Menu
          </h2>
          <p className="text-sm text-[#54635D] mt-1">
            Browse all Habeshan classics, fast food favorites, and fresh bakery items.
          </p>
        </div>

        <p className="text-xs font-medium text-[#54635D] tabular-nums">
          Showing {items.length} {items.length === 1 ? 'dish' : 'dishes'}
        </p>
      </div>

      {/* Search + Dietary + Sort Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
        <div className="relative flex-1">
          <label htmlFor="menu-search" className="sr-only">
            Search Blaze Addis dishes in English or Amharic
          </label>
          <Search
            className="h-4 w-4 text-[#6C7A74] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
            aria-hidden="true"
          />
          <input
            id="menu-search"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search dishes in English or Amharic (e.g. Shiro, Pizza, Tibs, ኬክ)..."
            className="w-full h-11 pl-10 pr-9 rounded-xl bg-white border border-[#112A22]/15 text-sm text-[#17221E] placeholder:text-[#7A8882] focus:outline-none focus:border-[#112A22] focus:ring-2 focus:ring-[#112A22]/10 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="Clear search query"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 rounded-md text-[#6C7A74] hover:text-[#112A22] cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onToggleFasting}
            aria-pressed={fastingOnly}
            className={`h-11 px-3.5 rounded-xl border text-xs font-semibold inline-flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6331F] ${
              fastingOnly
                ? 'bg-[#112A22] text-white border-[#112A22]'
                : 'bg-white text-[#17221E] border-[#112A22]/15 hover:border-[#112A22]/40'
            }`}
          >
            <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Fasting / Vegan</span>
          </button>

          <div className="relative">
            <label htmlFor="menu-sort" className="sr-only">
              Sort dishes
            </label>
            <SlidersHorizontal
              className="h-3.5 w-3.5 text-[#54635D] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <select
              id="menu-sort"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="h-11 pl-8 pr-7 rounded-xl bg-white border border-[#112A22]/15 text-xs font-medium text-[#17221E] focus:outline-none focus:border-[#112A22] cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="prep-asc">Prep Time: Fastest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div
        role="tablist"
        aria-label="Menu categories"
        className="flex flex-wrap items-center gap-1.5 mb-6"
      >
        {MENU_CATEGORIES.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onCategoryChange(category.id)}
              className={`relative px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6331F] ${
                isActive
                  ? 'text-white'
                  : 'bg-white text-[#44524C] border border-[#112A22]/12 hover:border-[#112A22]/30 hover:text-[#112A22]'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="menu-category-tab"
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 rounded-lg bg-[#112A22]"
                />
              )}
              <span className="relative z-10">{category.label}</span>
            </button>
          );
        })}
      </div>

      {/* Menu Grid or Empty State */}
      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#112A22]/10 p-10 text-center">
          <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#112A22]">
            No matching dishes found
          </p>
          <p className="text-sm text-[#54635D] mt-1.5 max-w-md mx-auto">
            Try clearing your search filter or switching back to all categories to view our full
            Addis Ababa menu.
          </p>
          <button
            type="button"
            onClick={onResetFilters}
            className="mt-5 px-4 py-2 rounded-lg bg-[#112A22] hover:bg-[#193C31] text-white text-sm font-medium transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {items.map((dish) => {
            const isSelected = dish.id === selectedDishId;
            return (
              <motion.article
                key={dish.id}
                layout="position"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                className={`group bg-white rounded-2xl border overflow-hidden flex flex-col transition-shadow ${
                  isSelected
                    ? 'border-[#112A22] shadow-md'
                    : 'border-[#112A22]/10 hover:shadow-md'
                }`}
              >
                {/* Dish Image Container */}
                <div className="relative aspect-[4/3] bg-[#F3EFE7] overflow-hidden">
                  <DishImage
                    imageKey={dish.imageKey}
                    alt={`${dish.name} — ${dish.amharic}`}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300 ease-out"
                  />
                  {dish.tag && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#112A22]/90 text-white text-[11px] font-medium">
                      {dish.tag}
                    </span>
                  )}
                </div>

                {/* Dish Copy & Actions */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-[15px] font-semibold text-[#112A22] leading-snug">
                        {dish.name}
                      </h3>
                      <span className="text-sm font-bold text-[#D6331F] whitespace-nowrap shrink-0 tabular-nums">
                        {formatBirr(dish.basePrice)}
                      </span>
                    </div>

                    <p className="text-xs text-[#6C7A74] mt-0.5">{dish.amharic}</p>

                    <p className="text-xs text-[#4E5C56] mt-2 line-clamp-2 leading-relaxed">
                      {dish.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#112A22]/8 flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-xs text-[#6C7A74] whitespace-nowrap">
                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>{dish.prepMinutes} min</span>
                      <span aria-hidden="true">·</span>
                      <span>{dish.categoryLabel}</span>
                    </span>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => onCustomizeDish(dish)}
                        aria-label={`Customize ${dish.name}`}
                        className="min-h-[40px] px-3 py-1.5 rounded-lg border border-[#112A22]/15 hover:border-[#112A22] text-xs font-medium text-[#112A22] whitespace-nowrap transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6331F]"
                      >
                        Customize
                      </button>
                      <button
                        type="button"
                        onClick={() => onQuickAddDish(dish)}
                        aria-label={`Add ${dish.name} to order`}
                        className="min-h-[40px] inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-[#112A22] hover:bg-[#193C31] text-white text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D6331F]"
                      >
                        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </section>
  );
}

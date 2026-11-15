import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data/blazeMenu';
import { DishImage } from './DishImage';

const HOSPITALITY_HIGHLIGHTS = [
  {
    title: '100% Teff Injera',
    detail: 'Fermented and baked fresh on-site every morning',
  },
  {
    title: 'Artisan Daily Bakery',
    detail: 'Croissants, Torta celebration cakes & butter cookies',
  },
  {
    title: '60+ Guest Lounge',
    detail: 'Spacious event dining, birthdays & custom catering',
  },
  {
    title: '24 Kebele, Megenagna',
    detail: 'Minutes from the New Adey Ababa Stadium',
  },
];

interface HeroSectionProps {
  onExploreMenu: () => void;
}

export function HeroSection({ onExploreMenu }: HeroSectionProps) {
  return (
    <section id="home" className="pt-6 pb-8 lg:pt-8 lg:pb-10">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Editorial Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch bg-white rounded-2xl border border-[#112A22]/10 overflow-hidden shadow-sm">
          {/* Left Copy Column */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 p-6 sm:p-9 lg:p-11 flex flex-col justify-between bg-[#112A22] text-white"
          >
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs text-white/75 tracking-wide mb-5">
                <MapPin className="h-3.5 w-3.5 text-[#F59E0B] shrink-0" aria-hidden="true" />
                <span>Megenagna, Addis Ababa</span>
                <span aria-hidden="true">·</span>
                <span>{RESTAURANT_INFO.hours}</span>
              </div>

              <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl lg:text-[2.65rem] font-semibold leading-[1.12] tracking-tight text-balance">
                Ethiopian heritage, wood-fired kitchen &amp; daily bakery.
              </h1>

              <p className="mt-4 text-[15px] sm:text-base leading-relaxed text-white/80 max-w-md">
                From daily 100% teff injera and sizzling Lamb Tibs to blistered artisan pizzas and
                flaky morning croissants—crafted fresh in 24 Kebele for dine-in, quick pickup, and
                60+ guest celebrations.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onExploreMenu}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#D6331F] hover:bg-[#BE2B19] text-white text-sm font-semibold whitespace-nowrap shrink-0 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <span>Order &amp; Customize</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <a
                href={RESTAURANT_INFO.phones[0].href}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-white/25 hover:bg-white/10 text-white text-sm font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Phone className="h-4 w-4 text-[#FBBF24]" aria-hidden="true" />
                <span className="tabular-nums">{RESTAURANT_INFO.phones[0].display}</span>
              </a>
            </div>
          </motion.div>

          {/* Right Media Column */}
          <div className="lg:col-span-7 relative min-h-[260px] sm:min-h-[340px] lg:min-h-[420px]">
            <DishImage
              imageKey="hero"
              alt="Blaze Addis table spread with Ethiopian Lamb Tibs on teff injera, wood-fired mushroom pizza, and golden croissants"
              className="w-full h-full lg:absolute lg:inset-0 object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent pointer-events-none"
            />
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 flex flex-wrap items-end justify-between gap-3 text-white">
              <div>
                <p className="text-xs text-white/80">Signature Table · ብሌዝ አዲስ</p>
                <p className="font-[family-name:var(--font-display)] text-lg sm:text-xl font-medium">
                  Blaze Special Combo &amp; Wood-Fired Pizza
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Hospitality Highlights Strip (Full width below hero split) */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {HOSPITALITY_HIGHLIGHTS.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl border border-[#112A22]/10 px-4 py-3.5 flex flex-col justify-center"
            >
              <p className="text-sm font-semibold text-[#112A22]">{item.title}</p>
              <p className="text-xs text-[#54635D] mt-0.5 leading-snug">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

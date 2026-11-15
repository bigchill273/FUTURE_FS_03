import { Check, MapPin, Music, Phone, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { RESTAURANT_INFO } from '../data/blazeMenu';
import { DishImage } from './DishImage';

const QUALITY_PILLARS = [
  'Healthy oils used in all kitchen dishes',
  '100% teff injera fermented & baked daily on-site',
  'Artisan bakery cakes, croissants & cookies baked fresh',
  'Spacious lounge hosting 60+ guests for birthdays & weddings',
];

export function AboutAndCatering() {
  return (
    <section id="about" className="py-12 border-t border-[#112A22]/10">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Why Choose Blaze Addis */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-white rounded-2xl border border-[#112A22]/10 overflow-hidden shadow-sm"
        >
          <div className="lg:col-span-5 relative min-h-[260px]">
            <DishImage
              imageKey="bakery"
              alt="Freshly baked croissants, layered torta cakes, and butter cookies at Blaze Addis bakery"
              className="w-full h-full lg:absolute lg:inset-0 object-cover"
            />
          </div>

          <div className="lg:col-span-7 p-6 sm:p-9 lg:p-10 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold text-[#D6331F] tracking-wide">
                Our Story &amp; Space
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-semibold text-[#112A22] mt-1 text-balance">
                Exceptional Food, Warm Lounge &amp; Events in Megenagna
              </h2>
              <p className="mt-3 text-sm sm:text-[15px] text-[#44524C] leading-relaxed">
                Located at 24 Kebele, Megenagna—just minutes from the New Adey Ababa Stadium—Blaze
                Addis brings together traditional Ethiopian cooking, quick modern cafe classics,
                and an in-house patisserie under one roof.
              </p>

              <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {QUALITY_PILLARS.map((pillar) => (
                  <li key={pillar} className="flex items-start gap-2.5 text-sm text-[#17221E]">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-[#112A22] text-white flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3" aria-hidden="true" />
                    </span>
                    <span className="leading-snug">{pillar}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-7 pt-6 border-t border-[#112A22]/10 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2.5 text-xs text-[#44524C]">
                <Users className="h-4 w-4 text-[#D6331F] shrink-0" aria-hidden="true" />
                <span>60+ Guest Event Capacity</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#44524C]">
                <Music className="h-4 w-4 text-[#D6331F] shrink-0" aria-hidden="true" />
                <span>Vibrant Lounge &amp; Curated Music</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-[#44524C]">
                <MapPin className="h-4 w-4 text-[#D6331F] shrink-0" aria-hidden="true" />
                <span>Central 24 Kebele Access</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Guest Reviews */}
        <div>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-semibold text-[#D6331F]">Guest Voices</p>
              <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-semibold text-[#112A22]">
                What Addis Guests Say
              </h2>
            </div>
            <p className="text-xs text-[#54635D]">
              Dining, morning coffee &amp; private celebrations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {RESTAURANT_INFO.reviews.map((review) => (
              <blockquote
                key={review.id}
                className="bg-white rounded-2xl border border-[#112A22]/10 p-6 flex flex-col justify-between"
              >
                <p className="text-sm text-[#33423C] leading-relaxed">“{review.quote}”</p>
                <footer className="mt-5 pt-4 border-t border-[#112A22]/10">
                  <p className="text-sm font-semibold text-[#112A22]">{review.guest}</p>
                  <p className="text-xs text-[#6C7A74] mt-0.5">
                    {review.role} · Ordered {review.dishOrdered}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        {/* Direct Call & Catering Banner */}
        <div
          id="contact"
          className="rounded-2xl bg-[#112A22] text-white p-6 sm:p-9 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div>
            <p className="text-xs font-semibold text-[#FBBF24]">
              Takeaway, Table Booking &amp; Catering
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-2xl sm:text-3xl font-semibold mt-1">
              Call Blaze Addis Directly
            </h2>
            <p className="text-sm text-white/80 mt-1.5 max-w-xl">
              Planning a birthday, wedding gathering, or quick pickup near Adey Ababa Stadium? Call
              our kitchen team directly for immediate service.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            {RESTAURANT_INFO.phones.map((phone, idx) => (
              <a
                key={phone.href}
                href={phone.href}
                className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-colors ${
                  idx === 0
                    ? 'bg-[#D6331F] hover:bg-[#BE2B19] text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span className="tabular-nums">{phone.display}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { RESTAURANT_INFO } from '../data/blazeMenu';

export function Footer() {
  return (
    <footer className="border-t border-[#112A22]/10 bg-white">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[#112A22] mb-2.5">
              Location
            </h3>
            <p className="text-[#44524C] leading-relaxed">
              {RESTAURANT_INFO.address}
              <br />
              {RESTAURANT_INFO.city}
            </p>
            <p className="text-xs text-[#6C7A74] mt-2">{RESTAURANT_INFO.hours}</p>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[#112A22] mb-2.5">
              Quick Links
            </h3>
            <ul className="space-y-1.5 text-[#44524C]">
              <li>
                <a href="#home" className="hover:text-[#D6331F] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#spotlight" className="hover:text-[#D6331F] transition-colors">
                  Dish Customizer
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#D6331F] transition-colors">
                  Full Menu
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#D6331F] transition-colors">
                  About &amp; Catering
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[#112A22] mb-2.5">
              Contact Info
            </h3>
            <ul className="space-y-1.5 text-[#44524C]">
              {RESTAURANT_INFO.phones.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    className="hover:text-[#D6331F] transition-colors tabular-nums"
                  >
                    {phone.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-[family-name:var(--font-display)] text-base font-semibold text-[#112A22] mb-2.5">
              Follow Blaze Addis
            </h3>
            <a
              href={RESTAURANT_INFO.tiktok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#44524C] hover:text-[#D6331F] transition-colors"
            >
              <span>TikTok {RESTAURANT_INFO.tiktok.handle}</span>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#112A22]/10 flex flex-wrap items-center justify-between gap-4 text-xs text-[#6C7A74]">
          <p>© {new Date().getFullYear()} Blaze Addis — Restaurant, Cafe &amp; Bakery</p>
          <p>ብሌዝ አዲስ · Addis Ababa</p>
        </div>
      </div>
    </footer>
  );
}

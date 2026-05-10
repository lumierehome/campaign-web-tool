import './globals.css';
import Link from 'next/link';

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: '▦' },
  { label: 'Campaigns', href: '/campaigns', icon: '↗' },
  { label: 'Voters', href: '/voters', icon: '♟' },
  { label: 'Events', href: '/events', icon: '□' },
  { label: 'Donations', href: '/dashboard', icon: '$' },
  { label: 'Volunteers', href: '/team', icon: '♡' },
  { label: 'Pledges', href: '/pledges', icon: '☑' },
  { label: 'Reports', href: '/reports', icon: '◫' },
  { label: 'Settings', href: '/settings', icon: '⚙' }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="hq-shell">
          <aside className="hq-sidebar">
            <div className="flex items-center gap-3 border-b border-white/10 p-5">
              <div className="hq-brand-mark">✓</div>
              <div>
                <h1 className="text-2xl font-bold leading-none">CampaignHQ</h1>
                <p className="mt-1 text-[11px] tracking-[0.28em] text-slate-300">COMMAND CENTER</p>
              </div>
            </div>

            <nav className="flex-1 space-y-2 p-4">
              {navItems.map((item, index) => (
                <Link key={item.label} href={item.href} className={`hq-nav ${index === 0 ? 'active' : ''}`}>
                  <span className="w-5 text-lg text-slate-300">{item.icon}</span>
                  <span>{item.label}</span>
                  {index === 0 && <span className="hq-nav-dot" />}
                </Link>
              ))}
            </nav>

            <div className="border-t border-white/10 p-5 text-sm font-medium text-slate-300">↪ Log out</div>
          </aside>

          <main className="p-5 md:p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}

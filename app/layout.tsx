import './globals.css';
import Link from 'next/link';
const nav = ['dashboard','campaigns','voters','events','donations','volunteers','pledges','reports','settings'];
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang='en'><body><div className='hq-shell'><aside className='hq-sidebar'><div className='p-5 border-b border-white/10'><h1 className='text-3xl font-bold'>CampaignHQ</h1><p className='text-xs tracking-widest text-slate-300'>COMMAND CENTER</p></div><nav className='p-3 space-y-2 flex-1'>{nav.map((n,i)=><Link key={n} href={`/${n==='donations'||n==='volunteers'?'dashboard':n}`} className={`hq-nav capitalize ${i===0?'active':''}`}>{n}</Link>)}</nav><div className='p-3 border-t border-white/10 text-slate-300'>Log out</div></aside><main className='p-6 md:p-8'>{children}</main></div></body></html>
}

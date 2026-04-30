import './globals.css';
import Link from 'next/link';
const nav = ['dashboard','campaigns','outreach','team','tasks','analytics','voters','pledges','events','reports','settings'];
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang='en'><body><div className='shell'><aside className='sidebar'><h1 className='text-2xl font-bold mb-1'>Campaign360</h1><p className='text-slate-300 text-sm mb-5'>Campaign operations hub</p><nav className='space-y-1'>{nav.map(n=><Link key={n} className='nav-link capitalize' href={`/${n}`}>{n}</Link>)}</nav></aside><main className='p-4 md:p-6'>{children}</main></div></body></html>
}

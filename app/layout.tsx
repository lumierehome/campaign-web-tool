import './globals.css';
import Link from 'next/link';
const nav = ['dashboard','campaigns','outreach','team','tasks','analytics','voters','pledges','events','reports','settings'];
export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang='en'><body><div className='min-h-screen md:grid md:grid-cols-[260px_1fr]'><aside className='bg-white border-r p-4'><h1 className='font-bold text-xl mb-4'>Campaign360</h1><nav className='space-y-2'>{nav.map(n=><Link key={n} className='block rounded px-3 py-2 hover:bg-slate-100 capitalize' href={`/${n}`}>{n}</Link>)}</nav></aside><main className='p-4'>{children}</main></div></body></html>
}

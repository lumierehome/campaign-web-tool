'use client';
import Link from 'next/link';
import { seed } from '@/lib/mock-data';
export default function Voters(){
 return <div className='space-y-3'><div className='flex justify-between'><h2 className='text-2xl font-semibold'>Voters</h2><Link className='px-3 py-2 rounded bg-slate-900 text-white' href='/voters/new'>+ Add voter</Link></div><div className='rounded bg-white border overflow-auto'><table className='w-full text-sm'><thead><tr><th className='p-2 text-left'>Name</th><th>Ward</th><th>Phone</th><th>Status</th></tr></thead><tbody>{seed.voters.map(v=><tr key={v.id} className='border-t'><td className='p-2'><Link className='underline' href={`/voters/${v.id}`}>{v.full_name}</Link></td><td>{v.ward}</td><td>{v.phone}</td><td>{v.support_status}</td></tr>)}</tbody></table></div></div>;
}

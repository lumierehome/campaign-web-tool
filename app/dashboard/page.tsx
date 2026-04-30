import { Card } from '@/components/Card';
const metrics=[['Total voters',10],['Confirmed supporters',4],['Undecided voters',3],['Needs follow-up',2],['Total pledges',5],['Upcoming events',3]];
export default function Dashboard(){return <div className='space-y-4'><h2 className='text-2xl font-semibold'>Dashboard</h2><div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>{metrics.map(([t,v])=><Card key={t as string} title={t as string} value={v as number}/> )}</div><p className='text-sm text-slate-600'>Charts scaffold ready for Recharts integration.</p></div>}

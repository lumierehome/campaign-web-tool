import { Card } from '@/components/Card';
import { seed } from '@/lib/mock-data';
export default function Dashboard(){
  const metrics=[['Total voters',seed.voters.length],['Confirmed supporters',seed.voters.filter(v=>v.support_status==='strong_supporter').length],['Undecided voters',seed.voters.filter(v=>v.support_status==='undecided').length],['Needs follow-up',seed.voters.filter(v=>v.support_status==='needs_follow_up').length],['Total pledges',seed.pledges.length],['Upcoming events',seed.events.length]];
  return <div className='space-y-4'><h2 className='text-2xl font-semibold'>Dashboard</h2><div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-3'>{metrics.map(([t,v])=><Card key={String(t)} title={String(t)} value={Number(v)}/> )}</div></div>
}

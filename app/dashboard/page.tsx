import { Card } from '@/components/Card';
export default function Dashboard(){
  const metrics=[['Voters contacted',1280],['Volunteer hours',462],['Funds raised','$84,200'],['Polling average','51.3%']];
  return <div className='space-y-4'><h2 className='text-2xl font-semibold'>Dashboard</h2><div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-4'>{metrics.map(([t,v])=><Card key={String(t)} title={String(t)} value={String(v)}/> )}</div><div className='grid md:grid-cols-2 gap-3'><div className='rounded bg-white border p-4'><h3 className='font-semibold mb-2'>District Canvassing Tracker</h3><ul className='text-sm space-y-1'><li>Ward 1: 82%</li><li>Ward 2: 67%</li><li>Ward 3: 54%</li></ul></div><div className='rounded bg-white border p-4'><h3 className='font-semibold mb-2'>Fundraising Breakdown</h3><ul className='text-sm space-y-1'><li>Small donors: 46%</li><li>Events: 28%</li><li>Major donors: 26%</li></ul></div></div></div>
}

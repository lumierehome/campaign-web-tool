const members=[['A. Khan','Canvasser'],['M. James','Phonebanker'],['S. Ali','Digital'],['R. Dore','Volunteer Lead']];
export default function Team(){return <div><h2 className='text-2xl font-semibold mb-3'>Team</h2><ul className='rounded bg-white border p-4 space-y-2'>{members.map(([n,r])=><li key={n}>{n} — {r}</li>)}</ul></div>}

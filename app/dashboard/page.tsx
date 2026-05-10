const stats = [
  { label: 'Total Voters', value: '4', detail: '3 contacted', change: '+12%', icon: '♙', iconClass: 'bg-[#102451]', glow: 'bg-slate-100' },
  { label: 'Raised', value: '$15,450', detail: '4 donations', change: '+8%', icon: '$', iconClass: 'bg-emerald-500', glow: 'bg-emerald-50' },
  { label: 'Events', value: '3', detail: '3 upcoming', change: '+5', icon: '□', iconClass: 'bg-red-500', glow: 'bg-red-50' },
  { label: 'Volunteers', value: '6', detail: '5 active', change: '+15%', icon: '♡', iconClass: 'bg-purple-500', glow: 'bg-purple-50' }
];

const supportLevels = [
  { label: 'Strong Support', count: 2, percent: 50, color: 'bg-emerald-500' },
  { label: 'Lean Support', count: 0, percent: 0, color: 'bg-blue-500' },
  { label: 'Undecided', count: 1, percent: 25, color: 'bg-amber-500' },
  { label: 'Lean Oppose', count: 1, percent: 25, color: 'bg-rose-300' },
  { label: 'Strong Oppose', count: 0, percent: 0, color: 'bg-red-600' },
  { label: 'Unknown', count: 0, percent: 0, color: 'bg-slate-300' }
];

const partyAffiliation = [
  { label: 'MDP', count: 3, percent: 75, color: 'bg-blue-500' },
  { label: 'PNC', count: 1, percent: 25, color: 'bg-red-500' }
];

const engagement = [
  { label: 'Contacted', count: 3, percent: 75, color: 'bg-blue-500' },
  { label: 'Not Contacted', count: 1, percent: 25, color: 'bg-slate-400' },
  { label: 'Pledged', count: 0, percent: 0, color: 'bg-emerald-500' },
  { label: 'Not Pledged', count: 4, percent: 100, color: 'bg-slate-300' },
  { label: 'With Party', count: 4, percent: 100, color: 'bg-emerald-500' },
  { label: 'No Party Listed', count: 0, percent: 0, color: 'bg-slate-300' }
];

function ProgressRow({ item }: { item: { label: string; count: number; percent: number; color: string } }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[15px] text-slate-600">
        <span>{item.label}</span>
        <span className="font-semibold text-slate-950">
          {item.count} <span className="font-normal text-slate-500">({item.percent}%)</span>
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-200">
        <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.percent}%` }} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="hq-title">Campaign Dashboard</h2>
        <p className="mt-2 text-lg text-slate-600">Your campaign at a glance</p>
      </header>

      <section className="grid gap-5 lg:grid-cols-4">
        {stats.map((stat) => (
          <article key={stat.label} className="metric-card">
            <div className={`absolute -right-6 -top-8 h-28 w-28 rounded-full ${stat.glow}`} />
            <div className={`metric-icon ${stat.iconClass}`}>{stat.icon}</div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{stat.label}</p>
            <p className="mt-4 text-4xl font-bold text-slate-950">{stat.value}</p>
            <p className="mt-3 text-base text-slate-600">{stat.detail}</p>
            <div className="mt-5 border-t border-slate-200 pt-4 text-sm font-bold text-emerald-600">
              ↗ {stat.change} <span className="font-medium text-slate-500">vs last month</span>
            </div>
          </article>
        ))}
      </section>

      <section className="space-y-5">
        <h3 className="text-xl font-bold text-slate-950">Voter Breakdown</h3>
        <div className="grid gap-6 xl:grid-cols-3">
          <article className="hq-card min-h-[405px]">
            <h4 className="mb-4 flex items-center gap-2 font-bold text-slate-950">♙ Support Levels</h4>
            <div className="space-y-4">{supportLevels.map((item) => <ProgressRow key={item.label} item={item} />)}</div>
          </article>

          <article className="hq-card min-h-[405px]">
            <h4 className="mb-4 flex items-center gap-2 font-bold text-slate-950">◇ Party Affiliation</h4>
            <div className="space-y-4">{partyAffiliation.map((item) => <ProgressRow key={item.label} item={item} />)}</div>
          </article>

          <article className="hq-card min-h-[405px]">
            <h4 className="mb-4 flex items-center gap-2 font-bold text-slate-950">◴ Engagement</h4>
            <div className="space-y-5">{engagement.map((item, index) => <div key={item.label} className={index === 2 || index === 4 ? 'border-t border-slate-200 pt-4' : ''}><ProgressRow item={item} /></div>)}</div>
          </article>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="hq-card">
          <h3 className="mb-6 text-lg font-bold">Voter Support Breakdown</h3>
          <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center">
            <div className="h-44 w-44 rounded-full bg-[conic-gradient(#16a34a_0_50%,#fca5a5_50%_75%,#f59e0b_75%_100%)] p-8">
              <div className="h-full w-full rounded-full bg-white" />
            </div>
            <div className="w-full max-w-sm space-y-4 text-slate-600">
              <p className="flex justify-between"><span><span className="mr-2 inline-block h-3 w-3 rounded-full bg-emerald-600" />Strong Support</span><strong className="text-slate-950">2</strong></p>
              <p className="flex justify-between"><span><span className="mr-2 inline-block h-3 w-3 rounded-full bg-rose-300" />Lean Oppose</span><strong className="text-slate-950">1</strong></p>
              <p className="flex justify-between"><span><span className="mr-2 inline-block h-3 w-3 rounded-full bg-amber-500" />Undecided</span><strong className="text-slate-950">1</strong></p>
            </div>
          </div>
        </article>

        <article className="hq-card">
          <h3 className="mb-6 text-lg font-bold">Fundraising Overview</h3>
          <div className="flex h-56 items-end justify-center rounded-xl border border-dashed border-slate-300 bg-gradient-to-b from-white to-slate-50 p-6">
            <div className="h-44 w-3/4 rounded-t-lg bg-[#172d64] shadow-lg" />
          </div>
          <p className="mt-3 text-center text-sm text-slate-500">Apr 2026</p>
        </article>
      </section>
    </div>
  );
}

'use client';

import { useMemo, useState } from 'react';

type Voter = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  age: number;
  ward: string;
  party: string;
  pledge: string;
  via: string;
  date: string;
  gotv: string;
};

const data: Voter[] = [
  { id: '1', name: 'Avery Brooks', address: '123 Main St', phone: '555-1010', email: 'avery@email.com', age: 44, ward: 'Ward 1', party: 'MDP', pledge: 'Pledged', via: 'door', date: '2026-04-10', gotv: 'Yes' },
  { id: '2', name: 'Jordan Lee', address: '89 Cedar Ave', phone: '555-2020', email: 'jordan@email.com', age: 32, ward: 'Ward 2', party: 'Independent', pledge: 'Independent Target', via: 'phone', date: '2026-04-12', gotv: 'No' },
  { id: '3', name: 'Sam Patel', address: '14 Lake Dr', phone: '555-3030', email: 'sam@email.com', age: 51, ward: 'Ward 1', party: 'PNC', pledge: 'Opposed', via: 'event', date: '2026-04-13', gotv: 'No' },
  { id: '4', name: 'Riley Chen', address: '700 Oak St', phone: '555-4040', email: 'riley@email.com', age: 27, ward: 'Ward 3', party: 'MDP', pledge: 'Undecided', via: 'SMS', date: '2026-04-15', gotv: 'Yes' }
];

const pledgeTabs = ['Pledged', 'Undecided', 'Independent Target', 'Opposed'];
const pledgeClasses: Record<string, string> = {
  Pledged: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  Undecided: 'bg-amber-50 text-amber-700 ring-amber-200',
  'Independent Target': 'bg-blue-50 text-blue-700 ring-blue-200',
  Opposed: 'bg-rose-50 text-rose-700 ring-rose-200'
};

export default function Voters() {
  const [query, setQuery] = useState('');
  const [party, setParty] = useState('all');
  const [ward, setWard] = useState('all');
  const [pledge, setPledge] = useState('all');
  const [selected, setSelected] = useState<Voter | null>(null);

  const rows = useMemo(
    () => data.filter((voter) => {
      const haystack = `${voter.name} ${voter.phone} ${voter.email} ${voter.address}`.toLowerCase();
      return haystack.includes(query.toLowerCase())
        && (party === 'all' || voter.party === party)
        && (ward === 'all' || voter.ward === ward)
        && (pledge === 'all' || voter.pledge === pledge);
    }),
    [party, pledge, query, ward]
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="hq-title">Voter Database</h2>
          <p className="mt-2 text-slate-600">Search, filter, and manage voter outreach records.</p>
        </div>
        <button className="rounded-xl bg-[var(--campaign-red)] px-5 py-3 font-semibold text-white shadow-lg shadow-red-900/20">+ Add voter</button>
      </header>

      <section className="hq-card">
        <div className="grid gap-3 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <input className="soft-input" placeholder="Search by name, address, phone, or email" value={query} onChange={(event) => setQuery(event.target.value)} />
          <select className="soft-input" onChange={(event) => setParty(event.target.value)}>
            <option value="all">All parties</option>
            <option>MDP</option>
            <option>PNC</option>
            <option>Independent</option>
          </select>
          <select className="soft-input" onChange={(event) => setWard(event.target.value)}>
            <option value="all">All wards</option>
            <option>Ward 1</option>
            <option>Ward 2</option>
            <option>Ward 3</option>
          </select>
          <select className="soft-input" onChange={(event) => setPledge(event.target.value)}>
            <option value="all">All pledge statuses</option>
            {pledgeTabs.map((tab) => <option key={tab}>{tab}</option>)}
          </select>
        </div>

        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Address</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Age</th>
                <th className="px-4 py-3">Ward</th>
                <th className="px-4 py-3">Party</th>
                <th className="px-4 py-3">Pledge</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((voter) => (
                <tr key={voter.id} className="hover:bg-slate-50">
                  <td className="px-4 py-4 font-semibold text-[#102451]"><button onClick={() => setSelected(voter)}>{voter.name}</button></td>
                  <td className="px-4 py-4 text-slate-600">{voter.address}</td>
                  <td className="px-4 py-4 text-slate-600">{voter.phone}</td>
                  <td className="px-4 py-4 text-slate-600">{voter.email}</td>
                  <td className="px-4 py-4 text-slate-600">{voter.age}</td>
                  <td className="px-4 py-4 text-slate-600">{voter.ward}</td>
                  <td className="px-4 py-4"><span className="status-pill bg-blue-50 text-blue-700">{voter.party}</span></td>
                  <td className="px-4 py-4"><span className={`status-pill ring-1 ${pledgeClasses[voter.pledge]}`}>{voter.pledge}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <article className="hq-card">
          <h3 className="mb-4 text-lg font-bold">Pledge Lists</h3>
          <div className="flex flex-wrap gap-2">
            {pledgeTabs.map((tab) => <span key={tab} className={`status-pill ring-1 ${pledgeClasses[tab]}`}>{tab}</span>)}
          </div>
          <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">Bulk-select pledge rows, export lists, or plan follow-up from this workspace.</div>
        </article>

        <article className="hq-card">
          <h3 className="mb-4 text-lg font-bold">Import Data</h3>
          <ol className="grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
            {['Upload CSV/Excel', 'Map columns', 'Preview warnings/errors', 'Confirm import'].map((step, index) => (
              <li key={step} className="rounded-xl bg-slate-50 p-3"><strong className="text-[#102451]">Step {index + 1}:</strong> {step}</li>
            ))}
          </ol>
          <button className="mt-4 rounded-xl border border-slate-200 px-4 py-2 font-semibold text-[#102451]">Download CSV template</button>
        </article>
      </section>

      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/40 p-4 backdrop-blur-sm">
          <aside className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Voter detail</p>
                <h4 className="mt-1 text-3xl font-bold text-[#102451]">{selected.name}</h4>
              </div>
              <button className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold" onClick={() => setSelected(null)}>Close ✕</button>
            </div>
            <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
              <p><strong>Address:</strong> {selected.address}</p>
              <p><strong>Phone:</strong> {selected.phone}</p>
              <p><strong>Email:</strong> {selected.email}</p>
              <p><strong>Pledge:</strong> {selected.pledge}</p>
            </div>
            <textarea className="soft-input mt-5 w-full" rows={4} placeholder="Log contact note" />
            <div className="mt-4 flex flex-wrap gap-3">
              <button className="rounded-xl bg-[#102451] px-4 py-2 font-semibold text-white">Update pledge</button>
              <button className="rounded-xl border border-slate-200 px-4 py-2 font-semibold text-[#102451]">Send outreach</button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

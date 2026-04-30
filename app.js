const BUILD_VERSION = 'recreated-pr-2026-04-30';
const partyColors = { Democratic: '#1f77ff', Republican: '#d62728', Independent: '#6b7280', Green: '#2ca02c' };
const users = { admin: { password: 'admin123', role: 'Admin', access: 'write' }, field: { password: 'field123', role: 'Field Organizer', access: 'write' }, volunteer: { password: 'vol123', role: 'Volunteer', access: 'read' } };
const teams = [{ name: 'Ward 1 Canvass', lead: 'M. Gomez', members: 8 }, { name: 'Phone Bank', lead: 'R. Lewis', members: 12 }];
const activities = [{ title: 'Weekend Canvass', date: '2026-05-03', owner: 'Field Team', status: 'Planned' }, { title: 'SMS Reminder Blast', date: '2026-05-05', owner: 'Digital Team', status: 'Draft' }];
const voters = [
  { id: 1001, name: 'Avery Brooks', address: '123 Main St', phone: '555-1010', email: 'avery@email.com', age: 44, ward: 'Ward 1', party: 'Democratic', pledgeStatus: 'Pledged', collectedVia: 'door', pledgeDate: '2026-04-10', gotvSent: true, contacts: [] },
  { id: 1002, name: 'Jordan Lee', address: '89 Cedar Ave', phone: '555-2020', email: 'jordan@email.com', age: 32, ward: 'Ward 2', party: 'Independent', pledgeStatus: 'Independent Target', collectedVia: 'phone', pledgeDate: '2026-04-12', gotvSent: false, contacts: [] },
  { id: 1003, name: 'Sam Patel', address: '14 Lake Dr', phone: '555-3030', email: 'sam@email.com', age: 51, ward: 'Ward 1', party: 'Republican', pledgeStatus: 'Opposed', collectedVia: 'event', pledgeDate: '2026-04-13', gotvSent: false, contacts: [] },
  { id: 1004, name: 'Riley Chen', address: '700 Oak St', phone: '555-4040', email: 'riley@email.com', age: 27, ward: 'Ward 3', party: 'Green', pledgeStatus: 'Undecided', collectedVia: 'SMS', pledgeDate: '2026-04-15', gotvSent: true, contacts: [] }
];
let currentUser = null;
let selectedPledgeTab = 'Pledged';
const $ = (s) => document.querySelector(s);

$('#login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const { username, password } = Object.fromEntries(new FormData(e.target));
  const record = users[username];
  if (!record || record.password !== password) return alert('Invalid credentials.');
  currentUser = { username, ...record };
  $('#session-label').textContent = `${record.role} • ${record.access.toUpperCase()} access`;
  $('#build-version').textContent = `Build: ${BUILD_VERSION}`;
  $('#login-screen').classList.add('hidden');
  $('#app-shell').classList.remove('hidden');
  applyAccessControls();
  refreshAll();
});
$('#logout').onclick = () => location.reload();
function applyAccessControls() { document.querySelectorAll('[data-requires="write"]').forEach((el) => el.disabled = currentUser.access !== 'write'); }
const partyPill = (party) => `<span class="party-pill" style="background:${partyColors[party] || '#64748b'}">${party}</span>`;
function hydrateFilterOptions() {
  const parties = Object.keys(partyColors);
  const wards = [...new Set(voters.map((v) => v.ward))];
  $('#party-filter').innerHTML = '<option value="all">All parties</option>' + parties.map((p) => `<option value="${p}">${p}</option>`).join('');
  $('#ward-filter').innerHTML = '<option value="all">All wards</option>' + wards.map((w) => `<option value="${w}">${w}</option>`).join('');
  $('#add-party-select').innerHTML = parties.map((p) => `<option value="${p}">${p}</option>`).join('');
}
function filteredVoters() {
  const q = $('#search').value.toLowerCase();
  return voters.filter((v) => [v.id, v.name, v.address, v.phone, v.email].join(' ').toLowerCase().includes(q) && ($('#party-filter').value === 'all' || v.party === $('#party-filter').value) && ($('#ward-filter').value === 'all' || v.ward === $('#ward-filter').value) && ($('#pledge-filter').value === 'all' || v.pledgeStatus === $('#pledge-filter').value));
}
function renderVoterTable() { $('#voter-table tbody').innerHTML = filteredVoters().map((v) => `<tr><td>${v.id}</td><td><span class="voter-link" data-id="${v.id}">${v.name}</span></td><td>${v.address}</td><td>${v.phone}</td><td>${v.email}</td><td>${v.age}</td><td>${v.ward}</td><td>${partyPill(v.party)}</td><td>${v.pledgeStatus}</td></tr>`).join(''); }
function renderPledgeTable() { $('#pledge-table tbody').innerHTML = voters.filter((v) => v.pledgeStatus === selectedPledgeTab).map((v) => `<tr><td><input type="checkbox" class="row-check" data-id="${v.id}" /></td><td>${v.id}</td><td>${v.name}</td><td>${v.ward}</td><td>${partyPill(v.party)}</td><td>${v.collectedVia}</td><td>${v.pledgeDate}</td><td>${v.gotvSent ? 'Yes' : 'No'}</td></tr>`).join(''); }
function renderKpis() {
  $('#kpi-total').textContent = voters.length;
  $('#kpi-pledged').textContent = voters.filter((v) => v.pledgeStatus === 'Pledged').length;
  $('#kpi-undecided').textContent = voters.filter((v) => v.pledgeStatus === 'Undecided').length;
  $('#kpi-independent').textContent = voters.filter((v) => v.pledgeStatus === 'Independent Target').length;
  $('#pledge-summary').innerHTML = ['Pledged', 'Undecided', 'Independent Target', 'Opposed'].map((s) => `<li>${s}: <strong>${voters.filter((v) => v.pledgeStatus === s).length}</strong></li>`).join('');
  $('#party-summary').innerHTML = Object.keys(partyColors).map((p) => `<li>${partyPill(p)} <strong>${voters.filter((v) => v.party === p).length}</strong></li>`).join('');
}
function renderSupportPanels() {
  $('#teams-list').innerHTML = teams.map((t) => `<div><strong>${t.name}</strong><br>Lead: ${t.lead}<br>Members: ${t.members}</div>`).join('');
  $('#activities-list').innerHTML = activities.map((a) => `<div><strong>${a.title}</strong><br>${a.date} · ${a.owner}<br>Status: ${a.status}</div>`).join('');
}
function refreshAll() { hydrateFilterOptions(); renderVoterTable(); renderPledgeTable(); renderKpis(); renderSupportPanels(); renderPartyList(); }

function openVoterDetail(id) {
  const voter = voters.find((v) => v.id === Number(id)); if (!voter) return;
  $('#detail-name').textContent = `${voter.name} (#${voter.id})`;
  $('#detail-body').innerHTML = `<p><strong>Address:</strong> ${voter.address}</p><p><strong>Phone:</strong> ${voter.phone}</p><p><strong>Email:</strong> ${voter.email}</p><label>Pledge status<select id="detail-pledge">${['Pledged', 'Undecided', 'Independent Target', 'Opposed'].map((s) => `<option ${s === voter.pledgeStatus ? 'selected' : ''}>${s}</option>`).join('')}</select></label><label>Log contact note<textarea id="contact-note" rows="4"></textarea></label><div class="bulk-actions"><button id="save-detail" class="primary" data-requires="write">Save update</button><button id="send-outreach" data-requires="write">Send outreach</button></div>`;
  $('#detail-panel').classList.remove('hidden');
  applyAccessControls();
  $('#save-detail').onclick = () => { if (currentUser.access !== 'write') return; voter.pledgeStatus = $('#detail-pledge').value; refreshAll(); alert('Voter updated'); };
}

$('#voter-table').addEventListener('click', (e) => e.target.classList.contains('voter-link') && openVoterDetail(e.target.dataset.id));
$('#close-detail').onclick = () => $('#detail-panel').classList.add('hidden');
['#search', '#party-filter', '#ward-filter', '#pledge-filter'].forEach((s) => $(s).addEventListener('input', renderVoterTable));
$('#pledge-tabs').addEventListener('click', (e) => { if (!e.target.dataset.tab) return; selectedPledgeTab = e.target.dataset.tab; document.querySelectorAll('#pledge-tabs button').forEach((b) => b.classList.toggle('active', b.dataset.tab === selectedPledgeTab)); renderPledgeTable(); });
$('#open-add-voter').onclick = () => currentUser.access === 'write' && $('#add-voter-dialog').showModal();
$('#add-voter-form').addEventListener('submit', (e) => { e.preventDefault(); const data = Object.fromEntries(new FormData(e.target)); voters.push({ id: Math.max(...voters.map((v) => v.id)) + 1, ...data, age: Number(data.age), collectedVia: 'event', pledgeDate: new Date().toISOString().slice(0, 10), gotvSent: false, contacts: [] }); refreshAll(); $('#add-voter-dialog').close(); e.target.reset(); });
$('#open-party-manager').onclick = () => $('#party-dialog').showModal();
$('#party-form').addEventListener('submit', (e) => { e.preventDefault(); if (currentUser.access !== 'write') return; const data = Object.fromEntries(new FormData(e.target)); partyColors[data.partyName.trim()] = data.partyColor; refreshAll(); e.target.reset(); });
function renderPartyList() { $('#party-list').innerHTML = Object.entries(partyColors).map(([name, color]) => `<p>${name} <span class="party-pill" style="background:${color}">${color}</span></p>`).join(''); }

$('#choose-file').onclick = (e) => { e.preventDefault(); $('#file-input').click(); };
function parseImport(file) { $('#import-feedback').innerHTML = `<strong>File:</strong> ${file.name}<br>Import staged from add-voter menu.`; }
$('#file-input').addEventListener('change', () => $('#file-input').files[0] && parseImport($('#file-input').files[0]));
['dragenter', 'dragover', 'dragleave', 'drop'].forEach((evt) => $('#dropzone').addEventListener(evt, (e) => e.preventDefault()));
$('#dropzone').addEventListener('drop', (e) => e.dataTransfer.files[0] && parseImport(e.dataTransfer.files[0]));
$('#download-template').onclick = () => { const header = 'id,name,address,phone,email,age,ward,party,pledgeStatus,collectedVia,pledgeDate,gotvSent'; const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([`${header}\n`], { type: 'text/csv' })); a.download = 'voter-import-template.csv'; a.click(); };
$('#export-selected').onclick = () => alert('Export selected ready.');
$('#followup-selected').onclick = () => currentUser.access === 'write' && alert('Follow-up plan created for selected voters.');

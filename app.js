const partyColors = { Democratic: '#1f77ff', Republican: '#d62728', Independent: '#6b7280', Green: '#2ca02c' };
const users = {
  admin: { password: 'admin123', role: 'Admin', access: 'write' },
  field: { password: 'field123', role: 'Field Organizer', access: 'write' },
  volunteer: { password: 'vol123', role: 'Volunteer', access: 'read' }
};

const voters = [
  { id: 1001, name: 'Avery Brooks', address: '123 Main St', phone: '555-1010', email: 'avery@email.com', age: 44, ward: 'Ward 1', party: 'Democratic', pledgeStatus: 'Pledged', collectedVia: 'door', pledgeDate: '2026-04-10', gotvSent: true, contacts: [] },
  { id: 1002, name: 'Jordan Lee', address: '89 Cedar Ave', phone: '555-2020', email: 'jordan@email.com', age: 32, ward: 'Ward 2', party: 'Independent', pledgeStatus: 'Independent Target', collectedVia: 'phone', pledgeDate: '2026-04-12', gotvSent: false, contacts: [] },
  { id: 1003, name: 'Sam Patel', address: '14 Lake Dr', phone: '555-3030', email: 'sam@email.com', age: 51, ward: 'Ward 1', party: 'Republican', pledgeStatus: 'Opposed', collectedVia: 'event', pledgeDate: '2026-04-13', gotvSent: false, contacts: [] },
  { id: 1004, name: 'Riley Chen', address: '700 Oak St', phone: '555-4040', email: 'riley@email.com', age: 27, ward: 'Ward 3', party: 'Green', pledgeStatus: 'Undecided', collectedVia: 'SMS', pledgeDate: '2026-04-15', gotvSent: true, contacts: [] }
];
let currentUser = null;
let selectedPledgeTab = 'Pledged';

const $ = (s) => document.querySelector(s);
const voterBody = $('#voter-table tbody');
const pledgeBody = $('#pledge-table tbody');

$('#login-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const { username, password } = Object.fromEntries(new FormData(e.target));
  const record = users[username];
  if (!record || record.password !== password) return alert('Invalid credentials.');
  currentUser = { username, ...record };
  $('#session-label').textContent = `${record.role} • ${record.access.toUpperCase()} access`;
  $('#login-screen').classList.add('hidden');
  $('#app-shell').classList.remove('hidden');
  applyAccessControls();
  refreshAll();
});
$('#logout').onclick = () => location.reload();

function applyAccessControls() {
  document.querySelectorAll('[data-requires="write"]').forEach((el) => {
    const disabled = currentUser.access !== 'write';
    el.disabled = disabled;
    el.title = disabled ? 'Write access required' : '';
  });
}

function hydrateFilterOptions() {
  const parties = [...new Set(voters.map((v) => v.party))];
  const wards = [...new Set(voters.map((v) => v.ward))];
  $('#party-filter').innerHTML = '<option value="all">All parties</option>' + parties.map((p) => `<option value="${p}">${p}</option>`).join('');
  $('#ward-filter').innerHTML = '<option value="all">All wards</option>' + wards.map((w) => `<option value="${w}">${w}</option>`).join('');
}

function filteredVoters() {
  const q = $('#search').value.toLowerCase();
  return voters.filter((v) => {
    const matchesSearch = [v.id, v.name, v.address, v.phone, v.email].join(' ').toLowerCase().includes(q);
    const matchesParty = $('#party-filter').value === 'all' || v.party === $('#party-filter').value;
    const matchesWard = $('#ward-filter').value === 'all' || v.ward === $('#ward-filter').value;
    const matchesPledge = $('#pledge-filter').value === 'all' || v.pledgeStatus === $('#pledge-filter').value;
    return matchesSearch && matchesParty && matchesWard && matchesPledge;
  });
}
const partyPill = (party) => `<span class="party-pill" style="background:${partyColors[party] || '#64748b'}">${party}</span>`;

function renderVoterTable() {
  voterBody.innerHTML = filteredVoters().map((v) => `<tr><td>${v.id}</td><td><span class="voter-link" data-id="${v.id}">${v.name}</span></td><td>${v.address}</td><td>${v.phone}</td><td>${v.email}</td><td>${v.age}</td><td>${v.ward}</td><td>${partyPill(v.party)}</td><td>${v.pledgeStatus}</td></tr>`).join('');
}
function renderPledgeTable() {
  const rows = voters.filter((v) => v.pledgeStatus === selectedPledgeTab);
  pledgeBody.innerHTML = rows.map((v) => `<tr><td><input type="checkbox" class="row-check" data-id="${v.id}" /></td><td>${v.id}</td><td>${v.name}</td><td>${v.ward}</td><td>${partyPill(v.party)}</td><td>${v.collectedVia}</td><td>${v.pledgeDate}</td><td>${v.gotvSent ? 'Yes' : 'No'}</td></tr>`).join('');
}
function renderKpis() {
  $('#kpi-total').textContent = voters.length;
  $('#kpi-pledged').textContent = voters.filter((v) => v.pledgeStatus === 'Pledged').length;
  $('#kpi-undecided').textContent = voters.filter((v) => v.pledgeStatus === 'Undecided').length;
  $('#kpi-independent').textContent = voters.filter((v) => v.pledgeStatus === 'Independent Target').length;
}
function refreshAll() { hydrateFilterOptions(); renderVoterTable(); renderPledgeTable(); renderKpis(); }

function openVoterDetail(id) {
  const voter = voters.find((v) => v.id === Number(id)); if (!voter) return;
  $('#detail-name').textContent = `${voter.name} (#${voter.id})`;
  $('#detail-body').innerHTML = `<p><strong>Address:</strong> ${voter.address}</p><p><strong>Phone:</strong> ${voter.phone}</p><p><strong>Email:</strong> ${voter.email}</p><label>Pledge status<select id="detail-pledge">${['Pledged', 'Undecided', 'Independent Target', 'Opposed'].map((s) => `<option ${s === voter.pledgeStatus ? 'selected' : ''}>${s}</option>`).join('')}</select></label><label>Log contact note<textarea id="contact-note" rows="3"></textarea></label><div class="bulk-actions"><button id="save-detail" class="primary" data-requires="write">Save update</button><button id="send-outreach" data-requires="write">Send outreach</button></div>`;
  $('#detail-panel').classList.remove('hidden');
  applyAccessControls();
  $('#save-detail').onclick = () => { if (currentUser.access !== 'write') return; voter.pledgeStatus = $('#detail-pledge').value; const note = $('#contact-note').value.trim(); if (note) voter.contacts.push({ date: new Date().toISOString().slice(0, 10), note, by: currentUser.username }); refreshAll(); alert('Voter updated'); };
  $('#send-outreach').onclick = () => currentUser.access === 'write' && alert(`Outreach queued for ${voter.name}`);
}

$('#voter-table').addEventListener('click', (e) => e.target.classList.contains('voter-link') && openVoterDetail(e.target.dataset.id));
$('#close-detail').onclick = () => $('#detail-panel').classList.add('hidden');
['#search', '#party-filter', '#ward-filter', '#pledge-filter'].forEach((s) => $(s).addEventListener('input', renderVoterTable));
$('#pledge-tabs').addEventListener('click', (e) => { if (!e.target.dataset.tab) return; selectedPledgeTab = e.target.dataset.tab; document.querySelectorAll('#pledge-tabs button').forEach((b) => b.classList.toggle('active', b.dataset.tab === selectedPledgeTab)); renderPledgeTable(); });
$('#select-all-pledges').addEventListener('change', (e) => document.querySelectorAll('.row-check').forEach((cb) => cb.checked = e.target.checked));
$('#export-selected').onclick = () => { const selected = [...document.querySelectorAll('.row-check:checked')].map((el) => Number(el.dataset.id)); const rows = voters.filter((v) => selected.includes(v.id)); if (!rows.length) return alert('Select rows first.'); const csv = ['id,name,ward,party,collectedVia,pledgeDate,gotvSent', ...rows.map((v) => `${v.id},${v.name},${v.ward},${v.party},${v.collectedVia},${v.pledgeDate},${v.gotvSent}`)].join('\n'); const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' })); a.download = `pledges-${selectedPledgeTab}.csv`; a.click(); };
$('#followup-selected').onclick = () => currentUser.access === 'write' && alert('Follow-up plan created for selected voters.');

const dialog = $('#add-voter-dialog');
$('#open-add-voter').onclick = () => currentUser.access === 'write' && dialog.showModal();
$('#add-voter-form').addEventListener('submit', (e) => { e.preventDefault(); if (currentUser.access !== 'write') return; const data = Object.fromEntries(new FormData(e.target)); voters.push({ id: Math.max(...voters.map((v) => v.id)) + 1, ...data, age: Number(data.age), collectedVia: 'event', pledgeDate: new Date().toISOString().slice(0, 10), gotvSent: false, contacts: [] }); refreshAll(); dialog.close(); e.target.reset(); });

$('#choose-file').onclick = (e) => { e.preventDefault(); $('#file-input').click(); };
function parseImport(file) { $('#import-feedback').innerHTML = `<strong>File:</strong> ${file.name}<br>Step 2 mapping prepared.<br>Step 3 preview: warnings for missing address, errors for empty records.<br>Step 4 ready for confirmation.`; }
$('#file-input').addEventListener('change', () => $('#file-input').files[0] && parseImport($('#file-input').files[0]));
['dragenter', 'dragover'].forEach((evt) => $('#dropzone').addEventListener(evt, (e) => { e.preventDefault(); }));
['dragleave', 'drop'].forEach((evt) => $('#dropzone').addEventListener(evt, (e) => { e.preventDefault(); }));
$('#dropzone').addEventListener('drop', (e) => e.dataTransfer.files[0] && parseImport(e.dataTransfer.files[0]));
$('#download-template').onclick = () => { const header = 'id,name,address,phone,email,age,ward,party,pledgeStatus,collectedVia,pledgeDate,gotvSent'; const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([`${header}\n`], { type: 'text/csv' })); a.download = 'voter-import-template.csv'; a.click(); };

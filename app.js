const voters = [
  { id: 1, name: 'Avery Brooks', address: '123 Main St', phone: '555-1010', email: 'avery@email.com', age: 44, ward: 'Ward 1', party: 'Democratic', pledgeStatus: 'Pledged', collectedVia: 'door', pledgeDate: '2026-04-10', gotvSent: true, contacts: [] },
  { id: 2, name: 'Jordan Lee', address: '89 Cedar Ave', phone: '555-2020', email: 'jordan@email.com', age: 32, ward: 'Ward 2', party: 'Independent', pledgeStatus: 'Independent Target', collectedVia: 'phone', pledgeDate: '2026-04-12', gotvSent: false, contacts: [] },
  { id: 3, name: 'Sam Patel', address: '14 Lake Dr', phone: '555-3030', email: 'sam@email.com', age: 51, ward: 'Ward 1', party: 'Republican', pledgeStatus: 'Opposed', collectedVia: 'event', pledgeDate: '2026-04-13', gotvSent: false, contacts: [] },
  { id: 4, name: 'Riley Chen', address: '700 Oak St', phone: '555-4040', email: 'riley@email.com', age: 27, ward: 'Ward 3', party: 'Democratic', pledgeStatus: 'Undecided', collectedVia: 'SMS', pledgeDate: '2026-04-15', gotvSent: true, contacts: [] }
];

let selectedPledgeTab = 'Pledged';

const voterBody = document.querySelector('#voter-table tbody');
const pledgeBody = document.querySelector('#pledge-table tbody');
const searchInput = document.querySelector('#search');
const partyFilter = document.querySelector('#party-filter');
const wardFilter = document.querySelector('#ward-filter');
const pledgeFilter = document.querySelector('#pledge-filter');
const detailPanel = document.querySelector('#detail-panel');
const detailName = document.querySelector('#detail-name');
const detailBody = document.querySelector('#detail-body');

function hydrateFilterOptions() {
  const parties = [...new Set(voters.map((v) => v.party))];
  const wards = [...new Set(voters.map((v) => v.ward))];
  partyFilter.innerHTML = '<option value="all">All parties</option>' + parties.map((p) => `<option value="${p}">${p}</option>`).join('');
  wardFilter.innerHTML = '<option value="all">All wards</option>' + wards.map((w) => `<option value="${w}">${w}</option>`).join('');
}

function filteredVoters() {
  const q = searchInput.value.toLowerCase();
  return voters.filter((v) => {
    const matchesSearch = [v.name, v.address, v.phone, v.email].join(' ').toLowerCase().includes(q);
    const matchesParty = partyFilter.value === 'all' || v.party === partyFilter.value;
    const matchesWard = wardFilter.value === 'all' || v.ward === wardFilter.value;
    const matchesPledge = pledgeFilter.value === 'all' || v.pledgeStatus === pledgeFilter.value;
    return matchesSearch && matchesParty && matchesWard && matchesPledge;
  });
}

function renderVoterTable() {
  voterBody.innerHTML = filteredVoters().map(v => `
    <tr>
      <td><span class="voter-link" data-id="${v.id}">${v.name}</span></td>
      <td>${v.address}</td><td>${v.phone}</td><td>${v.email}</td>
      <td>${v.age}</td><td>${v.ward}</td><td>${v.party}</td><td>${v.pledgeStatus}</td>
    </tr>
  `).join('');
}

function renderPledgeTable() {
  const rows = voters.filter(v => v.pledgeStatus === selectedPledgeTab);
  pledgeBody.innerHTML = rows.map(v => `
    <tr>
      <td><input type="checkbox" class="row-check" data-id="${v.id}"></td>
      <td>${v.name}</td><td>${v.ward}</td><td>${v.party}</td>
      <td>${v.collectedVia}</td><td>${v.pledgeDate}</td><td>${v.gotvSent ? 'Yes' : 'No'}</td>
    </tr>
  `).join('');
}

function openVoterDetail(id) {
  const voter = voters.find(v => v.id === Number(id));
  if (!voter) return;
  detailName.textContent = voter.name;
  detailBody.innerHTML = `
    <p><strong>Address:</strong> ${voter.address}</p>
    <p><strong>Phone:</strong> ${voter.phone}</p>
    <p><strong>Email:</strong> ${voter.email}</p>
    <label>Pledge status
      <select id="detail-pledge">
        ${['Pledged', 'Undecided', 'Independent Target', 'Opposed'].map(s => `<option ${s === voter.pledgeStatus ? 'selected' : ''}>${s}</option>`).join('')}
      </select>
    </label>
    <label>Log contact note
      <textarea id="contact-note" rows="3" placeholder="Spoke at door, requested follow-up..."></textarea>
    </label>
    <div class="bulk-actions">
      <button id="save-detail" class="primary">Save update</button>
      <button id="send-outreach">Send outreach</button>
    </div>
  `;
  detailPanel.classList.remove('hidden');
  document.querySelector('#save-detail').onclick = () => {
    voter.pledgeStatus = document.querySelector('#detail-pledge').value;
    const note = document.querySelector('#contact-note').value.trim();
    if (note) voter.contacts.push({ date: new Date().toISOString().slice(0, 10), note });
    renderVoterTable();
    renderPledgeTable();
    alert('Voter updated');
  };
  document.querySelector('#send-outreach').onclick = () => alert(`Outreach queued for ${voter.name}`);
}

document.querySelector('#voter-table').addEventListener('click', (e) => {
  if (e.target.classList.contains('voter-link')) openVoterDetail(e.target.dataset.id);
});

document.querySelector('#close-detail').onclick = () => detailPanel.classList.add('hidden');
[searchInput, partyFilter, wardFilter, pledgeFilter].forEach(el => el.addEventListener('input', renderVoterTable));

document.querySelector('#pledge-tabs').addEventListener('click', (e) => {
  if (!e.target.dataset.tab) return;
  selectedPledgeTab = e.target.dataset.tab;
  document.querySelectorAll('#pledge-tabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === selectedPledgeTab));
  renderPledgeTable();
});

document.querySelector('#select-all-pledges').addEventListener('change', (e) => {
  document.querySelectorAll('.row-check').forEach(cb => cb.checked = e.target.checked);
});

document.querySelector('#export-selected').onclick = () => {
  const selected = [...document.querySelectorAll('.row-check:checked')].map(el => Number(el.dataset.id));
  const rows = voters.filter(v => selected.includes(v.id));
  if (!rows.length) return alert('Select rows first.');
  const csv = ['name,ward,party,collectedVia,pledgeDate,gotvSent', ...rows.map(v => `${v.name},${v.ward},${v.party},${v.collectedVia},${v.pledgeDate},${v.gotvSent}`)].join('\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }));
  const a = document.createElement('a');
  a.href = url; a.download = `pledges-${selectedPledgeTab}.csv`; a.click();
};

document.querySelector('#followup-selected').onclick = () => alert('Follow-up plan created for selected voters.');

const dialog = document.querySelector('#add-voter-dialog');
document.querySelector('#open-add-voter').onclick = () => dialog.showModal();
document.querySelector('#add-voter-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target));
  voters.push({
    id: Date.now(),
    ...data,
    age: Number(data.age),
    collectedVia: 'event',
    pledgeDate: new Date().toISOString().slice(0, 10),
    gotvSent: false,
    contacts: []
  });
  hydrateFilterOptions(); renderVoterTable(); renderPledgeTable();
  dialog.close(); e.target.reset();
});

const dropzone = document.querySelector('#dropzone');
const fileInput = document.querySelector('#file-input');
const feedback = document.querySelector('#import-feedback');
document.querySelector('#choose-file').onclick = (e) => { e.preventDefault(); fileInput.click(); };

function parseImport(file) {
  feedback.innerHTML = `<strong>File:</strong> ${file.name}<br>Step 2: Column mapping auto-suggested.<br>Step 3: Preview: <span class="warn">Warning</span> for missing addresses and <span class="error">Error</span> for empty records.<br>Step 4: Ready to confirm import.`;
}
fileInput.addEventListener('change', () => fileInput.files[0] && parseImport(fileInput.files[0]));
['dragenter','dragover'].forEach(evt => dropzone.addEventListener(evt, (e) => { e.preventDefault(); dropzone.classList.add('drag'); }));
['dragleave','drop'].forEach(evt => dropzone.addEventListener(evt, (e) => { e.preventDefault(); dropzone.classList.remove('drag'); }));
dropzone.addEventListener('drop', (e) => e.dataTransfer.files[0] && parseImport(e.dataTransfer.files[0]));

document.querySelector('#download-template').onclick = () => {
  const header = 'name,address,phone,email,age,ward,party,pledgeStatus,collectedVia,pledgeDate,gotvSent';
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([header + '\n'], { type: 'text/csv' }));
  a.download = 'voter-import-template.csv';
  a.click();
};

hydrateFilterOptions();
renderVoterTable();
renderPledgeTable();

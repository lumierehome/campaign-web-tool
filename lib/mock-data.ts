export const seed = {
  parties: [{ id: 'p1', name: 'Unity Party', short_name: 'UP', color: '#1f77ff' }],
  candidates: [{ id: 'c1', party_id: 'p1', full_name: 'Alex Didi', position: 'MP', constituency: 'North' }],
  voters: Array.from({ length: 10 }).map((_, i) => ({ id: `v${i + 1}`, full_name: `Voter ${i + 1}`, ward: `Ward ${1 + (i % 3)}`, phone: `555-10${i}`, support_status: ['strong_supporter','undecided','needs_follow_up'][i % 3] })),
  pledges: Array.from({ length: 5 }).map((_, i) => ({ id: `pl${i + 1}`, voter_id: `v${i + 1}`, status: ['pending','completed','follow_up_needed'][i % 3], pledge_type: 'vote_commitment' })),
  events: [{ id: 'e1', title: 'Rally', event_type: 'rally' }, { id: 'e2', title: 'Door Outreach', event_type: 'door_to_door' }, { id: 'e3', title: 'Training', event_type: 'training' }]
};

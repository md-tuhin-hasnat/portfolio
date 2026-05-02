export default {
  name: 'cpExperience',
  title: 'Competitive Programming Experience',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'link', title: 'Link', type: 'url' },
    { name: 'date', title: 'Date', type: 'string' },
    { name: 'type', title: 'Type (e.g., ICPC, CF, IUPC)', type: 'string' },
    { name: 'online', title: 'Is Online?', type: 'boolean', initialValue: false },
    { name: 'maxRating', title: 'Max Rating (for Online)', type: 'number' },
    { name: 'handleName', title: 'Handle Name (for Online)', type: 'string' },
    { name: 'rank', title: 'Rank (for Onsite)', type: 'number' },
    { name: 'teamName', title: 'Team Name (for Onsite)', type: 'string' },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
}

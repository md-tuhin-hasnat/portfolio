export default {
  name: 'experience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    { name: 'company', title: 'Company', type: 'string' },
    { name: 'role', title: 'Role', type: 'string' },
    { name: 'duration', title: 'Duration', type: 'string' },
    { name: 'image', title: 'Company/Project Image', type: 'image', options: { hotspot: true } },
    {
      name: 'description',
      title: 'Description Points',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'type',
      title: 'Experience Type',
      type: 'string',
      options: {
        list: [
          { title: 'Professional', value: 'work' },
          { title: 'Volunteering', value: 'volunteer' },
          { title: 'Competitive Programming', value: 'cp' },
        ],
      },
    },
  ],
}

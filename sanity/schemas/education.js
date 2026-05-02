export default {
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    { name: 'degree', title: 'Degree', type: 'string' },
    { name: 'institution', title: 'Institution', type: 'string' },
    { name: 'period', title: 'Period', type: 'string' },
    { name: 'cgpa', title: 'CGPA/GPA', type: 'string' },
    { name: 'focus', title: 'Focus Area', type: 'string' },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Verified Official Transcript', value: 'Verified Official Transcript' },
          { title: 'Board Verified', value: 'Board Verified' },
          { title: 'In Progress', value: 'In Progress' },
        ],
      },
    },
  ],
}

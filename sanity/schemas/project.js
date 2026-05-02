export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Project Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
    },
    {
      name: 'abstract',
      title: 'Technical Abstract',
      type: 'text',
    },
    {
      name: 'methodology',
      title: 'Technical Methodology Points',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    },
    {
      name: 'architecture',
      title: 'System Architecture',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'journal',
      title: 'Project Journal (Rich Text)',
      type: 'blockContent',
      description: 'The detailed IEEE-style methodology and documentation.',
    },
    {
      name: 'links',
      title: 'Links',
      type: 'object',
      fields: [
        { name: 'github', title: 'GitHub Repository', type: 'url' },
        { name: 'deployment', title: 'Live Deployment', type: 'url' },
      ],
    },
    {
      name: 'status',
      title: 'Deployment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'ACTIVE' },
          { title: 'Development', value: 'DEVELOPMENT' },
          { title: 'Archived', value: 'ARCHIVED' },
        ],
      },
    },
    {
      name: 'runtime',
      title: 'Runtime Environment',
      type: 'string',
    },
  ],
}

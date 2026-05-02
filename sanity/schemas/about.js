export default {
  name: 'about',
  title: 'About Me',
  type: 'document',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'role', title: 'Main Role', type: 'string' },
    { name: 'image', title: 'Profile Image', type: 'image', options: { hotspot: true } },
    {
      name: 'bio',
      title: 'Bio (Rich Text)',
      type: 'blockContent',
    },
    {
      name: 'resume',
      title: 'Resume PDF',
      type: 'file',
      options: { accept: '.pdf' },
    },
    {
      name: 'socials',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Platform', type: 'string' },
            { name: 'link', title: 'URL', type: 'url' },
            { name: 'icon', title: 'Icon Key (Lucide Name)', type: 'string' },
          ],
        },
      ],
    },
  ],
}

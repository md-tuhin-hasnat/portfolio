export default {
  name: 'skill',
  title: 'Skill Category',
  type: 'document',
  fields: [
    { name: 'section', title: 'Category Name', type: 'string' },
    {
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Skill Name', type: 'string' },
            { name: 'percentage', title: 'Proficiency Percentage', type: 'number' },
          ],
        },
      ],
    },
  ],
}

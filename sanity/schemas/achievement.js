export default {
  name: 'achievement',
  title: 'Achievement',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'brand', title: 'Brand/Organization', type: 'string' },
    { name: 'brandTextColor', title: 'Brand Text Color (Hex)', type: 'string', initialValue: '#4A82C3' },
    { name: 'link', title: 'Link', type: 'url' },
    { name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } },
    { name: 'order', title: 'Display Order', type: 'number' },
  ],
}

export default {
  name: 'featured',
  title: 'Featured',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Featured Category name',
      validation: (Rule) => Rule.required().error('Name is required'),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short Description',
      validation: (Rule) => Rule.max(200),
    },
    {
      name:  'restaurants',
      type: 'array',
      title: 'Restaurants',
      /**
       * Restaurant tablosuna bağlantı kuruyoruz.
       * to ile restaurant tablosundaki type field'una bağlantı kuruyoruz.
       * 
       * restaurant tablosundaki bütün restaurantlar listeleniyor
       */
      of: [{type: 'reference', to: [{type: 'restaurant'}]}],
    } 
  ]
}
export default {
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Restaurant Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      title: 'Short Description',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Imag of the restaurant',
    },
    {
      name: 'lat',
      type:'number',
      title: 'Latitude of the restaurant',
    },
    {
      name: 'long',
      type:'number',
      title: 'Longitude of the restaurant',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Address of the restaurant',
      validation: (Rule) => Rule.required().error('Address is required'),
    }, 
    {
      name: 'rating',
      type: 'number',
      title: 'Enter a Rating from (1-5) Starts',
      validation: (Rule) => 
      Rule.required()
      .min(1)
      .max(5)
      .error("Please enter a value between 1 and 5"),
    },
    /**
     * type reference ile category tablosuna bağlantı kuruyoruz.
     * to ile category tablosundaki type field'una bağlantı kuruyoruz.
     */
    {
      name: 'type',
      type: 'string',
      title: 'Category',
      validation: (Rule) => Rule.required().error('Category is required'),
      type: 'reference',
      to: [{type: 'category'}],
    },
    {
      name: "dishes",
      title: "Dishes",
      type: "array",
      of: [{type: 'reference', to: [{type: 'dish'}]}],
    }
     
  ],


}

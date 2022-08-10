export default {
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
  {
    name: 'name',
    title: 'Name of dish',
    type: 'string',
    validation: (Rule) => Rule.required().error('Name is required'),
  },
  {
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: {
      /**
       * slug field'ının oluşturulması için kullanılacak field'ı belirtiyoruz.
       */
      source: 'name',
      maxLength: 96
    }
  },
  {
    name: 'short_description',
    type: 'string',
    title: 'Short Description',
    validation: (Rule) => Rule.max(200),
  },
  {
    name: 'price',
    type: 'number',
    title: 'Price of the dish in GBP',
  },
  {
    name: 'image',
    type: 'image',
    title: 'Image of the dish',
    options: {
      hotspot: true,
    }
  } 

  /** 
   *   {
    name: 'slug',
    title: 'Slug',
    type: 'slug',
    options: {
      source: 'name',
      maxLength: 96
    }
  }, 

    name : 'image',
    title: 'Image',
    type: 'image',
   resmi direk yükler ve önizleme yapar
    options: {
      hotspot: true
    }
  }  */
  ]
}
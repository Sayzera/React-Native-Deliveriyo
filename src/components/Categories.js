import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import CategoryCard from './CategoryCard'
import sanityClient, { urlFor } from '../../sanity'

export default function Categories() {
 const [categories, setCategories] =  React.useState()
  React.useEffect(() => {
    sanityClient.fetch(`
    *[_type == "category"] {
      title, _id,image
    }
    `).then((data) => {
      setCategories(data);
    })
  },[])

  return (
      <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop:10
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
      >
        {/* CategoryCard */}

       {
          categories?.map((category) => (
            <CategoryCard 
            key={category._id} 
            id={category._id} 
            imgUrl={category.image} 
            title={category.title}/>
          ))
       } 
 

      </ScrollView>
  )
}
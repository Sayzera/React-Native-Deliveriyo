import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { urlFor } from '../../sanity'

export default function CategoryCard({ imgUrl, title }) {

  return ( 
   <TouchableOpacity className="relative mr-2">
      <Image source={{
        uri : imgUrl != undefined ?  urlFor(imgUrl).width(200).url() : 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60'
      }} 
      className="h-20 w-20 rounded"
      />
      <Text className="absolute bottom-1  left-1 text-white font-bold">{title}</Text>

   </TouchableOpacity>
  )
}
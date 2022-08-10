import { View, Text,ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import RestaurantCard from './RestaurantCard'
import sanityClient from  '../../sanity';

export default function FeaturedRow({title,description,featuredCategory,id}) {

  const [restaurants, setRestaurants] = React.useState([]);

  useEffect(() => {
    sanityClient.fetch(`
    *[_type == "featured" && _id == $id] {
      ...,
      restaurants[] -> {
        ...,
        dishes[] -> {
          ...,
        }
      },
    }[0]
    `, 
    {
      id
    } ).then((data) => {
      setRestaurants(data.restaurants)
    })

  },[id])




  return (
    <View>
        <View className="mt-4 flex-row items-center justify-between px-4">
          <Text className="font-bold text-lg">{title}</Text>
          <ArrowRightIcon  color={'#00BBCC'} size={20} />
        </View>

        <Text className="text-xs text-gray-500 px-4">
          {description}
       </Text>

       <ScrollView 
       horizontal 
       contentContainerStyle={{
        paddingHorizontal:15
       }}
       showsVerticalScrollIndicator={false}
       showsHorizontalScrollIndicator={false}
       className="pt-4"
       >

        {/* RestaurantCards */}
   
       {
          restaurants?.map((restaurant) => (
            <RestaurantCard 
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={title}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
            key={restaurant._id}
            />
            ))
        }
       
    

       </ScrollView>
    </View>
  )
}
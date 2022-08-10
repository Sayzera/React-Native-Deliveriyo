import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { LocationMarkerIcon, StarIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../../sanity'
import { useNavigation } from '@react-navigation/native';
export default function RestaurantCard({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}) {


  const navigation = useNavigation();
  return (
    <TouchableOpacity className="mr-2"
    onPress={() => navigation.navigate('Restaurant', {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    })}
    >
      <Image source={{
        uri : urlFor(imgUrl).url()
      }} 
      className="h-36 w-64 rounded"
      /> 
      <View className="px-3 pb-4">
      <Text className="font-bold text-lg pt-2">{title}</Text>
      <View className="flex-row items-center space-x-1">
        <StarIcon  size={22} opacity={0.5} color="green"/>
        <Text>
         <Text className="text-green-500"> {rating}</Text> - {genre}
        </Text>
      </View>

      <View className="flex-row items-center space-x-1">
        <LocationMarkerIcon  size={22} opacity={0.5} color="gray"/>
        <Text>
         <Text className="text-gray-500"> Nearby {address.substr(0,25)}</Text> 
        </Text>
      </View>
      </View>
    </TouchableOpacity>
  )
}
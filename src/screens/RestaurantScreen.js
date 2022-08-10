import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native';
import { urlFor } from '../../sanity';
import { ArrowLeftIcon, ChevronDownIcon, LocationMarkerIcon, QuestionMarkCircleIcon, StarIcon } from 'react-native-heroicons/outline';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useEffect } from 'react';
import { setRestaurant } from '../redux/restaurantSlice';
import { useDispatch } from 'react-redux';

export default function RestaurantScreen() {

  const navigation = useNavigation();
  /**
   * params objesinin içerisindekileri al ve kullanılabilir yap
   */
  const {params: {
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
  }} = useRoute();

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  },[]);

  useEffect(() => {
    dispatch(setRestaurant({
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
    }));
  },[])



  return (
    <>
       <BasketIcon />
        <ScrollView className="bg-white" >
      <View className="relative">
       <Image  source={{
        uri : urlFor(imgUrl).url()
       }} 
        className="w-full h-56 bg-gray-300 p-4"
       />

       <TouchableOpacity onPress={() => navigation.goBack()} className="absolute top-14 left-5 p-2 bg-gray-100 rounded-full">
           <ArrowLeftIcon  size={20} color={'#00CCBB'} />
       </TouchableOpacity>
      </View>

      <View className="bg-white">
        <View className="px-4 pt-4">
          <Text className="text-3xl font-bold">{title}</Text>
          <View className="flex-row space-x-2 my-1">
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon  size={22} opacity={0.5} color="green"/>
                <Text>
                <Text className="text-green-500">{rating} . </Text> {genre}
                </Text>
                
              </View>

              <View className="flex-row items-center space-x-1">
                <LocationMarkerIcon  size={22} opacity={0.5} color="gray"/>
                <Text>
                <Text className="text-gray-500">{address}  </Text>
                </Text>
                
              </View>
            </View>
          </View>

          <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>
        </View>

        <TouchableOpacity 
        className="px-4 py-4 flex-row items-center space-x-2 p-4 border-y border-gray-300">
          <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />

          <Text className="pl-2 flex-1 text-md font-bold">
            Have a food allergy ?
          </Text>
          
          <ChevronDownIcon color="#00CCBB" />
        </TouchableOpacity>
      </View>
      
      <View className="pb-36">
       <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>

      {
          dishes?.map((dish) => (
            <DishRow
             key={dish._id} 
             id={dish._id}
             name={dish.name}
             price={dish.price}
             description={dish.short_description}
             image={dish.image}
             />
          ))
      }  
      </View>
    </ScrollView>

    </>
  )
}
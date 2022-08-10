import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

import {
  AdjustmentsIcon,
  ChevronDownIcon, SearchIcon, UserIcon
} from 'react-native-heroicons/outline'
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../../sanity';
// solid


export default function HomeScreen() {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = React.useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerTitle: 'Home',
      headerShown:false
    })
  },[])

  useEffect(() => {
    sanityClient.fetch(`
      *[_type == "featured"] {
        ...,
        restaurants[]-> {
          ...,
          dishes[]-> {
            ...,
          }
        }
      }
    `).then((data) => {
      setFeaturedCategories(data);
    })
  },[])


  return (
  <SafeAreaView className="bg-white pt-5">
    <View className="flex-row items-center mx-4 space-x-2 pb-2">
      <Image source={{
        uri : 'https://links.papareact.com/wru'
      }}
      className="h-7 w-7 bg-gray-300 p-4 rounded-full"
      />

      <View className="flex-1">
        <Text  className="font-bold">Deliver Now!</Text>
        <Text className="font-bold text-xl">Current Location
        <ChevronDownIcon size={20} color="#00CCBB" />
        </Text>
      </View>

      <UserIcon size={35}  color="#00CCBB" />
    </View>

      {/* Search  */}
    <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row spae-x-2 flex-1 bg-gray-300 p-3">
          <SearchIcon color={'gray'} size={20} />
          <TextInput placeholder='Restaurants and cuisines'
          keyboardType="default"
          />
        </View>

        <AdjustmentsIcon color={'#00CCBB'}/>
    </View>

      {/* Body  */}

      <ScrollView className="bg-gray-100" 
        contentContainerStyle = {{
          paddingBottom:100 
        }}
      >
        {/* Categories */}
        <Categories />

        {
          featuredCategories?.map((category) => {
            return (
              <FeaturedRow 
              key={category._id} 
              category={category}  
              id={category._id}
              description={category.short_description}
              title={category.name}
              />
            )
          })
        }

      </ScrollView>
  </SafeAreaView>
  )
}
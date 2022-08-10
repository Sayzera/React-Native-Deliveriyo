import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '../redux/restaurantSlice'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../redux/basketSlice'
import { useMemo } from 'react'
import { useEffect } from 'react'
import { XCircleIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../../sanity'
import CurrencyFormat from 'react-currency-format'

const BasketScreen = () => {
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)
  const items = useSelector(selectBasketItems)
  const [groupedItemsInBasket, setGroupedItemsInBasket] = React.useState([])
  const basketTotal = useSelector(selectBasketTotal)
  const dispatch = useDispatch()

  /**
   * Neden use memo kullanıyoruz?
   * Bu sayede her sayfa açıldığında redux'e yeni bir state atılmıyor.
   */
  useEffect(() => {
    const groupedItems = items.reduce((results,item) => {
        (results[item.id] = results[item.id] || []).push(item)
        return results
    }, {}) 
     setGroupedItemsInBasket(groupedItems)
  },[items])


  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB]">
          <Text className="text-lg font-bold text-center">Basket</Text>
          <Text className="text-center text-gray-400">
            {
              restaurant.title
            }
          </Text>
        </View>

        <TouchableOpacity
        className="rounded-full bg-gray-100 absolute top-3 right-5">
        <XCircleIcon color={"#00CCBB"} height={50} width={50} />
        </TouchableOpacity>

       <View className="flex-row  items-center space-x-4 py-3 px-4 bg-white my-5">
          <Image source={{
            uri: urlFor(restaurant.imgUrl).url()
          }} className="h-7 w-7 bg-gray-300 p-4 rounded-full" />

          <Text className="flex-1">Deliver in 50-75 min</Text>

          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
       </View>

       <ScrollView className="divide-y divide-gray-200">
          {
            Object.entries(groupedItemsInBasket).map(([key, items]) => {
              return (
                <View key={key} className="flex-row items-center space-x-3 bg-white py-2 px-5">
                <Text className="text-[#00CCBB]">{items.length} x </Text>
                <Image 
                source={{
                  uri: urlFor(items[0]?.image).url()
                }}
                className="h-12 w-12 rounded-full"
                />
                <Text className="flex-1">{items[0]?.name}</Text>

                <Text className="text-gray-600">
                  <CurrencyFormat
                    thousandSpacing="3"
                    value={items[0]?.price}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    renderText={value => <Text>{value}</Text>}
                  />
                </Text>

                <TouchableOpacity>
                  <Text 
                   className="text-[#00CCBB]"
                   onPress={() => dispatch(removeFromBasket(key))}>
                    Remove
                    
                  </Text>
                </TouchableOpacity>
                </View>
              )
            })
          }
       </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4"> 
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              <CurrencyFormat 
                thousandSpacing="3"
                value={basketTotal}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                renderText={value => <Text>{value}</Text>}
              
              />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Free</Text>
            <Text className="text-gray-400">
              <CurrencyFormat 
                thousandSpacing="2"
                value={6.99}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                renderText={value => <Text>{value}</Text>}
              
              />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Order Total</Text>
            <Text className="text-gray-400 font-extrabold">
              <CurrencyFormat 
                value={basketTotal + 6.99}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                renderText={value => <Text>{value}</Text>}
              
              />
            </Text>
          </View>

          <TouchableOpacity 
          onPress={() => navigation.navigate('PreparingOrderScreen')}
          className="rounded-lg bg-[#00CCBB] p-4">
            <Text className="text-center text-white text-lg font-bold">Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
      
    </SafeAreaView>
  )
}

export default BasketScreen
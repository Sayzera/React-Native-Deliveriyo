import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import CurrencyFormat from 'react-currency-format';
import { urlFor } from '../../sanity';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline';

import { useDispatch , useSelector} from 'react-redux'

import { addItemToBasket, selectBasketItemsWithId,removeItemFromBasket} from '../redux/basketSlice'

const DishRow = ({
  id,
  name,
  description,
  price,
  image
}) => {

  const dispatch = useDispatch()
  const [isPressed, setIsPressed] = React.useState(false);

  const basket = useSelector((state) => selectBasketItemsWithId(state,id))


  const addItemBasket = () => {
    dispatch(
      addItemToBasket({
        id,
        name,
        description,
        price,
        image
      })
    )

  }


  return (
    <>
    <TouchableOpacity 
    onPress={() => setIsPressed(!isPressed)} 
    className={`bg-white border p-4 border-gray-200 ${isPressed && "border-b-0"}`}>
      <View className="flex-row items-center">
          <View className="flex-1 pr-2">
          <Text className="text-lg mb-1">{name}</Text>
          <Text className="text-gray-400">{description}</Text>
          <CurrencyFormat
            value={price}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
            renderText={value => <Text className="text-gray-400 mt-2">{value}</Text>}
          />          
          </View>
      <View>
        <Image 
        style={{
          borderWidth:1,
          borderColor:'#F3F3F4',
        }}
        source={{ uri: urlFor(image).url() }} 
        className="h-20 w-20 bg-gray-300 p-4 "
        />
      </View>
      </View>

    </TouchableOpacity>

   {
      isPressed && (
        <View className="bg-white px-4">
          <View className="flex-row items-center space-x-2 pb-3">
              <TouchableOpacity>
                <MinusCircleIcon
                disabled={basket.length === 0}
                onPress={() => dispatch(removeItemFromBasket(id))}
                 color={basket.length > 0 ? '#00CCBB' : 'gray'} 
                 size={40}></MinusCircleIcon>
              </TouchableOpacity>

              <Text>{basket.length}</Text>


              <TouchableOpacity onPress={addItemBasket}>
                <PlusCircleIcon
                  color={basket.length > 0 ? '#00CCBB' : 'gray'} 
                
               size={40}/>
                 
              </TouchableOpacity>
          </View>
        </View>
      )
   } 
    </>
 
  )
}

export default DishRow
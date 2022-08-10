import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

const PreparingOrderScreen = () => {

    const navigation = useNavigation()


    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Delivery')
        }, 3000)
    },[])

    return (
    <SafeAreaView className="bg-[#F5CF8D] flex-1 justify-center items-center">
      <Animatable.Image
      source={require('../../assets/orderloading.gif')}
      animation="slideInUp"
      iterationCount={1}
      className="h-96 w-96"
      >

      </Animatable.Image>

      <Animatable.Text
       animation={'slideInUp'}
        iterationCount={1}
        className="text-white my-10 text-center font-extrabold text-lg">
        Waiting for Restaurant to accept your order
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color="#B6FFFB" borderWidth={3}></Progress.Circle>

    </SafeAreaView>
  )
}

export default PreparingOrderScreen
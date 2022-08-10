import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import RestaurantScreen from '../screens/RestaurantScreen';
import BasketScreen from '../screens/BasketScreen';
import PreparingOrderScreen from '../screens/PreparingOrderScreen';
import DeliveryScreen from '../screens/DeliveryScreen';

export default function index() {

  const Stack = createStackNavigator();
  const Tabs = createBottomTabNavigator();


  function HomeNavigator() {
    // İç sayfalar tıklanınca bir yerden bir yere giden 
       return (
        <Stack.Navigator  >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Restaurant" component={RestaurantScreen} />
          <Stack.Screen name="Basket" component={BasketScreen} 
          options={{
            presentation: 'modal',
            headerShown: false,
          }}
          />
          <Stack.Screen 
          name="PreparingOrderScreen"
          component={PreparingOrderScreen}
          options={{
            presentation:'fullScreenModal',
            headerShown: false,
          }}
          />

          <Stack.Screen 
          name="Delivery" 
          component={DeliveryScreen}
          options={{
            presentation: 'fullScreenModal',
            headerShown: false,
          }}
          
          />
        </Stack.Navigator>
       )
  }

  function TabsNavigator({navigation,route}) {
    return (
      <Tabs.Navigator screenOptions={{
        headerShown:false
      }}>
        <Tabs.Screen name="Anasayfa" component={HomeNavigator} />
      </Tabs.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown:false
        }}
      >
      {/* <Stack.Screen name="stack-home" component={TabsNavigator} /> */}
      <Stack.Screen name="stack-home" component={HomeNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
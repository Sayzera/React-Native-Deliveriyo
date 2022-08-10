import { TailwindProvider } from 'tailwindcss-react-native';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './src/screens/HomeScreen';
import AppNavigator from './src/navigation';
import { Provider } from 'react-redux';
import {store} from './src/redux/store';

export default function App() {

  return (
    <Provider store={store}>
        <TailwindProvider>
            <AppNavigator />
        </TailwindProvider>
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

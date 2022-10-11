import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { s } from 'react-native-wind'
import Home from './Screens/Home';
import RawJson from './Screens/RawJson';

export type ScreenParamTypes = {
  Home: undefined;
  RawJSON: {data:any};
}

export default function App() {
  const Stack = createNativeStackNavigator<ScreenParamTypes>()
  return (
    <NavigationContainer>
      <View style={s`h-full`}>
        <StatusBar style="auto" />
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={Home} options={{ title: 'Home' }} />
          <Stack.Screen name='RawJSON' component={RawJson} options={{ title: 'Raw JSON' }} />
        </Stack.Navigator>
      </View>
    </NavigationContainer>
  );
}



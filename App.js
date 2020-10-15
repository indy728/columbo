import React from 'react';
import CardDemo from 'screens/CardDemo';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import PubNubReact from 'pubnub-react'
// import PubNub from 'pubnub';
// import { PubNubProvider, usePubNub } from 'pubnub-react';
import createAppStore from 'store/configureStore';
import theme from 'themes/default';

import {ThemeProvider} from 'styled-components';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createStackNavigator();

// const pubnub = new PubNub({
//     publishKey: 'pub-c-283cda71-52d7-491a-b150-dc7bba71a9cf',
//     subscribeKey: 'sub-c-aac4441c-6ee4-11ea-a7c4-5e95b827fd71',
//   });

// const channels = ['awesomeChannel'];

const store = createAppStore();

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="CardDemo"
            component={CardDemo}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  </Provider>
);
export default App;

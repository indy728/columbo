// // import { StyleSheet, Text, View } from 'react-native';

// // export default function App() {
// //   return (
// //     <View style={styles.container}>
// //       <Text>Open up App.js to start working on your app!</Text>
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// // });

// import { NavigationContainer } from '@react-navigation/native'
// import { createAppContainer } from 'react-navigation'
// import { createStackNavigator } from 'react-navigation-stack'
// import PubNub from 'pubnub';
// import { PubNubProvider, PubNubConsumer } from 'pubnub-react';
// import { processColor } from 'react-native';
// import shortid from 'shortid';
// import { Provider, connect } from 'react-redux';
// import store from './store/configureStore'
// import { Constants } from 'expo'

// import { createStore, combineReducers } from 'redux'
// import gameReducer from './store/reducers/game'
// import { StackActions } from 'react-navigation';

// // require('dotenv').config()

// const Stack = createStackNavigator()
// const navigator = createStackNavigator(
//   {
//     Home: HomeScreen
//   },
//   {
//     initialRouteName: "Home",
//     defaultNavigationOptions: {
//       title: "App"
//     }
//   }
// )

// const pubnub = new PubNub({
//     publishkey: "pub-c-283cda71-52d7-491a-b150-dc7bba71a9cf",
//     subscribekey: "sub-c-aac4441c-6ee4-11ea-a7c4-5e95b827fd71",
//     uuid: "abc"
// })

// const AppContainer = createAppContainer(navigator)

// class App extends Component {
//     state = {
//         username: '',
//         isPlaying: false,
//         isWaiting: false,
//         isDisabled: false,
//         channel: null
//     }

//     componentDidMount() {
//         // pubnub.setUUID(this.pubnub.getUUID())
//     }

//     render() {
//         return (
//             // <Provider store={store}>
//                 <NavigationContainer>
//                     <Stack.Navigator initialRouteName="Home">
//                         <Stack.Screen name="Home" component={HomeScreen} /> */}
//                     </Stack.Navigator>
//                 </NavigationContainer>
//             // </Provider>
//             // <HomeScreen />
//         )
//     }
// }

// export default App


import React, { Component } from 'react';
import HomeScreen from "./src/screens/HomeScreen"

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//     </View>
//   );
// }

const Stack = createStackNavigator()

class App extends Component {
    render() {
        return (
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        )
    }
}

export default App;
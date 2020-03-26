import React, { Component } from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import PubNubReact from 'pubnub-react'
import HomeScreen from "./src/screens/HomeScreen"
import { processColor } from 'react-native';
import shortid from 'shortid';
import { Provider, connect } from 'react-redux';
import store from './store/configureStore'

require('dotenv').config()

const navigator = createStackNavigator(
  {
    Home: HomeScreen
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App"
    }
  }
)

const AppContainer = createAppContainer(navigator)

class App extends Component {
    state = {
        username: '',
        isPlaying: false,
        isWaiting: false,
        isDisabled: false
    }

    channel = null;


    pubnub = new PubNubReact({
        publishkey: process.env.REACT_APP_PUBLISH_KEY,
        subscribekey: process.env.REACT_APP_SUBSCRIBE_KEY,
    })

    componentDidMount() {
        this.pubnub.setUUID(this.pubnub.getUUID())
    }

    onPressCreateShortID = () => {
        let roomID = shortid.generate();
        console.log('[App] roomID: ', roomID)
    }

    render() {
        return (
            <Provider store={store}>
                <AppContainer />
            </Provider>
        )
    }
}

export default App

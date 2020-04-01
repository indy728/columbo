import React, { Component } from 'react';
import HomeScreen from "./src/screens/HomeScreen"
import CardDemo from "./src/screens/CardDemo"
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import PubNubReact from 'pubnub-react'
import PubNub from 'pubnub';
// import { PubNubProvider, usePubNub } from 'pubnub-react';
import rootReducer from './store/configureStore'

const Stack = createStackNavigator()

// const pubnub = new PubNub({
//     publishKey: 'pub-c-283cda71-52d7-491a-b150-dc7bba71a9cf',
//     subscribeKey: 'sub-c-aac4441c-6ee4-11ea-a7c4-5e95b827fd71',
//   });
  
// const channels = ['awesomeChannel'];

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunk
    )
)

class App extends Component {

    state = {
        pubnub: null
    }

    initPubnub = () => {
        const pubnub = new PubNub({
            publishkey: "pub-c-283cda71-52d7-491a-b150-dc7bba71a9cf",
            subscribekey: "sub-c-aac4441c-6ee4-11ea-a7c4-5e95b827fd71",
        })
        pubnub.setUUID(pubnub.getUUID())
        return pubnub
    }

    // constructor(props) {
    //     super(props);
    //     this.pubnub = new PubNubReact({
    //         publishKey: 'pub-c-283cda71-52d7-491a-b150-dc7bba71a9cf',
    //         subscribeKey: 'sub-c-aac4441c-6ee4-11ea-a7c4-5e95b827fd71'
    //     });
    //     this.pubnub.setUUID("myUniqueUUID");
    //     this.pubnub.init(this);
    // }

    componentDidMount() {
        this.setState({
            pubnub: this.initPubnub()
        })
    }

    render() {
        // if (this.state.pubnub) console.log('[App] pubnub: ', this.state.pubnub)
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={HomeScreen} />
                    <Stack.Screen name="CardDemo" component={CardDemo} />
                    </Stack.Navigator>
                </NavigationContainer>
            </Provider>
        )
    }
}

export default App;


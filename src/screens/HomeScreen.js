import React, { Component } from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";
import styled from 'styled-components/native'
import shortid from 'shortid'

const Wrapper = styled.View`
    /* width: 100%; */
    display: flex;
    align-items: center;

`

const HomeText = styled.Text`
    font-size: 30px;
    color: red;
    margin: 5px 0;
`

const BlueButton = styled.TouchableOpacity`
    background-color: blue;
    width: 80%;
`

const BlueButtonText = styled.Text`
    color: white;
    font-size: 20px;
    text-align: center;
`

class HomeScreen extends Component {

    state = {
        currentRoomID: ''
    }

    onCreateShortID = () => {
        let roomID = shortid.generate();
        console.log('[App] roomID: ', roomID)
        this.setState({ currentRoomID : roomID })
    }

    render() {
    const displayroomID = <Text>{this.state.currentRoomID}</Text>

        return (
            <Wrapper>
                <HomeText>HomeScreen</HomeText>

                <BlueButton
                    onPress={this.onCreateShortID}
                    >
                    <BlueButtonText>Touch Me</BlueButtonText>
                </BlueButton>
                {
                    this.state.currentRoomID !== '' &&
                    displayroomID
                }
            </Wrapper>
        )
    }
}

// const styles = StyleSheet.create({
//   text: {
//     fontSize: 30
//   }
// });

export default HomeScreen;

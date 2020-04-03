import React, { Component } from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity, Image, ImageStore } from "react-native";
import styled from 'styled-components/native'
import shortid from 'shortid'
import CardImages from '@assets/cardImg'

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

const CardImage = styled.Image`
    width: 200px;
    height: 400px;
`

class HomeScreen extends Component {

    state = {
        currentRoomID: ''
    }

    onCreateShortID = () => {
        let roomID = shortid.generate();
        // console.log('[App] roomID: ', roomID)
        this.setState({ currentRoomID : roomID })
    }

    render() {
    // console.log('[CardDemo] this.props: ', this.props)
    // console.log('[HomeScreen] CardImages.clubs: ', CardImages.spades)

    const displayroomID = <Text>{this.state.currentRoomID}</Text>

        return (
            <Wrapper>
                <HomeText>HomeScreen</HomeText>
                <BlueButton
                    onPress={() => this.props.navigation.navigate('CardDemo')}
                >
                    <BlueButtonText>Go To Cards</BlueButtonText>
                </BlueButton>
                <BlueButton
                    onPress={this.onCreateShortID}
                    >
                    <BlueButtonText>Touch Me</BlueButtonText>
                </BlueButton>
                {
                    this.state.currentRoomID !== '' &&
                    displayroomID
                }
                <CardImage source={CardImages.clubs.A} />
                <CardImage source={require('../../assets/cardImg/clubs/ace.png')} />
                <BlueButton>
                    <BlueButtonText>
                        GAY
                    </BlueButtonText>
                </BlueButton>
            </Wrapper>
        )
    }
}

export default HomeScreen;

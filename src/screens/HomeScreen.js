import React, { Component } from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity, TextInput } from "react-native";
import styled from 'styled-components/native'
import shortid from 'shortid'
import Modal from '../hoc/Modal'

const Wrapper = styled.View`
    /* width: 100%; */
    display: flex;
    align-items: center;
    flex: 1;
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

const PurpleButton = styled.TouchableOpacity`
    background-color: purple;
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
        currentRoomID: '',
        isModalVisible: false,
        playerID: '',
        numberPlayers: 0
    }

    onCreateShortID = () => {
        let roomID = shortid.generate();
        // console.log('[App] roomID: ', roomID)
        this.setState({ currentRoomID : roomID })
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }

    changeTextInputHandler = (field, text) => {
        this.setState({
            [field]: text
        })
    }

    render() {
    // console.log('[CardDemo] this.props: ', this.props)
    // console.log('[HomeScreen] CardImages.clubs: ', CardImages.spades)

    const displayroomID = <Text>{this.state.currentRoomID}</Text>

    console.log('[HomeScreen] this.state: ', this.state)

        return (
            <Wrapper>
                <HomeText>HomeScreen</HomeText>
                <BlueButton
                    onPress={() => this.props.navigation.navigate('CardDemo')}
                >
                    <BlueButtonText>Go To Cards</BlueButtonText>
                </BlueButton>
                <BlueButton
                    onPress={this.toggleModal}
                >
                    <BlueButtonText>Create Game</BlueButtonText>
                </BlueButton>
                <Modal
                    visible={this.state.isModalVisible}
                    >

                        <TextInput 
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={this.state.playerID}
                            onChangeText={text => this.changeTextInputHandler('playerID', text)}
                        />
                        <TextInput 
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={this.state.numberPlayers}
                            onChangeText={text => this.changeTextInputHandler('numberPlayers', parseInt(text))}
                        />
                        <PurpleButton
                            onPress={() => this.props.navigation.navigate('CardDemo')}
                            >
                            <BlueButtonText>create game</BlueButtonText>
                        </PurpleButton>
                        <PurpleButton
                            onPress={this.toggleModal}
                            ><BlueButtonText>cancel</BlueButtonText>
                        </PurpleButton>
                </Modal>
                    
            </Wrapper>
        )
    }
}

export default HomeScreen;

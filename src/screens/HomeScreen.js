import React, { Component } from "react";
import { connect } from 'react-redux'
import { Text, StyleSheet, View, Button, TouchableOpacity, TextInput } from "react-native";
import styled from 'styled-components/native'
import shortid from 'shortid'
import Modal from '../hoc/Modal'
import * as actions from '@store/actions'

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
    display: ${props => props.disabled ? "none" : "flex"};
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
        username: '',
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

    createGameHandler = () => {
        // this.props.onInitPlayers(1)
        this.props.onInitPlayer(this.state.username)
        this.props.onInitGame(shortid.generate())
        this.props.onInitDeck()
        this.toggleModal();
        this.props.navigation.navigate('CardDemo')
    }

    render() {

    const displayroomID = <Text>{this.state.currentRoomID}</Text>
    console.log('[HomeScreen] this.props.lobbyID: ', this.props.lobbyID)    
    const gameText = this.props.lobbyID === '' ? 'Create Game' : 'Go To Game'

        return (
            <Wrapper>
                <HomeText>HomeScreen</HomeText>
                <BlueButton
                    onPress={() => this.props.navigation.navigate('CardDemo')}
                >
                    <BlueButtonText>Go To Cards</BlueButtonText>
                </BlueButton>
                <BlueButton
                    disabled={this.props.lobbyID !== ''}
                    onPress={this.toggleModal}
                >
                    <BlueButtonText>{gameText}</BlueButtonText>
                </BlueButton>
                <Modal
                    visible={this.state.isModalVisible}
                    >
                        {/* <TextInput 
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={this.state.playerID}
                            onChangeText={text => this.changeTextInputHandler('playerID', text)}
                        /> */}
                        <TextInput 
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={this.state.username}
                            onChangeText={text => this.changeTextInputHandler('username', text)}
                        />
                        <PurpleButton
                            onPress={this.createGameHandler}
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

const mapStateToProps = state => {
    return {
        lobbyID: state.game.lobbyID
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // onInitPlayers: playerCount => dispatch(actions.initPlayers(playerCount)),
        onInitPlayer: username => dispatch(actions.initPlayer(username)),
        onInitGame: lobbyID => dispatch(actions.initGame(lobbyID)),
        onInitDeck: () => dispatch(actions.initDeck())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)

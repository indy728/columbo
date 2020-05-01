import React, { Component } from "react";
import { connect } from 'react-redux'
// import { Text, StyleSheet, View, TextInput } from "react-native";
import { Image } from 'react-native'
import { DefaultButton } from '@UI'
import styled from 'styled-components/native'
import shortid from 'shortid'
import Modal from '../hoc/Modal'
import CreateGame from '../components/CreateGame/CreateGame'
import * as actions from '@store/actions'

const Wrapper = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
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
        let goToGameText = 'go to game'
        let goToGameAction = () => this.props.navigation.navigate('CardDemo')

        if (this.props.lobbyID === '') {
            goToGameText = 'create game'
            goToGameAction = this.toggleModal
        }

        return (
            <Wrapper>
                <Modal
                    visible={this.state.isModalVisible}
                    >
                    <CreateGame 
                        createGameHandler={this.createGameHandler}
                        toggleModal={this.toggleModal}
                        />
                </Modal>

                <Image
                    source={require('@assets/cardImg/jokers/red_joker.png')} 
                    />

                <DefaultButton
                    onPress={goToGameAction}
                >
                    {goToGameText}
                </DefaultButton>
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

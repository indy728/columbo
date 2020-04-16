import React, { Component } from "react";
import { connect } from 'react-redux'
import { Text, StyleSheet, View, TextInput } from "react-native";
import { DefaultButton, DefaultForm, FormInput } from '../components/UI'
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
    const gameText = this.props.lobbyID === '' ? 'Create Game' : 'Go To Game'

        return (
            <Wrapper>
                <DefaultButton
                    onPress={() => this.props.navigation.navigate('CardDemo')}
                    >
                    Go To Cards
                </DefaultButton>
                <DefaultButton
                    disabled={this.props.lobbyID !== ''}
                    onPress={this.toggleModal}
                >
                    {gameText}
                </DefaultButton>
                <DefaultButton disabled>
                    disabled
                </DefaultButton>
                <DefaultButton hidden>
                    hidden
                </DefaultButton>
                <Modal
                    visible={this.state.isModalVisible}
                    >
                    <DefaultForm>
                        {/* <TextInput 
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={this.state.playerID}
                            onChangeText={text => this.changeTextInputHandler('playerID', text)}
                        /> */}
                        <FormInput 
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={this.state.username}
                            onChangeText={text => this.changeTextInputHandler('username', text)}
                        />
                        <DefaultButton
                            onPress={this.createGameHandler}
                            >
                            create game
                        </DefaultButton>
                        <DefaultButton
                            onPress={this.toggleModal}
                            >
                            cancel
                        </DefaultButton>
                    </DefaultForm>
                        
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

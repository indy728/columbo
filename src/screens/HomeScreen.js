import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Image } from 'react-native';
import { DefaultButton } from 'components/UI';
import styled from 'styled-components/native';
import shortid from 'shortid';
import Modal from 'hoc/Modal';
import CreateGame from 'components/CreateGame/CreateGame';
import * as actions from 'store/actions';
import PropTypes from 'prop-types';

const redJoker = require('assets/cardImg/jokers/red_joker.png');

const Wrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

class HomeScreen extends Component {
  state = {
    currentRoomID: '',
    isModalVisible: false,
    playerID: '',
    username: '',
  }

  onCreateShortID = () => {
    const roomID = shortid.generate();
    this.setState({ currentRoomID: roomID });
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }

  changeTextInputHandler = (field, text) => {
    this.setState({
      [field]: text,
    });
  }

  createGameHandler = () => {
    const {
      onInitPlayer, onInitGame, onInitDeck, navigation: { navigate },
    } = this.props;

    onInitPlayer(this.state.username);
    onInitGame(shortid.generate());
    onInitDeck();
    this.toggleModal();
    navigate('CardDemo');
  }

  render() {
    const { navigation: { navigate }, lobbyID } = this.props;
    let goToGameText = 'go to game';
    let goToGameAction = () => navigate('CardDemo');

    if (lobbyID === '') {
      goToGameText = 'create game';
      goToGameAction = this.toggleModal;
    }

    return (
      <Wrapper>
        <Modal visible={this.state.isModalVisible}>
          <CreateGame
            createGameHandler={this.createGameHandler}
            toggleModal={this.toggleModal}
          />
        </Modal>
        <Image source={redJoker}/>
        <DefaultButton onPress={goToGameAction}>
          {goToGameText}
        </DefaultButton>
      </Wrapper>
    );
  }
}

HomeScreen.propTypes = {
  onInitPlayer: PropTypes.func.isRequired,
  onInitGame: PropTypes.func.isRequired,
  onInitDeck: PropTypes.func.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  lobbyID: PropTypes.string,
};

HomeScreen.defaultProps = {
  lobbyID: '',
};

const mapStateToProps = (state) => ({
  lobbyID: state.game.lobbyID,
});

const mapDispatchToProps = (dispatch) => ({
  // onInitPlayers: playerCount => dispatch(actions.initPlayers(playerCount)),
  onInitPlayer: (username) => dispatch(actions.initPlayer(username)),
  onInitGame: (lobbyID) => dispatch(actions.initGame(lobbyID)),
  onInitDeck: () => dispatch(actions.initDeck()),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

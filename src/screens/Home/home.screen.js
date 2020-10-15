import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image} from 'react-native';
import {DefaultButton} from 'components/UI';
import styled from 'styled-components/native';
import shortid from 'shortid';
import Modal from 'hoc/Modal';
import CreateGame from 'components/CreateGame/CreateGame';
import {actions} from 'store/slices';
import {createDeck} from 'util';
import {GAME_SCREEN} from 'constants';

const redJoker = require('../../assets/cardImg/jokers/red_joker.png');

const TEXT_GO_TO_GAME = 'go to game';
const TEXT_CREATE_GAME = 'create game';

const Wrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

class HomeScreen extends Component {
  state = {
    isModalVisible: false,
  };

  onCreateShortID = () => {
    const roomID = shortid.generate();
    this.setState({currentRoomID: roomID});
  };

  toggleModal = () => {
    this.setState({isModalVisible: !this.state.isModalVisible});
  };

  createGameHandler = () => {
    const {
      initDeck,
      navigation: {navigate},
    } = this.props;

    initDeck();
    this.toggleModal();
    navigate(GAME_SCREEN);
  };

  render() {
    return (
      <Wrapper>
        <Modal visible={this.state.isModalVisible}>
          <CreateGame
            createGameHandler={this.createGameHandler}
            toggleModal={this.toggleModal}
          />
        </Modal>
        <Image source={redJoker} />
        <DefaultButton onPress={this.toggleModal}>
          {TEXT_GO_TO_GAME}
        </DefaultButton>
      </Wrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  initDeck: () => dispatch(actions.initDeck({initialDeck: createDeck()})),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

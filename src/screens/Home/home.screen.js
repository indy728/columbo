import React, {Component} from 'react';
import {connect} from 'react-redux';
import {DefaultButton} from 'components/UI';
import styled from 'styled-components/native';
import shortid from 'shortid';
import Modal from 'hoc/Modal';
import {CreateGame, HomeLogo} from './components';
import {actions} from 'store/slices';
import {initDeck as createDeck} from 'util';
import {GAME_SCREEN} from 'constants';

const TEXT_GO_TO_GAME = 'go to game';
// const TEXT_CREATE_GAME = 'create game';

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
            navigation={this.props.navigation}
            createGameHandler={this.createGameHandler}
            toggleModal={this.toggleModal}
          />
        </Modal>
        <HomeLogo />
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

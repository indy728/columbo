import React, {Component} from 'react';
import {connect} from 'react-redux';
import shortid from 'shortid';
import {HomeLayout} from './components';
import {actions} from 'store/slices';
import {initDeck as createDeck} from 'util';
import {GAME_SCREEN} from 'constants';

class HomeScreen extends Component {
  // @TODO: implement roomID for lounge/multiplayer
  onCreateShortID = () => {
    const roomID = shortid.generate();
    this.setState({currentRoomID: roomID});
  };

  createGameHandler = () => {
    const {
      initDeck,
      navigation: {navigate},
    } = this.props;

    initDeck();
    navigate(GAME_SCREEN);
  };

  render() {
    const {
      navigation: {navigate},
    } = this.props;

    return (
      <HomeLayout navigate={navigate} createGame={this.createGameHandler} />
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

import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCog, faHome} from '@fortawesome/free-solid-svg-icons';
import {Deck} from './Deck';
import {Player} from 'components/Game/Player';
import {CallButton, CardActions} from './Actions';

const Wrapper = styled.View`
  flex: 1;
  background-color: ${({
    theme: {
      palette: {grayscale},
    },
  }) => grayscale[2]};
`;

const DeckAndDiscardWrapper = styled.View`
  flex: 2;
`;

const PlayerActionsWrapper = styled.View`
  height: 110px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex: 1;
`;

const CallWrapper = styled(PlayerActionsWrapper)``;

const HandWrapper = styled.View`
  flex: 3;
`;

const FooterWrapper = styled.View`
  height: 74px;
  padding: 10px 40px;
  background-color: rgba(0, 0, 0, 0.6);
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const FooterButton = styled.TouchableOpacity`
  height: 54px;
  padding: 6px 12px;
  border-radius: 22px;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
`;

const FooterButtonText = styled.Text`
  font-size: ${({children}) => {
    const size = 16 - (children.length - 4);

    return `${Math.min(size, 16)}px`;
  }};
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;

const SettingsButton = styled.TouchableOpacity`
  height: 44px;
  width: 44px;
  border-radius: 22px;
  background: blue;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

const Footer = () => (
  <>
    <FooterButton>
      <FontAwesomeIcon
        icon={faHome}
        size={24}
        style={{
          color: 'white',
          transform: [{translateY: -1}],
        }}
      />
      <FooterButtonText>Home</FooterButtonText>
    </FooterButton>
    <FooterButton>
      <FontAwesomeIcon
        icon={faCog}
        size={24}
        style={{
          color: 'white',
        }}
      />
      <FooterButtonText>options</FooterButtonText>
    </FooterButton>
  </>
);

const GameLayout = ({setAction}) => (
  <Wrapper>
    <DeckAndDiscardWrapper>
      <Deck />
    </DeckAndDiscardWrapper>
    <PlayerActionsWrapper>
      <CardActions slap={() => setAction('slapping', true)} />
    </PlayerActionsWrapper>
    <HandWrapper>
      <Player />
    </HandWrapper>
    <CallWrapper>
      <CallButton call={() => setAction('calling', true)} />
    </CallWrapper>
    <FooterWrapper>
      <Footer />
    </FooterWrapper>
  </Wrapper>
);

export default GameLayout;

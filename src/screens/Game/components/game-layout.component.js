import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCog, faHome} from '@fortawesome/free-solid-svg-icons';
import {Deck} from './Deck';
import {Player} from 'components/Game/Player';

const Wrapper = styled.View`
  flex: 1;
  background-color: skyblue;
`;

const DeckAndDiscardWrapper = styled.View`
  flex: 2;
  background-color: green;
`;

const HandWrapper = styled.View`
  flex: 3;
  background-color: orange;
`;

const Text = styled.Text`
  color: white;
  font-size: 24px;
`;

const FooterWrapper = styled.View`
  height: 110px;
  padding: 0 40px;
  background-color: red;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HomeButton = styled.TouchableOpacity`
  height: 44px;
  width: 44px;
  border-radius: 22px;
  background: blue;
  overflow: hidden;
  align-items: center;
  justify-content: center;
`;

const TapButton = styled.TouchableOpacity`
  height: 44px;
  /* width: 44px; */
  border-radius: 22px;
  padding-horizontal: 40px;
  background: blue;
  overflow: hidden;
  align-items: center;
  justify-content: center;
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
    <HomeButton>
      <FontAwesomeIcon
        icon={faHome}
        size={24}
        style={{
          color: 'white',
          transform: [{translateY: -1}],
        }}
      />
    </HomeButton>
    <TapButton>
      <Text>Tap Now</Text>
    </TapButton>
    <SettingsButton>
      <FontAwesomeIcon
        icon={faCog}
        size={24}
        style={{
          color: 'white',
        }}
      />
    </SettingsButton>
  </>
);

const GameLayout = () => (
  <Wrapper>
    <DeckAndDiscardWrapper>
      <Deck />
    </DeckAndDiscardWrapper>
    <HandWrapper>
      <Player />
    </HandWrapper>
    <FooterWrapper>
      <Footer />
    </FooterWrapper>
  </Wrapper>
);

export default GameLayout;

import React from 'react';
import styled from 'styled-components';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCog, faHome} from '@fortawesome/free-solid-svg-icons';

const Wrapper = styled.View`
  flex: 1;
  background-color: skyblue;
`;

const DeckAndDiscardWrapper = styled.View`
  flex: 1;
  background-color: green;
`;

const HandWrapper = styled.View`
  flex: 2;
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

const GameLayout = () => (
  <Wrapper>
    <DeckAndDiscardWrapper>{/* <Deck /> */}</DeckAndDiscardWrapper>
    <HandWrapper>{/* <PlayerHand /> */}</HandWrapper>
    <FooterWrapper>
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
    </FooterWrapper>
  </Wrapper>
);

export default GameLayout;

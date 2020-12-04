import React from 'react';
import styled from 'styled-components';
import {DefaultButton} from 'components/UI';
import {SETTINGS_SCREEN} from 'constants';

const TEXT_GO_TO_GAME = 'go to game';
const TEXT_GAME_SETTINGS = 'settings';

const Wrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-top: 32px;
`;

const LogoContainer = styled.View`
  flex: 2;
  justify-content: center;
`;

const HomeButtonsContainer = styled.View`
  flex: 1;
`;

const LogoSizeWrapper = styled.View`
  height: 60%;
  width: 350px;
`;

const HomeButtonsWrapper = styled.View``;

const Image = styled.Image`
  flex: 1;
  width: null;
  height: null;
  resize-mode: contain;
`;

const redJoker = require('../../../assets/cardImg/jokers/red_joker.png');

const HomeLogo = () => <Image source={redJoker} />;

const HomeLayout = ({navigate, createGame}) => (
  <Wrapper>
    <LogoContainer>
      <LogoSizeWrapper>
        <HomeLogo />
      </LogoSizeWrapper>
    </LogoContainer>
    <HomeButtonsContainer>
      <HomeButtonsWrapper>
        <DefaultButton onPress={createGame}>{TEXT_GO_TO_GAME}</DefaultButton>
        <DefaultButton onPress={() => navigate(SETTINGS_SCREEN)} mt={'40px'}>
          {TEXT_GAME_SETTINGS}
        </DefaultButton>
      </HomeButtonsWrapper>
    </HomeButtonsContainer>
  </Wrapper>
);

export default HomeLayout;

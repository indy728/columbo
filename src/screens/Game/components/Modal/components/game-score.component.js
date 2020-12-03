import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {getHandValue} from 'util';
import {
  CARD_POINTS_MULTIPLIER,
  MAX_TURNS_POINTS,
  MAX_TIME_POINTS,
  TIME_POINTS_MULTIPLIER,
  TURNS_POINTS_MULTIPLIER,
} from 'constants';

const ScoreDetails = styled.View`
  height: 100%;
`;

const Points = styled.View`
  height: 100%;
`;

const Wrapper = styled.View`
  width: 90%;
  padding: 30px 10px;
  margin-bottom: 50px;
  background-color: ${({theme}) => theme.palette.grayscale[1]};
  align-items: center;
`;

const ScoreText = styled.Text`
  font-size: 16px;
  text-transform: uppercase;
  color: ${({theme}) => theme.palette.white[0]};
  text-align: center;
`;

const ScoreRow = styled.View`
  width: 100%;
  margin: 10px 0;
  padding: 0 15px;

  flex-flow: row;
  justify-content: space-between;
`;

const getRoundDuration = (endTime, startTime) => {
  return (+endTime - +startTime) / 1000;
};

const GameScoreDetails = ({turns, endTime, startTime, hand}) => {
  const roundDuration = getRoundDuration(endTime, startTime);
  const points = getHandValue(hand);
  const cardPoints = (5 - points) * CARD_POINTS_MULTIPLIER;
  const turnsPoints =
    points > 4 ? 0 : MAX_TURNS_POINTS - turns * TURNS_POINTS_MULTIPLIER;
  const timePoints =
    points > 4 ? 0 : MAX_TIME_POINTS - roundDuration * TIME_POINTS_MULTIPLIER;

  return (
    <Wrapper>
      <ScoreRow>
        <ScoreText>hand value: {points}</ScoreText>
        <ScoreText>{cardPoints}</ScoreText>
      </ScoreRow>
      <ScoreRow>
        <ScoreText>turns taken: {turns}</ScoreText>
        <ScoreText>{turnsPoints}</ScoreText>
      </ScoreRow>
      <ScoreRow>
        <ScoreText>time: {Math.floor(roundDuration)} seconds</ScoreText>
        <ScoreText>{timePoints}</ScoreText>
      </ScoreRow>
      <ScoreRow>
        <ScoreText>
          Total Points: {turnsPoints + timePoints + cardPoints}
        </ScoreText>
      </ScoreRow>
    </Wrapper>
  );
};

const mapStateToProps = ({
  game: {
    round: {turns, endTime, startTime},
    player: {hand},
  },
}) => ({
  turns,
  endTime,
  startTime,
  hand,
});

export default connect(mapStateToProps)(GameScoreDetails);

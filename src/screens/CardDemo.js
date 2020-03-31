import React, { Component } from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";
import styled from 'styled-components/native'
import shortid from 'shortid'
import Deck from '../components/Deck/Deck'

const Wrapper = styled.View`
    flex: 1;
    /* display: flex;
    align-items: center; */

`

const DeckWrapper = styled.View`
    flex: 1;
    background-color: salmon;
    flex-flow: row;
    align-items: center;
    justify-content: space-around;
`

const DeckCounters = styled.View`
    width: 33%;
    height: 66%;
    border: 1px solid black;
    justify-content: center;
`

const DrawButton = styled.TouchableOpacity`
    width: 33%;
    height: 66%;
    background-color: skyblue;
`

const ActionWrapper = styled.View`
    flex: 3;
    background-color: orangered;
    align-items: center;
    justify-content: space-around;
`

const CurrentCardWrapper = styled.View`
    width: 40%;
    height: 66%;
    border: 2px dashed black;
`

const PlayButton = styled.TouchableOpacity`
    width: 40%;
    height: 16.6%;
    background-color: steelblue;
`

const PlayerWrapper = styled.View`
    flex: 4;
    background-color: honeydew;
    align-items: center;
    justify-content: center;
`

const PlayerHandWrapper = styled.View`
    width: 66%;
    height: 90%;
    background-color: grey;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: space-around;
    justify-content: center;

`

const PlayerCardWrapper = styled.View`
    width: 30%;
    margin: 0 10%;
    height: 30%;
    border: 2px dashed black;

`

class CardDemo extends Component {
    state = {
        suit: null
    }

    onUpdateSuit = suit => {
        this.setState({suit})
    }

    render() {
        return (
            <Wrapper>
                <DeckWrapper>
                    <DeckCounters>
                        <Text>Draw Pile: </Text>
                        <Text>Discard Pile: </Text>
                    </DeckCounters>
                    <DrawButton>
                        <Text>Draw</Text>
                    </DrawButton>
                </DeckWrapper>
                <ActionWrapper>
                    <CurrentCardWrapper />
                    <PlayButton>
                        <Text>PLAY</Text>
                    </PlayButton>
                </ActionWrapper>
                <PlayerWrapper>
                    <PlayerHandWrapper>
                        <PlayerCardWrapper />
                        <PlayerCardWrapper />
                        <PlayerCardWrapper />
                        <PlayerCardWrapper />
                    </PlayerHandWrapper>
                </PlayerWrapper>
            </Wrapper>
        )
    }
}

export default CardDemo;

import React, { Component } from "react";
import { connect } from 'react-redux'
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";
import styled from 'styled-components/native'
import shortid from 'shortid'
import Deck from '../components/Deck/Deck'
import { initCards, shuffleCards } from '../components/Deck/util/cardUtil'
import Card from '../components/Deck/Card/Card'
import * as actions from '../../store/actions'
// import Spinner from 'react-native-spinkit'

const Wrapper = styled.View`
    flex: 1;
    /* display: flex;
    align-items: center; */

`

const DeckWrapper = styled.View`

`

const DeckCounters = styled.View`
    width: 33%;
    height: 66%;
    border: 1px solid black;
    justify-content: center;
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
        built: false
    }

    componentDidMount() {
        // this.initDrawPile()
        this.setState({ built: true })
    }

    initDrawPile = () => {
        const suits = [
            'spades',
            'hearts',
            'diamonds',
            'clubs',
        ]
        let drawPile = []
        
        suits.forEach(suit => {
            drawPile = drawPile.concat(initCards(suit))
        })
        drawPile = shuffleCards(drawPile)
        this.props.onInitDeck(drawPile)
    }

    render() {
        let gameCenter = (
            // <Spinner 
            //     color={"red"}
            //     size={37}
            //     type={"CircleFlip"}
            //     />
            <Text>"SPINNER"</Text>
        )
        if (this.state.built) {
            const { drawPile, discardPile, currentCard } = this.props.game
            let cardDetails = null
            let currentCardRender = <CurrentCardWrapper />
            if (currentCard) {
                cardDetails = currentCard.props.cardDetails
                currentCardRender = (
                    <CurrentCardWrapper>
                        <Text>{cardDetails.value}</Text>
                        <Text>{cardDetails.suit}</Text>
                        <Text>{cardDetails.action}</Text>
                    </CurrentCardWrapper>
                )

            }
            
            gameCenter = (
                <React.Fragment>
                    <Text>Draw Pile: {drawPile.length}</Text>
                    <Text>Discard Pile: {discardPile.length}</Text>
                    <Deck />
                <ActionWrapper>
                    {currentCardRender}
                    <PlayButton
                        onPress={() => this.props.onPlay(currentCard)}
                        >
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
                </React.Fragment>
            )
        }

        return (
            <Wrapper>
                {gameCenter}
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        game: state.game
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onInitDeck: deck => dispatch(actions.initDeck(deck)),
        onUpdatePhase: phase => dispatch(actions.updatePhase(phase)),
        onPlay: card => dispatch(actions.playCard(card)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDemo)

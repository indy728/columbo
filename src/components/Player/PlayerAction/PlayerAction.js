import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '@store/actions'
import * as storeVariables from '@store/storeVariables'
import styled from 'styled-components'
import Card from '../../Deck/Card/Card'
import cardImg from '@assets/cardImg'


const Wrapper = styled.View`
    flex: 3;
    background-color: orangered;
    align-items: center;
    justify-content: space-around;
`

const CurrentCardWrapper = styled.View`
    width: 124px;
    height: 176px;
    border: 2px dashed black;
`

const PlayButton = styled.TouchableOpacity`
    width: 40%;
    height: 16.6%;
    background-color: steelblue;
`

const DeckCounter = styled.Text`

`

class PlayerAction extends Component {
    
    render() {
        const { currentCard, drawPile, discardPile } = this.props
        let currentCardRender = <CurrentCardWrapper />
        
        if (currentCard) {
            const { value, suit } = currentCard
            currentCardRender = (
                <CurrentCardWrapper>
                    <Card 
                        source={cardImg[suit][value]}
                    />
                </CurrentCardWrapper>
            )
        }

        return (
            <Wrapper>
                <DeckCounter>Draw Pile: {drawPile.length}</DeckCounter>
                <DeckCounter>Discard Pile: {discardPile.length}</DeckCounter>
                {currentCardRender}
                <PlayButton
                    onPress={() => {
                        return this.props.phase === storeVariables.PHASE_PLAY ?
                            this.props.onPlay(currentCard) : null
                    }}
                    >
                    <Text>PLAY</Text>
                </PlayButton>
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        phase: state.game.phase,
        currentCard: state.deck.currentCard,
        drawPile: state.deck.drawPile,
        discardPile: state.deck.discardPile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdatePhase: phase => dispatch(actions.updatePhase(phase)),
        onPlay: card => dispatch(actions.playCard(card)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerAction)

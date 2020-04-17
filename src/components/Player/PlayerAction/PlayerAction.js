import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '@store/actions'
import * as storeVariables from '@store/storeVariables'
import styled from 'styled-components'
import Card from '../../Deck/Card/Card'
import cardImg from '@assets/cardImg'
import { DefaultButton } from '@UI'


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

const DeckCounter = styled.Text`

`

const ActionButtonsWrapper = styled.View`
    width: 100%;
    flex-flow: row;
    justify-content: space-around;
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
                <ActionButtonsWrapper>
                    <DefaultButton
                        disabled={this.props.phase !== storeVariables.PHASE_PLAY}
                        onPress={() => this.props.onPlay(currentCard)}
                        width={175}
                        >
                        PLAY
                    </DefaultButton>
                    <DefaultButton
                        disabled={this.props.phase !== storeVariables.PHASE_PLAY}
                        onPress={() => this.props.onUpdatePhase(storeVariables.PHASE_SWAP)}
                        width={175}
                        >
                        SWAP
                    </DefaultButton>
                </ActionButtonsWrapper>
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

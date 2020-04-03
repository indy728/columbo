import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Text } from 'react-native'
import { initDeck, shuffleCards } from './util/cardUtil'
import Card from './Card/Card'
import * as actions from '../../../store/actions'


const Wrapper = styled.View`
    flex: 1;
    background-color: salmon;
    flex-flow: row;
    align-items: center;
    justify-content: space-around;
`

const DrawPile = styled.TouchableOpacity`
    width: 33%;
    height: 66%;
    background-color: skyblue;
`

const DiscardPile = styled.TouchableOpacity`
    width: 33%;
    height: 66%;
    background-color: whitesmoke;
`

class Deck extends Component {

    state = {
    }

    componentDidMount() {
        if (!this.props.game.deckBuilt) {
            this.props.onInitDeck(shuffleCards(initDeck()))
        }
    }
    
    render() {
        let deck = null

        if (this.props.game.deckBuilt){
            const { drawPile, discardPile, currentCard } = this.props.game
            let discardPileText = <Text>"EMPTY"</Text>

            if (discardPile.length) {
                console.log('[Deck] discardPile: ', discardPile)
                discardPileText = (
                    <React.Fragment>
                        <Text>{discardPile[0].props.cardDetails.value}</Text>
                        <Text>{discardPile[0].props.cardDetails.suit}</Text>
                    </React.Fragment>
                )
            }
            deck = (
                <React.Fragment>
                    <DrawPile
                        onPress={() => this.props.onDrawCard("draw-pile")}
                        >
                        <Text>Draw</Text>
                    </DrawPile>
                    <DiscardPile
                        onPress={() => this.props.onDrawCard("discard-pile")}
                        >
                        {discardPileText}
                    </DiscardPile>
                </React.Fragment>
            )
        }
        return (
            <Wrapper>
                {deck}
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
        onDrawCard: card => dispatch(actions.drawCard(card)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Deck)
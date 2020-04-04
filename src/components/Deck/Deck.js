import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Text } from 'react-native'
import { initDeck, shuffleCards } from './util/cardUtil'
import styled from 'styled-components'
import * as actions from '../../../store/actions'
import Pile from './Pile/Pile'
import { CardBack, CardFace } from '../UI'

const Wrapper = styled.View`
    flex: 1;
    background-color: salmon;
    flex-flow: row;
    align-items: center;
    justify-content: space-around;
`

class Deck extends Component {

    componentDidMount() {
        if (!this.props.game.deckBuilt) {
            this.props.onInitDeck(shuffleCards(initDeck()))
        }
    }
    
    render() {
        let deck = null
        const { drawPile, discardPile } = this.props.game

        return (
            <Wrapper>
                <Pile
                    cardComponent={CardBack}
                    pile={drawPile}
                    pressed={() => this.props.onDrawCard("draw-pile")}
                    />
                <Pile
                    cardComponent={CardFace}
                    pile={discardPile}
                    pressed={() => this.props.onDrawCard("discard-pile")}
                    />
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
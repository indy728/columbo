import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { initDeck, shuffleCards } from './util/cardUtil'
import styled from 'styled-components'
import * as actions from '../../../store/actions'
import * as storeVariables from '@store/storeVariables'
import Pile from './Pile/Pile'

const Wrapper = styled.View`
    flex: 1.5;
    background-color: salmon;
    flex-flow: row;
    align-items: center;
    justify-content: space-around;
`

class Deck extends Component {

    componentDidMount() {
    }

    pileClickedHandler = pile => {
        return this.props.phase === storeVariables.PHASE_DRAW ?
            this.props.onDrawCard(pile) : null
    }
    
    render() {
        const { drawPile, discardPile } = this.props

        return (
            <Wrapper>
                <Pile
                    face={false}
                    pile={drawPile}
                    pressed={() => this.pileClickedHandler(storeVariables.DRAW_PILE)}
                    />
                <Pile
                    face={true}
                    pile={discardPile}
                    pressed={() => this.pileClickedHandler(storeVariables.DISCARD_PILE)}
                    />
            </Wrapper>
        )
    }
}


const mapStateToProps = state => {
    return {
        drawPile: state.deck.drawPile,
        discardPile: state.deck.discardPile,
        deckBuilt: state.deck.deckBuilt,
        phase: state.game.phase
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
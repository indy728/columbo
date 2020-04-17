import React, { Component } from "react";
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import Deck from '../components/Deck/Deck'
import PlayerAction from '../components/Player/PlayerAction/PlayerAction'
import Player from '../components/Player/Player'
import PlayerHand from '../components/Player/PlayerHand/PlayerHand'
import Modal from '../hoc/Modal'
import { DefaultButton } from "../components/UI";
import { updateObject } from '../../shared/objectUtility'
import * as actions from '@store/actions'
import * as storeVariables from '@store/storeVariables'

const Wrapper = styled.View`
    flex: 1;
`

class CardDemo extends Component {

    state = {

    }

    componentDidMount() {

    }

    findFirstEmptyCardSlot = hand => {
        let i = 0

        while (i < hand.length) {
            let j = 0
            while (j < 2) {
                if (!hand[i][j]) {
                    return ([i, j])
                }
                j++
            }
            i++
        }
        return null
    }

    dealCardsHandler = () => {
        const { drawPile, player } = this.props
        const { hand } = player

        for (let i = 0; i < 4; i++) {
            let firstEmptyCardSlot = this.findFirstEmptyCardSlot(hand)
            let card = drawPile.shift()

            if (!firstEmptyCardSlot) {
                hand.push([card, null])
            } else {
                hand[firstEmptyCardSlot[0]][firstEmptyCardSlot[1]] = card
            }
        }

        const updatedPlayer = updateObject(player, { hand })

        this.props.onDealCards(drawPile, updatedPlayer)
    }

    swapCardsHandler = (cardLocationArray) => {
        const { player, discardPile, currentCard } = this.props
        const { hand } = player
        const col = cardLocationArray[0]
        const row = cardLocationArray[1]

        discardPile.unshift(hand[col][row])
        hand[col][row] = currentCard

        this.props.onSwapCards(discardPile, updateObject(player, { hand }))
    }

    render() {
        let modalContent = null

        if (!this.props.isDealt) {
            modalContent = (
                <DefaultButton
                    onPress={this.dealCardsHandler}
                    >
                    deal
                </DefaultButton>
            )
        } else if (this.props.phase === storeVariables.PHASE_SWAP) {
            modalContent = (
                <PlayerHand 
                    hand={this.props.player.hand}
                    pressed={this.swapCardsHandler}
                    />
            )
        }

        const modalVisible = modalContent !== null

        return (
            <Wrapper>
                <Modal visible={modalVisible}>
                    {modalContent}
                </Modal>
                <Deck />
                <PlayerAction />
                <Player />
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        drawPile: state.deck.drawPile,
        discardPile: state.deck.discardPile,
        currentCard: state.deck.currentCard,
        player: state.game.player,
        isDealt: state.game.isDealt,
        phase: state.game.phase,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDealCards: (drawPile, player) => dispatch(actions.dealCards(drawPile, player)),
        onSwapCards: (discard, player) => dispatch(actions.swapCards(discard, player))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDemo)

import React, { Component } from "react";
import { connect } from 'react-redux'
import styled from 'styled-components/native'
import Deck from '../components/Deck/Deck'
import PlayerAction from '../components/Player/PlayerAction/PlayerAction'
import Player from '../components/Player/Player'
import Modal from '../hoc/Modal'
import { DefaultButton } from "../components/UI";
import { updateObject } from '../../shared/objectUtility'
import * as actions from '@store/actions'

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
        let j = 0

        while (i < hand.length) {
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
        const card = drawPile.shift()
        const firstEmptyCardSlot = this.findFirstEmptyCardSlot(hand)
        
        if (!firstEmptyCardSlot) {
            hand.push([card, null])
        } else {
            hand[firstEmptyCardSlot[0]][firstEmptyCardSlot[1]] = card
        }

        // update deck
        // update player hand

        console.log('[CardDemo] firstEmptyCardSlot: ', firstEmptyCardSlot)
        console.log('[CardDemo] hand: ', hand)
        const updatedPlayer = updateObject(player, { hand })
        // console.log('[CardDemo] player, hand: ', player, hand)
        console.log('[CardDemo] player: ', updatedPlayer)
        this.props.onDealCards(drawPile, updatedPlayer)
    }

    render() {
        const modal = null

        // if (this.props.isDealt) {
        //     modal = (
        //         <Modal>

        //         </Modal>
        //     )
        // }
        console.log('[CardDemo] this.props.isDealt: ', this.props.isDealt)

        return (
            <Wrapper>
                <Modal visible={!this.props.isDealt}>
                    <DefaultButton
                        onPress={this.dealCardsHandler}
                        >
                        deal
                    </DefaultButton>
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
        player: state.game.player,
        isDealt: state.game.isDealt
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDealCards: (drawPile, player) => dispatch(actions.dealCards(drawPile, player))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CardDemo)

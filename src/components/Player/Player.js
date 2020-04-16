import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'
import cardImg from '@assets/cardImg'
import Card from '../../components/Deck/Card/Card'
import * as actions from '../../../store/actions'

const Wrapper = styled.View`
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
    width: 62px;
    height: 88px;
    border: 2px dashed black;

`

class Player extends Component {
    state = {
    }

    componentDidMount() {
        // const { drawPile } = this.props
        // const initialHand = []
        
        // for (let i = 0; i < 2; i++){
        //     const row = []
        //     for (let j = 0; j< 2; j++) {
        //         row.unshift(drawPile.shift())
        //     }
        //     initialHand.unshift(row)
        // }

        // this.props.onDealFromDeck(drawPile)
        // this.props.onDealToPlayer(initialHand, "0")

        console.log('[Player] here again: ')
    }

    initPlayer = (id = 'kyle') => {

    }

    render() {
        const { drawPile, deckBuilt } = this.props
        let cards = []
        console.log('[Player] this.props.player: ', this.props.player)

        // if (this.state.id !== '') {
        //     this.state.hand.forEach(cardRow => {
        //         cardRow.forEach(card => {
        //             const { value, suit } = card

        //             cards.unshift(
        //                 <PlayerCardWrapper>
        //                     <Card
        //                         key={value + suit}
        //                         // onPress={props.pressed}
        //                         source={cardImg[suit][value]}
        //                         >
        //                     </Card>
        //                 </PlayerCardWrapper>
        //             )
        //         })
        //     })
        // }

        return (
            <Wrapper>
                <PlayerHandWrapper>
                    {/* <Text>{this.props.player.username}</Text> */}
                    <Text>{this.props.lobbyID}</Text>
                    {cards}
                </PlayerHandWrapper>
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        drawPile: state.deck.drawPile,
        deckBuilt: state.deck.deckBuilt,
        players: state.game.players,
        player: state.game.player,
        lobbyID: state.game.lobbyID
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDealFromDeck: drawPile => dispatch(actions.updateDeck(drawPile)),
        onAddToHand: (card, id) => dispatch(actions.addCard(card, id)),
        onDealToPlayer: (hand, id) => dispatch(actions.updateHand(hand, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
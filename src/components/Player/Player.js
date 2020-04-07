import React, { Component } from 'react'
import { View } from 'react-native'
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
        id: '',
        hand: [],
        cumulativePoints: 0
    }

    componentDidMount() {
        // this.initPlayer()
    }

    initPlayer = (id = 'kyle') => {
        
        const { drawPile } = this.props
        const initialHand = []
        
        for (let i = 0; i < 2; i++){
            const row = []
            for (let j = 0; j< 2; j++) {
                row.unshift(drawPile.shift())
            }
            initialHand.unshift(row)
        }

        this.props.onDealCard(drawPile)
        this.setState({
            id,
            hand: initialHand
        })
    }

    render() {
        const { drawPile, deckBuilt } = this.props
        let cards = []

        if (deckBuilt && this.state.id === '') {
            this.initPlayer()
        }

        if (this.state.id !== '') {
            this.state.hand.forEach(cardRow => {
                cardRow.forEach(card => {
                    const { value, suit } = card

                    cards.unshift(
                        <PlayerCardWrapper>
                            <Card
                                key={value + suit}
                                // onPress={props.pressed}
                                source={cardImg[suit][value]}
                                >
                            </Card>
                        </PlayerCardWrapper>
                    )
                })
            })
        }

        return (
            <Wrapper>
                <PlayerHandWrapper>
                    {cards}
                </PlayerHandWrapper>
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        drawPile: state.game.drawPile,
        deckBuilt: state.game.deckBuilt
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onDealCard: drawPile => dispatch(actions.updateDeck(drawPile)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
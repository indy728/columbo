import React, { Component } from 'react'
import styled from 'styled-components'
import { View, TouchableOpacity, Text } from 'react-native'
import { initCards, shuffleCards } from './util/cardUtil'
import Card from './Card/Card'


const Wrapper = styled.View`
    width: 80%;
    height: 200px;
    background-color: red;

`

const Piles = styled.View`
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: space-around;
`

const Pile = styled.TouchableOpacity`
    width: 100px;
    height: 190px;
    border: 1px solid black;

    display: flex;
    
`

class Deck extends Component {

    state = {
        drawPile: [],
        discardPile: [],
        currentCard: null
    }

    componentDidMount() {
        this.initDrawPile()
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
        this.setState({ drawPile })
    }

    drawAndDiscard = () => {
        const { drawPile, discardPile, currentCard } = this.state

        const drawnCard = drawPile.shift()
        if (currentCard) {
            discardPile.unshift(currentCard)
        }
        this.setState({
            drawPile,
            discardPile,
            currentCard: drawnCard
        })
    }
    
    render() {
        const drawPile = (
            <Pile 
                onPress = {this.drawAndDiscard}
            >
                <Text>Draw Pile</Text>
                <Text>Count: {this.state.drawPile.length}</Text>
            </Pile>
        )

        const discardPile = (
            <Pile>
                <Text>Discard Pile</Text>
                <Text>Count: {this.state.discardPile.length}</Text>
            </Pile>
        )

        return (
            <Wrapper>
                <Piles>
                    {drawPile}
                    {discardPile}
                </Piles>
                {this.state.currentCard}
            </Wrapper>
        )
    }
}

export default Deck
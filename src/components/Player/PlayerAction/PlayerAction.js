import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../../../store/actions'
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

class PlayerAction extends Component {
    
    render() {
        const { currentCard } = this.props
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
                {currentCardRender}
                <PlayButton
                    onPress={() => this.props.onPlay(currentCard)}
                    >
                    <Text>PLAY</Text>
                </PlayButton>
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentCard: state.game.currentCard
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdatePhase: phase => dispatch(actions.updatePhase(phase)),
        onPlay: card => dispatch(actions.playCard(card)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerAction)

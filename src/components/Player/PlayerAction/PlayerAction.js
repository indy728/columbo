import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../../../store/actions'
import styled from 'styled-components'

const Wrapper = styled.View`
    flex: 3;
    background-color: orangered;
    align-items: center;
    justify-content: space-around;
`

const CurrentCardWrapper = styled.View`
    width: 40%;
    height: 66%;
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
        let cardDetails = null
        let currentCardRender = <CurrentCardWrapper />
        
        if (currentCard) {
            cardDetails = currentCard.props.cardDetails
            currentCardRender = (
                <CurrentCardWrapper>
                    <Text>{cardDetails.value}</Text>
                    <Text>{cardDetails.suit}</Text>
                    <Text>{cardDetails.action}</Text>
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

import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'
import cardImg from '@assets/cardImg'
import Card from '../../components/Deck/Card/Card'
import PlayerHand from './PlayerHand/PlayerHand'
import * as actions from '@store/actions'
import * as storeVariables from '@store/storeVariables'

const Wrapper = styled.View`
    flex: 4;
    background-color: honeydew;
    align-items: center;
    justify-content: center;
    position: relative;
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

const ShowPoints = styled.View`
    position: absolute;
    top: 0;
    left: 0;
`

class Player extends Component {
    state = {
    }

    initPlayer = (id = 'kyle') => {

    }

    render() {
        let playerHand = null
        if (this.props.isDealt) {
            playerHand = (
                <PlayerHand
                    hand={this.props.player.hand} 
                    pressed={null}
                    />
            )
        }

        return (
            <Wrapper>
                <ShowPoints><Text>Total Points: {this.props.player.totalPoints}</Text></ShowPoints>
                {playerHand}
            </Wrapper>
        )
    }
}

const mapStateToProps = state => {
    return {
        player: state.game.player,
        isDealt: state.game.isDealt
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdatePhase: phase => dispatch(actions.updatePhase(phase))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)
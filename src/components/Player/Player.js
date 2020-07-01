import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import styled from 'styled-components'
import PlayerHand from './PlayerHand/PlayerHand'
import { ActionButton } from '@UI'
import * as actions from '@store/actions'

const Wrapper = styled.View`
    flex: 4;
    align-items: center;
    justify-content: space-around;
    position: relative;
`

const TapButtonWrapper = styled.View`
    /* position: absolute;
    bottom: 0px;
    left: 10px; */
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
                {playerHand}
                <TapButtonWrapper>
                    <ActionButton
                        onPress={this.props.tappingHandler}
                        >
                        tap
                        </ActionButton>
                </TapButtonWrapper>
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
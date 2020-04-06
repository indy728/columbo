import React from "react";
import styled from 'styled-components/native'
import Deck from '../components/Deck/Deck'
import PlayerAction from '../components/Player/PlayerAction/PlayerAction'
import PlayerHand from '../components/Player/PlayerHand/PlayerHand'

const Wrapper = styled.View`
    flex: 1;
`

const CardDemo = () => {

    return (
        <Wrapper>
            <Deck />
            <PlayerAction />
            <PlayerHand />
        </Wrapper>
    )
}

export default CardDemo

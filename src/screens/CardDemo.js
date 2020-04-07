import React from "react";
import styled from 'styled-components/native'
import Deck from '../components/Deck/Deck'
import PlayerAction from '../components/Player/PlayerAction/PlayerAction'
import Player from '../components/Player/Player'

const Wrapper = styled.View`
    flex: 1;
`

const CardDemo = () => {

    return (
        <Wrapper>
            <Deck />
            <PlayerAction />
            <Player />
        </Wrapper>
    )
}

export default CardDemo

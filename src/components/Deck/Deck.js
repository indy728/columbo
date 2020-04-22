import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import * as storeVariables from '@store/storeVariables'
import Pile from './Pile/Pile'

const Wrapper = styled.View`
    flex: 1.5;
    flex-flow: row;
    align-items: center;
    justify-content: space-around;
`

const DeckCounters = styled.View`
    width: 100%;
    flex-flow: row;
    justify-content: space-between;
    position: absolute;
    top: 0;
    left: 0;
`

const deck = props => {

    return (
        <Wrapper>
            <DeckCounters>
                <Text>Draw Pile: {props.drawPile.length}</Text>
                <Text>Discard Pile: {props.discardPile.length}</Text>
            </DeckCounters>
            <Pile
                face={false}
                pile={props.drawPile}
                pressed={() => props.pileClickedHandler(storeVariables.DRAW_PILE)}
                />
            <Pile
                face={true}
                pile={props.discardPile}
                pressed={() => props.pileClickedHandler(storeVariables.DISCARD_PILE)}
                />
        </Wrapper>
    )
}

export default deck
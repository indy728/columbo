import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import Pile from './Pile/Pile'
import * as storeVariables from '@store/storeVariables'

const Wrapper = styled.View`
    flex: 1.5;
    flex-flow: row;
    align-items: center;
    justify-content: space-around;
`

const deck = props => {
    return (
        <Wrapper>
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
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
    const discardPileClickedHandler = props.singlePlayer ?
        null : () => props.pileClickedHandler(storeVariables.DISCARD_PILE)

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
                pressed={discardPileClickedHandler}
                />
        </Wrapper>
    )
}

export default deck
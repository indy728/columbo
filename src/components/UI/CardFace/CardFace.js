import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import styled from 'styled-components'
import cardImg from '@assets/cardImg'

const Wrapper = styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    background-color: white;
    padding: 2%;
    position: absolute;
    top: 0;
    left: 0;
`

const CardFace = props => {
    const { cardDetails } = props.card.props
    const { value, suit } = cardDetails

    return (
        <Wrapper {...props}>
            <Image
                style={{
                    flex: 1,
                    // alignSelf: 'stretch',
                    height: undefined, 
                    width: undefined,
                    // transform: [{ rotate: '90deg' }]
                }}
                source={cardImg[suit][value]} 
                resizeMode="cover"
                />
        </Wrapper>
    )
}

export default CardFace;

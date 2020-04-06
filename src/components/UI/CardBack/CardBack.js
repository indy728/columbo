import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import styled from 'styled-components'

const Wrapper = styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    /* padding: 3px; */
    /* background-color: lightgreen; */
    position: absolute;
    top: 0;
    left: 0;
`

const CardBack = props => {
    return (
        <Wrapper {...props}>
            <Image
                style={{
                    flex: 1,
                    height: undefined, 
                    width: undefined,
                }}
                source={require('@assets/cardImg/back.png')} 
                resizeMode="cover"
                />
        </Wrapper>
    )
}

export default CardBack
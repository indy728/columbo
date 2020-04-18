import React from 'react'
import { TouchableOpacity, Image } from 'react-native'
import styled from 'styled-components'

const Wrapper = styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    background-color: white;
    padding: 2%;
    position: absolute;
    top: 0;
    left: 0;
    border: ${({ selected }) => selected ? '4px solid red' : 'none'};
`

const CardImage = styled.Image`
    flex: 1;
    height: undefined; 
    width: undefined;
`

const Card = props => {
    return (
        <Wrapper {...props}>
            <CardImage
                source={props.source} 
                resizeMode="cover"
                />
        </Wrapper>
    )
}

export default Card;

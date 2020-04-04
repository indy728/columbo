import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.TouchableOpacity`
    width: 100%;
    height: 100%;
    padding: 3px;
    background-color: lightgreen;
    position: absolute;
    top: 0;
    left: 0;
`

const CardBack = props => <Wrapper {...props} />

export default CardBack
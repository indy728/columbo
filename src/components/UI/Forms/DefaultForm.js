import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'

const Wrapper = styled.View`
    width: 90%;
    height: 90%;
    margin: 10%;
    border: 2px solid black;
    background-color: red;
    align-items: center;
`

const defaultForm = props => {
    return (
        <Wrapper { ...props} />
    )
}

export default defaultForm
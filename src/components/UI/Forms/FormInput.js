import React from 'react'
import { TextInput } from 'react-native'
import styled from 'styled-components'

const Wrapper = styled.TextInput`
    height: 50px;
    width: 240px;
    border: 2px solid grey;
    background-color: white;
`

const formInput = props => {
    return <Wrapper { ...props } />
}

export default formInput
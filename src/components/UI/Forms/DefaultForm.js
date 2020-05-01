import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'

const Wrapper = styled.View`
    width: 90%;
    margin: 20px;
    padding: 20px 10px;
    border: 2px solid ${({ theme }) => theme.palette.grayscale[1]};
    background-color: ${({ theme }) => theme.palette.grayscale[4]};
    align-items: center;
`

const defaultForm = props => {
    return (
        <Wrapper { ...props} />
    )
}

export default defaultForm
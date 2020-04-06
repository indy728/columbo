import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import * as actions from '../../../../store/actions'
import styled from 'styled-components'

const PlayerWrapper = styled.View`
    flex: 4;
    background-color: honeydew;
    align-items: center;
    justify-content: center;
`

const PlayerHandWrapper = styled.View`
    width: 66%;
    height: 90%;
    background-color: grey;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: space-around;
    justify-content: center;

`

const PlayerCardWrapper = styled.View`
    width: 30%;
    margin: 0 10%;
    height: 30%;
    border: 2px dashed black;

`

class PlayerHand extends Component {

    render() {

        return (
            <PlayerWrapper>
                <PlayerHandWrapper>
                    <PlayerCardWrapper />
                    <PlayerCardWrapper />
                    <PlayerCardWrapper />
                    <PlayerCardWrapper />
                </PlayerHandWrapper>
            </PlayerWrapper>
        )
    }
}

export default connect(null, null)(PlayerHand)
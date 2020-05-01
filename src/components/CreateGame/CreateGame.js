import React from 'react'
import styled from 'styled-components'
import { DefaultButton, DefaultForm, FormInput } from '@UI'
import { Picker } from 'react-native'

const createGame = props => {
    return (
        <DefaultForm>
            {/* <Picker>
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
            </Picker>
            <FormInput 
                autoCapitalize="none"
                autoCorrect={false}
                // value={this.state.username}
                // onChangeText={text => this.changeTextInputHandler('username', text)}
            /> */}
            <DefaultButton
                onPress={props.createGameHandler}
                disabled={props.disabled}
                >
                launch game
            </DefaultButton>
            <DefaultButton
                onPress={props.toggleModal}
                >
                cancel
            </DefaultButton>
        </DefaultForm>
    )
}

export default createGame
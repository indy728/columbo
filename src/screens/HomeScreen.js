import React from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";
import styled from 'styled-components/native'

const Wrapper = styled.View`
    /* width: 100%; */
    display: flex;
    align-items: center;

`

const HomeText = styled.Text`
    font-size: 30px;
    color: red;
    margin: 5px 0;
`

const BlueButton = styled.TouchableOpacity`
    background-color: blue;
    width: 80%;
`

const BlueButtonText = styled.Text`
    color: white;
    font-size: 20px;
    text-align: center;
`


const HomeScreen = () => {
  return (
        <Wrapper>
            <HomeText>HomeScreen</HomeText>
            <BlueButton
                onPress={() => console.log("you touched the boob")}
                // title="Touch me"
                >
                <BlueButtonText>Touch Me</BlueButtonText>
            </BlueButton>
        </Wrapper>
    );
};

// const styles = StyleSheet.create({
//   text: {
//     fontSize: 30
//   }
// });

export default HomeScreen;

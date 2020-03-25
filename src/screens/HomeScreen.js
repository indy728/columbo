import React from "react";
import { Text, StyleSheet } from "react-native";
import styled from 'styled-components/native'

const HomeText = styled.Text`
    font-size: 30px;
    color: red;
`

const HomeScreen = () => {
  return (
        <HomeText>HomeScreen</HomeText>
    );
};

// const styles = StyleSheet.create({
//   text: {
//     fontSize: 30
//   }
// });

export default HomeScreen;

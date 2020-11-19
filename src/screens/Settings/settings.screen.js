import React, {Component} from 'react';
import styled from 'styled-components';
import {SettingsForm} from './components';

const Wrapper = styled.View`
  padding: 40px 20px;
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  top: 40px;
  left: 0;
  padding: 10px;
  border: 1px solid blue;
  border-radius: 4px;
`;

const ButtonText = styled.Text`
  color: blue;
`;

class Settings extends Component {
  render() {
    return (
      <Wrapper>
        <BackButton onPress={this.props.navigation.goBack} title="Back">
          <ButtonText>{'<'}</ButtonText>
        </BackButton>
        <SettingsForm />
      </Wrapper>
    );
  }
}

export default Settings;

import React, {Component} from 'react';
import styled from 'styled-components';
import {SettingsForm} from './components';

const Wrapper = styled.View`
  padding: 40px 20px;
  flex: 1;
`;

class Settings extends Component {
  render() {
    return (
      <Wrapper>
        <SettingsForm goBack={this.props.navigation.goBack} />
      </Wrapper>
    );
  }
}

export default Settings;

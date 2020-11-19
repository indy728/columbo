import React, {Component} from 'react';
import styled from 'styled-components';
import {SettingsForm} from './components';

const Wrapper = styled.View``;

class Settings extends Component {
  render() {
    return (
      <Wrapper>
        <SettingsForm />
      </Wrapper>
    );
  }
}

export default Settings;

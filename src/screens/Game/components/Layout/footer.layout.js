/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCog, faHome} from '@fortawesome/free-solid-svg-icons';
import {FooterWrapper, FooterButton, FooterButtonText} from './styles';
import {HOME_SCREEN, SETTINGS_SCREEN} from 'constants';

const Footer = () => {
  const {navigate} = useNavigation();

  return (
    <FooterWrapper>
      <FooterButton
        onPress={() => {
          navigate(HOME_SCREEN);
        }}>
        <FontAwesomeIcon
          icon={faHome}
          size={24}
          style={{
            color: 'white',
            transform: [{translateY: -1}],
          }}
        />
        <FooterButtonText>Home</FooterButtonText>
      </FooterButton>
      <FooterButton onPress={() => navigate(SETTINGS_SCREEN)}>
        <FontAwesomeIcon
          icon={faCog}
          size={24}
          style={{
            color: 'white',
          }}
        />
        <FooterButtonText>options</FooterButtonText>
      </FooterButton>
    </FooterWrapper>
  );
};

export default Footer;

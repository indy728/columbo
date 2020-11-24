import styled from 'styled-components';
import {MIN_TOUCHABLE} from 'constants';

export const Wrapper = styled.View`
  width: ${({width = '100%'}) => width};
  flex-flow: ${({flow = 'row'}) => flow};
  justify-content: ${({justify = 'space-evenly'}) => justify};
`;

export const RadioOpacity = styled.TouchableOpacity`
  padding: ${({padding = '5px'}) => padding};
  border-radius: ${({radius}) => radius};
  justify-content: ${({justify = 'center'}) => justify};
  align-items: ${({align = 'center'}) => align};
  min-width: ${({minWidth = MIN_TOUCHABLE}) => minWidth};
  min-height: ${({minHeight = MIN_TOUCHABLE}) => minHeight};

  ${({active, border = '1px solid black'}) => {
    return `${active && `border: ${border};`}`;
  }}
`;

export const RadioText = styled.Text`
  color: ${({active}) => (active ? 'black' : 'gray')};
  font-weight: ${({active}) => (active ? 'bold' : 'normal')};
  font-size: ${({fsize = '20px'}) => fsize};
`;

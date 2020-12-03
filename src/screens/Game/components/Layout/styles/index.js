import styled from 'styled-components';

export const FooterWrapper = styled.View`
  height: 74px;
  padding: 10px 40px;
  background-color: rgba(0, 0, 0, 0.6);
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

export const FooterButton = styled.TouchableOpacity`
  height: 54px;
  padding: 6px 12px;
  border-radius: 22px;
  overflow: hidden;
  align-items: center;
  justify-content: space-between;
`;

export const FooterButtonText = styled.Text`
  font-size: ${({children}) => {
    const size = 16 - (children.length - 4);

    return `${Math.min(size, 16)}px`;
  }};
  font-weight: bold;
  color: #fff;
  text-transform: uppercase;
`;

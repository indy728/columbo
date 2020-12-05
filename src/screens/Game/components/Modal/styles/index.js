import styled from 'styled-components';

export const ModalContentWrapper = styled.View`
  padding-vertical: 10%;
  padding-horizontal: 2%;
  border-radius: 20px;
  background-color: ${({
    theme: {
      palette: {grayscale},
    },
  }) => grayscale[0]};
  max-height: ${({mh = '80%'}) => mh};
  align-items: center;
  justify-content: space-evenly;
`;

export const ModalCardsWrapper = styled.View``;
export const ModalButtonsWrapper = styled.View`
  margin-top: 10%;
`;

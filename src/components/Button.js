import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #ff731d;
  color: white;
  padding: 0.5em 1em;
  border: 1px solid #ccc;
  transition: background-color 100ms ease-in;

  &:hover {
    background-color: #ef6007;
  }
`;

export const StyledButtonSmall = styled(StyledButton)`
  padding: 0.3em 0.8em;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledButtonLarge = styled(StyledButton)`
  padding: 0.5em 1em;
`;

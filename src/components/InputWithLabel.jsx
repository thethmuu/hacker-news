import styled from 'styled-components';

function InputWithLabel({ id, value, onChange, children, isFocus = false }) {
  return (
    <>
      <StyledLabel htmlFor={id}>{children}</StyledLabel>
      <StyledInput
        type='text'
        id={id}
        value={value}
        onChange={onChange}
        autoFocus={isFocus}
      />
    </>
  );
}

export default InputWithLabel;

const StyledLabel = styled.label`
  font-size: 1.5rem;
  margin-right: 0.5em;
`;

const StyledInput = styled.input`
  border: none;
  padding: 0.5em 1em;
  border-bottom: 1px solid #ccc;
`;

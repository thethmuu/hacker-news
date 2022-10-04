function InputWithLabel({ id, value, onChange, children, isFocus = false }) {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input type='text' id={id} value={value} onChange={onChange} autoFocus={isFocus} />
    </>
  );
}

export default InputWithLabel;

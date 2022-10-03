function InputWithLabel({ id, value, onChange, children }) {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input type='text' id={id} value={value} onChange={onChange} />
    </>
  );
}

export default InputWithLabel;

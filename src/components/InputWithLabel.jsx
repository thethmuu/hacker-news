import styles from './SearchForm.module.css';

function InputWithLabel({ id, value, onChange, children, isFocus = false }) {
  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {children}
      </label>
      <input
        type='text'
        id={id}
        value={value}
        onChange={onChange}
        autoFocus={isFocus}
        className={styles.input}
      />
    </>
  );
}

export default InputWithLabel;

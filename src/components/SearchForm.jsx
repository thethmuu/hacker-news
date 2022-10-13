import React from 'react';
import styled from 'styled-components';
import InputWithLabel from './InputWithLabel';
import styles from './SearchForm.module.css';
import appStyles from '../App.module.css';
import { StyledButtonLarge } from './Button';

export function SearchForm({ handleSearchSubmit, query, handleSearchInput }) {
  return (
    <StyledForm className={styles.searchForm} onSubmit={handleSearchSubmit}>
      <InputWithLabel
        id='search'
        value={query}
        onChange={handleSearchInput}
        isFocus
      >
        Search:{' '}
      </InputWithLabel>

      <StyledButtonLarge type='submit' disabled={!query}>
        Search
      </StyledButtonLarge>
    </StyledForm>
  );
}

const StyledForm = styled.form`
  padding: 0.5em 1em;
  display: flex;
  align-items: center;
`;

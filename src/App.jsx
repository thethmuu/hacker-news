import { SearchForm } from './components/SearchForm';
import { useEffect, useState, useReducer, useCallback } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import List from './components/List';

const ACTIONS = {
  INIT: 'STORIES_FETCH_INIT',
  SUCCESS: 'STORIES_FETCH_SUCCESS',
  FAILURE: 'STORIES_FETCH_FAILURE',
  REMOVE: 'REMOVE_STORY',
};

const storiesReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.INIT:
      return {
        ...state,
        isLoading: true,
        hasError: false,
      };
    case ACTIONS.SUCCESS:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        data: action.payload,
      };
    case ACTIONS.FAILURE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    case ACTIONS.REMOVE:
      return {
        ...state,
        data: state.data.filter(
          (story) => story.objectID !== action.payload.objectID
        ),
      };
    default:
      throw new Error();
  }
};

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

// top-level

function App() {
  const [query, setQuery] = useStorageState('search', '');
  const [stories, dispatchStories] = useReducer(storiesReducer, {
    data: [],
    isLoading: false,
    hasError: false,
  });
  const [url, setUrl] = useState(`${API_ENDPOINT}${query}`);

  // memoized

  // useCallback

  // reusable
  const fetchStories = useCallback(async () => {
    if (!query) return;
    dispatchStories({ type: ACTIONS.INIT });

    try {
      const res = await axios.get(url);

      dispatchStories({
        type: ACTIONS.SUCCESS,
        payload: res.data.hits, //value
      });
    } catch {
      dispatchStories({ type: ACTIONS.FAILURE });
    }
  }, [url]);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  function handleRemoveStory(item) {
    dispatchStories({
      type: ACTIONS.REMOVE,
      payload: item,
    });
  }

  function handleSearchInput(e) {
    setQuery(e.target.value);
  }

  function handleSearchSubmit(event) {
    event.preventDefault();
    setUrl(`${API_ENDPOINT}${query}`);
  }

  const StyledContainer = styled.div`
    height: 100vh;
    padding: 1em;
    background: #ededed;
    color: #333;
  `;

  const StyledHeadline = styled.h1`
    font-size: 3rem;
    font-weight: 300;
  `;

  return (
    <StyledContainer>
      <StyledHeadline>My Hacker News</StyledHeadline>
      <SearchForm
        handleSearchSubmit={handleSearchSubmit}
        query={query}
        handleSearchInput={handleSearchInput}
      />

      <hr />

      {stories.hasError && <p>Something went wrong...</p>}

      {stories.isLoading ? (
        <p>Loading...</p>
      ) : (
        <List stories={stories.data} onRemoveItem={handleRemoveStory} />
      )}
    </StyledContainer>
  );
}

// custom hook
function useStorageState(key, initialState) {
  const [value, setValue] = useState(localStorage.getItem(key) || initialState);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue];
}

export default App;

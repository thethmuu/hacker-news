import { useEffect, useState } from 'react';
import InputWithLabel from './components/InputWithLabel';
import List from './components/List';

function App() {
  const initialStories = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
    {
      title: 'JavaScript',
      url: 'https://modernjavascript.info/',
      author: 'Abramov, Andrew Clark',
      num_comments: 3,
      points: 5,
      objectID: 2,
    },
  ];

  const getAsyncStories = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ data: { stories: initialStories } }), 3000)
    );

  // 1. render
  // 2. after ui render, useEffect
  // 3. re-render/update

  const [query, setQuery] = useStorageState('search', '');
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAsyncStories()
      .then((res) => {
        setStories(res.data.stories);
        setIsLoading(false);
      })
      .catch(() => setHasError(true));
  }, []);

  function handleRemoveStory(item) {
    const newStories = stories.filter(
      (story) => story.objectID !== item.objectID
    );
    setStories(newStories);
  }

  const searchedStories = stories.filter((story) => {
    return story.title.toLowerCase().includes(query.toLowerCase());
  });

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <div>
      <h1>My Hacker News</h1>
      <InputWithLabel id='search' value={query} onChange={handleChange} isFocus>
        Search:{' '}
      </InputWithLabel>

      <hr />

      {hasError && <p>Something went wrong...</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <List stories={searchedStories} onRemoveItem={handleRemoveStory} />
      )}
    </div>
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

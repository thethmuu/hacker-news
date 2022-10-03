import { useEffect, useState } from 'react';
import InputWithLabel from './components/InputWithLabel';

function App() {
  const stories = [
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
      objectID: 1,
    },
  ];

  // 1. render
  // 2. after ui render, useEffect
  // 3. re-render/update

  useEffect(() => {}, [])

  const [query, setQuery] = useStorageState('search', 'React');

  const searchedStories = stories.filter((story) => {
    return story.title.toLowerCase().includes(query.toLowerCase());
  });

  function handleChange(e) {
    setQuery(e.target.value);
  }

  return (
    <div>
      <h1>My Hacker News</h1>
      <InputWithLabel id='search' value={query} onChange={handleChange}>
        Search:{' '}
      </InputWithLabel>

      <hr />

      <List stories={searchedStories} />
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

function List({ stories }) {
  return (
    <ul>
      {stories.map((item) => {
        return <Item item={item} key={item.author} />;
      })}
    </ul>
  );
}

function Item({ item: { url, title, author, num_comments, points } }) {
  return (
    <li>
      <span>
        <a href={url}>{title}</a>
      </span>
      <span>{author}</span>
      <span>{num_comments}</span>
      <span>{points}</span>
    </li>
  );
}

export default App;

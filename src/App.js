import React, { useState, useReducer, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import jexia from './jexia';

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetched':
      return {
        ...state,
        movies: action.movies || [],
      };
    default:
      return state;
  }
};

function App() {
  const [name, setName] = useState('');
  const [director, setDirector] = useState('');
  const [{ movies }, dispatch] = useReducer(reducer, { movies: [] });

  const updateName = (e) => setName(e.target.value);
  const updateDirector = (e) => setDirector(e.target.value);

  const fetchMovies = async () => {
    const movies = await jexia.get('movies');

    dispatch({ type: 'fetched', movies });
  };

  useEffect(() => { fetchMovies(); }, []);

  const insertMovie = async () => {
    await jexia.insert('movies', { name, director });
    setName('');
    setDirector('');
    fetchMovies();
  };

  const removeMovie = async () => {
    await jexia.remove('movies', 'name', name);
    setName('');
    setDirector('');
    fetchMovies();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} width={200} className="App-logo" alt="logo" />

        <div className="movies">
          {movies.length ?
            movies.map(({ name, director }) => (
              <div key={name} className="movie">{name} - {director}</div>
            )) : <div>Fetching movies...</div>
          }
        </div>

        <div className="operations">
          <div className="op-block">
            <span>Insert a new movie</span>
            <input
              type="text"
              name="insert-name"
              placeholder="Movie name"
              value={name}
              onChange={updateName}
            />
            <input
              type="text"
              name="insert-director"
              placeholder="Movie director"
              value={director}
              onChange={updateDirector}
            />
            <input type="button" value="Submit" onClick={insertMovie} />
          </div>

          <div className="op-block">
            <span>Remove movie by name</span>
            <input
              type="text"
              name="remove-name"
              placeholder="Movie name"
              value={name}
              onChange={updateName}
            />
            <input type="button" value="Submit" onClick={removeMovie} />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

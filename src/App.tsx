import { useState, useEffect, useRef } from 'react';
import { Character } from './types';
import { Characters } from './components/ListOfCharacters'
import { getCharacters } from './services/characters';
import './App.css';

//const HASH = `4dfaa6f4e5cb993da155037080ba9b54`;

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [search, updateSearch] = useState<string>('')
  const isFirstSearch = useRef<boolean>(true)

  /*useEffect(() => {
    fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c8ab8d276656753ee4b88c8234f79a08&hash=${HASH}&limit=9&nameStartsWith=${search}`)
      .then(async res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return await res.json();
      })
      .then(res => {
        setCharacters(res.data.results);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch data');
        setLoading(false);
      });
  }, [search]);*/

  function fetchCharacters() {
    setLoading(true)
    console.log(search)
    const searchingValue = isFirstSearch.current? null : search
    getCharacters({search: searchingValue}).then(
      characters => {
        setCharacters(characters)
        setLoading(false)
      }
    )
    .catch(err => {
      console.error(err);
      setError('Failed to fetch data');
      setLoading(false);
    })
  }

  useEffect (() => {
    fetchCharacters()
  }, [])

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    isFirstSearch.current = false
    fetchCharacters()
  }

  function handleChange(event: React.FormEvent<HTMLInputElement>) {
    const inputCharacters = event.currentTarget
    if (inputCharacters) {
        const newSearch = inputCharacters.value
        updateSearch(newSearch)
    }
  }

  return (
    <div className='App'>
      <header>
        <p style={{fontSize: "100px"}}> Mundo Marvel </p>
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} placeholder='Iron Man, Thor...' name='characters-query' value={search}/>
          <button type='submit'> Buscar </button>
        </form>
      </header>
      <main>
        {loading && <strong>Cargando...</strong>}
        {error && <strong>{error}</strong>}
        {characters.length > 0 && <Characters characters = {characters}></Characters>}
      </main>
    </div>
  );
}

export default App;

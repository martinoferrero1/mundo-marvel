import { useState, useEffect } from 'react';
import { Character } from './types';
import './App.css';

const HASH = `4dfaa6f4e5cb993da155037080ba9b54`;

function App() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c8ab8d276656753ee4b88c8234f79a08&hash=${HASH}&limit=10`)
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
  }, []);

  return (
    <div className='App'>
      {loading && <strong>Cargando...</strong>}
      {error && <strong>{error}</strong>}
      {characters.length > 0 && (
        <table style={{width : '100%'}}>
          <thead>
            <th>Nombre</th>
            <th>Imagen</th>
          </thead>
          <tbody>
          {characters.map(character => (
            <div key={character.id}>
              <span className='characters--row'>
                <td>{character.name}</td>
                <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} width={'100 px'}/>
              </span>
            </div>
          ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;

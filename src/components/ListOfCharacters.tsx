// 'use client';
import { Character } from '../types';

interface Props {
    characters: Character[]
}

function NoCharactersFound() {
  return <p> No se encontraron personajes </p>
}

function ListOfCharacters({characters}: Props) {
  return (
    <ul className='characters-list'>
      {
        characters.map(character => (
          <li key={character.id} className='character'>
            <p>{character.name}</p>
            <img src={character.thumbnail} alt={character.name} style={{width:'100 px'}}/>
          </li>
          ))
      }
    </ul>
  );
}

export function Characters({characters}: Props) {
  const hasCharacters = characters?.length > 0
  return (hasCharacters? <ListOfCharacters characters={characters}/> : <NoCharactersFound/>)
}
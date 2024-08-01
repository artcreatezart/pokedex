import {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { PokeContext } from '../context/PokeContext'
const typeImg = {
  normal: '#B8B08D',
  fire: '#EACFB7',
  water: '#A0C1D1',
  grass: '#9EBF8F',
  electric: '#F2E77A',
  ice: '#A1D2D0',
  fighting: '#B63D3A',
  poison: '#B06DAB',
  ground: '#D6C689',
  flying: '#B69FEC',
  psychic: '#E2868B',
  bug: '#A7BD5B',
  rock: '#BDAF6E',
  ghost: '#8D7B9C',
  dragon: '#8574F8',
  dark: '#8D7B6F',
  steel: '#B9B9CC',
  fairy: '#E3AFC3',
};
 
const SinglePokemon = () => {
  //bring in the select pokemon
  const {selectedPokemon} = useContext(PokeContext)
  // initialize use nav
  const navigate = useNavigate()
 
 
  return (
    <div id='singlePokemonPage'>
      <div id='singlePokemonButtonContainer'>
        <button onClick={() => navigate(-1)}>Go back</button>
        <button>Next</button>
      </div>
      
      <div id='singlePokemonContainer'>
        <img src={selectedPokemon.imageURL} alt={selectedPokemon.name + "image"}/>
        <div id='singlePokemonInfo'>
          <div id='singlePokemonName'>
            <p>No. {selectedPokemon.id}</p>
            <h2>{selectedPokemon.name.toUpperCase()}</h2>
            <button>Listen</button>
          </div>
          <div id='singlePokemonTypes'>
            <div id='individualTypeBox'>
              <div id='individualColourTypeBox' style={{backgroundColor: typeImg[selectedPokemon.types[0].toLowerCase()]}}>

              </div>
              <p>{selectedPokemon.types.join(", ")}</p>
            </div>
            
          </div>
          <p>Ability: {selectedPokemon.ability.join(", ")}</p>
          <p>Height: {selectedPokemon.height}</p>
          <p>Weight: {selectedPokemon.weight}</p>
        </div>
        
      </div>
      
    </div>
  )
}
 
export default SinglePokemon
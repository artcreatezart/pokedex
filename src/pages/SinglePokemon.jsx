import { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { PokeContext } from '../context/PokeContext'

const typeImg = {
  normal: '#7A7A7A',
  fire: '#FF8C42',
  water: '#34A5D5',
  grass: '#52A937',
  electric: '#E9D820',
  ice: '#A1D2D0',
  fighting: '#49ABA2',
  poison: '#7025BB',
  ground: '#C06F35',
  flying: '#99CBD6',
  psychic: '#DA4469',
  bug: '#3E673C',
  rock: '#AEA898',
  ghost: '#44304B',
  dragon: '##003D5B',
  dark: '#24292E',
  steel: '#7AB4B8',
  fairy: '#E090C1',
};
 
const SinglePokemon = () => {
  //bring in the select pokemon
  const {selectedPokemon} = useContext(PokeContext)
  // initialize use nav
  const navigate = useNavigate()
  const audioRef = useRef(null); // 1. Creating the reference

  const handlePlay = () => {
    if (audioRef.current) { // 3. Using the reference
      audioRef.current.play(); // 3. Using the reference to play audio
    }
  };
 
 
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
            <button onClick={handlePlay}>Listen</button>
            <audio ref={audioRef} src={selectedPokemon.cry} />
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
import { useEffect, useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { PokeContext } from '../context/PokeContext'
import { ArrowRight } from 'react-bootstrap-icons';

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
  dragon: '#003D5B',
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

  const [evolutionChain, setEvolutionChain] = useState([]);
  const [loadingEvolution, setLoadingEvolution] = useState(true);

  const handlePlay = () => {
    if (audioRef.current) { // 3. Using the reference
      audioRef.current.play(); // 3. Using the reference to play audio
    }
  };
 
  useEffect(() => {
    const fetchEvolutionChain = async () => {
      if (!selectedPokemon?.id) return;

      try {
        setLoadingEvolution(true);

        // Step 1: Get the species data to get the evolution chain URL
        const speciesResponse = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${selectedPokemon.id}/`
        );
        const speciesData = await speciesResponse.json();
        const evolutionChainUrl = speciesData.evolution_chain.url;

        // Step 2: Fetch the evolution chain data
        const evolutionResponse = await fetch(evolutionChainUrl);
        const evolutionData = await evolutionResponse.json();

        // Step 3: Process the evolution chain
        const chain = [];
        let currentEvo = evolutionData.chain;

        // Loop through the evolution stages and get each Pokémon's details
        while (currentEvo) {
          const pokemon = await fetch(currentEvo.species.url)
            .then((res) => res.json())
            .then((data) => {
              return {
                name: data.name,
                url: data.url,
               imageURL: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png`,

              };
            });

          chain.push(pokemon);

          // Move to the next evolution stage (if any)
          currentEvo = currentEvo.evolves_to[0];
        }

        setEvolutionChain(chain);
        setLoadingEvolution(false);
      } catch (error) {
        console.error('Error fetching evolution chain:', error);
        setLoadingEvolution(false);
      }
    };

    fetchEvolutionChain();
  }, [selectedPokemon]);

  const renderEvolutionChain = () => {
    if (loadingEvolution) return <p>Loading evolution chain...</p>;
    if (!evolutionChain.length) return <p>No evolution chain available.</p>;

    return (
      <div className="evolution-chain-container">
        {evolutionChain.map((evo, index) => (
          <div key={index} className="evolution-stage">
            {/* Fallback image if evo.imageURL is unavailable */}
            <div className='evolution-name-img'>
            <img src={evo.imageURL || "/img/UnownQuestion.png"} alt={evo.name} />
            <p>{evo.name}</p>
            </div>
            
            {index < evolutionChain.length - 1 && (
              <ArrowRight size={30} className="evolution-arrow" />
            )}
            
          </div>
        ))}
      </div>
    );
  };
  return (
    <div id='singlePokemonPage'>
      <div id='singlePokemonButtonContainer'>
        <button onClick={() => navigate('/')}>Go back</button>
      </div>
      
      <div id='singlePokemonContainer'>
      <img 
        src={selectedPokemon?.imageURL || "/img/UnownQuestion.png"} // Provide fallback image URL
        alt={selectedPokemon?.name + " image"} 
      />

      {/* Conditionally render the error message if imageURL is missing */}
      {!selectedPokemon?.imageURL && <p>Can't Find Image</p>}

        <div id='singlePokemonInfo'>
          <div id='singlePokemonName'>
            <p>No. {selectedPokemon.id}</p>
            <h2>{selectedPokemon.name.toUpperCase()}</h2>
            <button onClick={handlePlay}>Battle Cry</button>
            <audio ref={audioRef} src={selectedPokemon.cry} />
          </div>
          <div id='singlePokemonMoreInfo'>
            <div id='singlePokemonTypes'>
              <div id='individualTypeBox'>
                <div id='individualColourTypeBox' style={{backgroundColor: typeImg[selectedPokemon.types[0].toLowerCase()]}}>

                </div>
                <p>{selectedPokemon.types.join(", ")}</p>
              </div>


            </div>

            <div id='pokeMeasure'>
              <div id='heightMeasure'>
                <p>Height: {selectedPokemon.height}</p>
              </div>
              <div id='weightMeasure'>
                <p>Weight: {selectedPokemon.weight}</p>
              </div>
            </div>
            
            
          </div>

          <p id='abilityInfo'>Ability: {selectedPokemon.ability.join(", ")}</p>

          <div className='evolution-chain-box'>
            <p>Evolution Chain:</p>
          {renderEvolutionChain()}
          </div>

          </div>
          
        
      </div>
      
    </div>
  )
}
 
export default SinglePokemon
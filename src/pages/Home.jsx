import { useState, useEffect, useContext } from "react"
import axios from "axios"
import { PokeContext } from "../context/PokeContext"
import { useNavigate } from "react-router-dom" 
import { Puff } from "react-loader-spinner"


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

// Fetch Pokemon Fucntion
const Home = () => {
  // set up the context  state
  const {setSelectedPokemon} = useContext(PokeContext)
  // set a loading state
  const [loading, setLoading] = useState(true)
  // set state for search
  const [searchTerm, setSearchTerm] = useState('')
  // set state for types
  const [type, setType] = useState('')
  // set up a filtered state 
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  // set up pokemon state for returned pokemon
  const [pokedex, setPokedex] = useState([])
  // initalise navigate
  const navigate = useNavigate()

  const resetFilters = () => {
    setType('');
    setSearchTerm('')
  }

  const fetchPokemon = async() => {
    setLoading(true);
    try {
     const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`)  
     const pokemonData = response.data.results   
     console.log(pokemonData);

     //   Get the detailed data using the Pokemon.url
     const detailedPokemonData = await Promise.all(
      pokemonData.map(async (pokemon) => {
        const pokemonResponse = await axios.get(pokemon.url)
        const type = pokemonResponse.data.types.map((typeData) => typeData.type.name)
        const ability = pokemonResponse.data.abilities.map((abilityData) => abilityData.ability.name)
        const id = pokemonResponse.data.id
        return {
          id: id,
          name: pokemon.name,
          imageURL: pokemonResponse.data.sprites.other['official-artwork'].front_default,
          ability: ability,
          types: type,
          height: pokemonResponse.data.height,
          weight: pokemonResponse.data.weight,
          cry: pokemonResponse.data.cries.latest // add the cry
          
        }
      })
    )

    //  add onSelect to eachPokemonn
    // onSelect set the context equal to that selected pokemon
    const pokemons = detailedPokemonData.map((pokemon) => {
      return {
        ...pokemon,
        onSelect: () => setSelectedPokemon(pokemon)
      }
    })
    setLoading(false)
    // take the pokemons from above and add to state variable (pokedex) so i can filter
    setPokedex(pokemons);
    // filtering - inital filter state with all the pokedex data
    setFilteredPokemon(pokemons)

    } catch (error) {
        console.log(error);
        setLoading(false)
    }
}
  

// Initial Render API Call
    useEffect(() => {
        fetchPokemon();
    }, []) // empty dependency array ' [] ' for running this function ONCE
  
  // search or filter changes
  useEffect(() => {
    const filteredData = pokedex.filter((pokemon) => {
      const nameMatch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
      const typeMatch = !type || pokemon.types.includes(type.toLowerCase())
      return nameMatch && typeMatch
      
    })
    setFilteredPokemon(filteredData)
  }, [searchTerm, type])


  return (
    <div id='homepage'>
      <h1>Hisui Pokedex</h1>
      <div id='filterContainer'>
        <div id='searchContainer'>
          <label htmlFor="search">Search</label>
          <input 
          type='text' 
          name='search'
          id='search'
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          />

        </div>
        <div id='typeContainer'>
          <label htmlFor='type'>Type</label>
          <select
            name='type'
            id='type'
            value={type}
            onChange={(event) => setType(event.target.value)}
          >
            <option value=''>Choose Type...</option>
            <option value='normal'>normal</option>
            <option value='fire'>fire</option>
            <option value='water'>water</option>
            <option value='grass'>grass</option>
            <option value='electric'>electric</option>
            <option value='ice'>ice</option>
            <option value='fighting'>fighting</option>
            <option value='poison'>poison</option>
            <option value='ground'>ground</option>
            <option value='flying'>flying</option>
            <option value='psychic'>psychic</option>
            <option value='bug'>bug</option>
            <option value='rock'>rock</option>
            <option value='ghost'>ghost</option>
            <option value='dragon'>dragon</option>
            <option value='dark'>dark</option>
            <option value='steel'>steel</option>
            <option value='fairy'>fairy</option>
          </select>
        </div>
        <button className='primary-button' onClick={resetFilters}>Reset Filters</button>
      </div>
      
      <div id='pokemonDisplayGrid'>
        {loading ? (
          <Puff color='#1f1f1f' height={100} width={100}/>
        ) : pokedex.length === 0 ? (<p>No Pokemon Found</p>) : (
          filteredPokemon.map((item, index) => (
            <div
            key= {index}
            id='pokemonCard'
            onClick={() => {
              item.onSelect()
              navigate('/pokemon/')
            }}
            >
              <img src={item.imageURL} alt={item.name}/>
              <div id='otherPokeInfo'>
                <p id='pokeID'>{item.id}</p>
                <div id='nameType'>
                  <p id='pokeName'>{item.name}</p>
                  <div id='pokemonTypeContainer'>
                    <div id='typeBox' style={{backgroundColor: typeImg[item.types[0].toLowerCase()]}}/>
                      
                    
                    <p id='pokeTypes'>{item.types.join(", ")}</p>
                    
                  </div>
                  {/* <button id="readMorePokeMobile" onClick={() => {
              item.onSelect()
              navigate('/pokemon/')
            }}>See More</button> */}
                  
                </div>
                
              </div>
              <button id="readMorePoke" onClick={() => {
              item.onSelect()
              navigate('/pokemon/')
            }}>See More</button>
              
              
            </div>
          ))
        )}
      
      </div>
    </div>
  )
}

export default Home

import { Routes, Route } from 'react-router-dom'

// Import Pages
import Home from '../pages/Home'
import SinglePokemon from '../pages/SinglePokemon'

const Links = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Home/>}/>  
      <Route path='/pokemon/' element={<SinglePokemon/>}/>
    </Routes>
  )
}

export default Links

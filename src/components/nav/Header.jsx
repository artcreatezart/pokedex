import {useState} from 'react'
import MobileMenu from './MobileMenu'
import { Link } from 'react-router-dom'
import { List } from 'react-bootstrap-icons'

const Header = () => {
  const [menuIsOpen, openMenu] = useState(false)

  const toggleMobileMenu = () => {
    openMenu(!menuIsOpen)
    document.body.classList.toggle('no-scroll')
  }

  return (
    <>
      <div id='topnav'>
        <div id='logo'>
          <Link to='/'>PokeApi</Link>
        </div>

        <ul id='menu'>
          <li>
            <Link to='/'>Home</Link>
          </li>
        </ul>

        {/* Hamburger Icon */}
        <div id='menuContainer'>
          <button id='menuButton' className='show-mobile-menu-button' onClick={toggleMobileMenu}>
            <List id='hamburgerIcon'/>
          </button>
        </div>

      </div>

      {menuIsOpen && <MobileMenu closeMethod={toggleMobileMenu}/>}
    </>
  )
}

export default Header

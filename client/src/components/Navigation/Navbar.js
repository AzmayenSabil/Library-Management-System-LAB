import { NavLink } from 'react-router-dom'
// import { ReactComponent as Brand } from '../../assets/icons/logo.svg'
import './Navbar.css'

// import Search from '../../components/Search/Search.js'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        {/* <div className="logo">
          <Brand />
        </div> */}
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/books">Books</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/search">Search</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
        {/* <Search></Search> */}
      </div>
    </nav>
  )
}

export default Navbar
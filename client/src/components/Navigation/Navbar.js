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
              <NavLink to="/borrow-return">Borrowing and Returning</NavLink>
            </li>
            <li>
              <NavLink to="/search">Search</NavLink>
            </li>
            <li>
              <NavLink to="/recommendation">Recommendation System</NavLink>
            </li>
            <li>
              <NavLink to="/stats">Stats</NavLink>
            </li>
            <li>
              <NavLink to="/signup">Sign up</NavLink>
            </li>
            <li>
              <NavLink to="/signin">Sign in</NavLink>
            </li>
          </ul>
        </div>
        {/* <Search></Search> */}
      </div>
    </nav>
  )
}

export default Navbar
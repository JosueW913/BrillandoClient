import { FaBars, FaTimes } from 'react-icons/fa'
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/auth.context";
import logo from "../images/logo.png"


const Navbar = () => {

    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

    const [click, setClick] = useState(false)

    const handleClick = () => setClick(!click)

    const getToken = () => {
        return localStorage.getItem('authToken')
    }

    return (
        <nav className="navbar">

            <img className='navbar-logo' src={logo} alt="logo" />

            <ul className={click ? 'nav-menu active' : 'nav-menu'}>

                <li>
                    <Link className="nav-item" to="/">
                        Home
                    </Link>
                </li>

                <li>
                    <Link className="nav-item" to="/all-activities">
                        Kids Activities
                    </Link>
                </li>

                <li>
                    <Link className="nav-item" to="/all-books">
                        Brillando Books
                    </Link>
                </li>

                {getToken() && (
                    <>
                        <li>
                            <Link className="nav-item" to="/add-activity">
                                Add Activity
                            </Link>
                        </li>

                        <li>
                            <Link className="nav-item" to="/add-book">
                                Add Book
                            </Link>
                        </li>

                            <button id='btnLogout' onClick={logOutUser}>Logout</button>
                            <span>{user && user.name}</span>
                        
                    </>
                )}

                {!getToken() && (
                    <>
                        <li>
                            <Link className="nav-item" to="/signup">
                                Sign-Up
                            </Link>
                        </li>

                        <li>
                            <Link className="nav-item" to="/login">
                                Login
                            </Link>
                        </li>
                    </>
                )}
            </ul>

            <div className='hamburger' onClick={handleClick}>
                {click ? (<FaTimes size={27} />) : (<FaBars size={27} />)}
            </div>

        </nav>
    )
}

export default Navbar
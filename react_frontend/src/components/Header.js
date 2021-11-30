import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../AuthContext';


const Header = () => {
    const {user, logoutUser} = useContext(AuthContext);

    return (
        <div>
            <Link to="/">Home</Link>
            {user ? (
                <div>
                    <p onClick={logoutUser}>Log out</p>
                    <p>Hello {user.username}</p>
                </div>
            ) : (
            <Link to="/login">Login</Link>
            )}
        </div>
    )
}

export default Header

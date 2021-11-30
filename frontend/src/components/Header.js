import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext'


function Header() {
    const {user, logOutUser} = useContext(AuthContext);

    return (
        <div>
            <Link to='/'>Home</Link>
            <span>|</span>
            {user ? (
                <p onClick={logOutUser}>Log out</p>
            ) : (
                <Link to='/login'>Log in</Link>
            )}

            {user &&<p>Hello, {user.username}</p>}
        </div>
    )
}

export default Header

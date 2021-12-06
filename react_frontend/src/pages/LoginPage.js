import React, { useContext } from 'react'
import AuthContext from '../AuthContext';

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext);

    return (
        <div>
            <form onSubmit={loginUser}>
                <input type="text" name="email" placeholder="Email or username" />
                <input type="password" name="password" placeholder="Password" />
                <input type="submit" value="Log in" />
            </form>
        </div>
    )
}

export default LoginPage

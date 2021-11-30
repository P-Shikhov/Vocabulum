import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

function LoginPage() {
    const {loginUser} = useContext(AuthContext);

    return (
        <div>
            <form onSubmit={loginUser}>
                <input type="text" name="email" placeholder="Email or username"></input>
                <input type="password" name="password" placeholder="Password"></input>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default LoginPage;

import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
    const jwt = localStorage.getItem('authTokens');
    let [authTokens, setAuthTokens] = useState(() => jwt ? JSON.parse(jwt) : null);
    let [user, setUser] = useState(() => jwt ? jwt_decode(jwt) : null);
    let [loading, setLoading] = useState(true);

    const history = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                'username': e.target.username.value, 
                'password': e.target.username.password,
            })
        });
        let data = await response.json();
        if (response.status === 200) {
            setAuthTokens(data);
            setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            history.push('/');
        } else {
            console.error('Login failed.');
        }
    }


    const logOutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        history.push('/login');
    }

    const contextData = {
        user: user,
        setUser: setUser,
        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        loginUser: loginUser,
        logOutUser: logOutUser,
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwt_decode(authTokens.access));
        }
        setLoading(false);
    }, [authTokens, loading]);

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}


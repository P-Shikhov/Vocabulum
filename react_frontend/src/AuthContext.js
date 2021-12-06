import { createContext, useState, useEffect } from 'react'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'
// import { usenavigate } from 'react-router-dom'


const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({children}) => {
    const jwt = localStorage.getItem('authTokens');
    let [authTokens, setAuthTokens] = useState(() => jwt ? JSON.parse(jwt) : null);
    let [user, setUser] = useState(() => jwt ? jwt_decode(jwt) : null);
    let [loading, setLoading] = useState(true);

    let navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                //todo: change field name?
                'email': e.target.email.value, 
                'password': e.target.password.value
            })
        })
        const data = await response.json();
        if (response.status === 200) {
            setAuthTokens(data);
            // setUser(jwt_decode(data.access));
            localStorage.setItem('authTokens', JSON.stringify(data));
            navigate('/');
        } else {
            //response != 200
            console.error("Error logging in.");
        }
    }

    const logoutUser = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem('authTokens');
        navigate('/login');
    }

    const contextData = {
        user: user,
        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        setUser: setUser,
        loginUser: loginUser,
        logoutUser: logoutUser,
    }

    useEffect(()=> {
        if(authTokens){
            setUser(jwt_decode(authTokens.access))
        }
        setLoading(false)
    }, [authTokens, loading])

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )
}

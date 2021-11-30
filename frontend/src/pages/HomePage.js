import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'

const HomePage = () => {
    let [users, setUsers] = useState([]);
    const {authTokens, logOutUser} = useContext(AuthContext);

    const api = useAxios();

    useEffect(() => {
        getUsers()
    }, []);

    let getUsers = async () => {
        let response = await api.get('/users/');
        if (response.status === 200) {
            setUsers(response.data);
        }
    }

    return (
        <div>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default HomePage

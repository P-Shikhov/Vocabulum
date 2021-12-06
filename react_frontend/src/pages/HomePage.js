import React, { useContext, useState, useEffect } from 'react'
// import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../AuthContext';
import AxiosInstance from '../AxiosInstance';

const HomePage = () => {
    let { authTokens } = useContext(AuthContext);
    let [texts, setTexts] = useState([]);

    const api = AxiosInstance();

    const getTexts = async () => {
        let response = await api.get('http://127.0.0.1:8000/api/texts/');
        if (response.status === 200) {
            setTexts(response.data)
        }
    }

    

    useEffect(() => {
        if (authTokens) {
            getTexts();
        }
    })

    return (
        <ul>
            {texts && texts.map(text => (
                <li>
                    <a href={`/texts/${text.id}/`} >
                        {text.title}
                    </a>
                </li>
            ))}
        </ul>
    )
}

export default HomePage;

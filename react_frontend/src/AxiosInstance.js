import axios from 'axios'
import jwt_decode from "jwt-decode"
import dayjs from 'dayjs'
import { useContext } from 'react'
import AuthContext from './AuthContext'

import { useNavigate } from 'react-router-dom'

const BASE_URL = 'http://127.0.0.1:8000'

const AxiosInstance = () => {
    const { authTokens, setUser, setAuthTokens, logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const axiosInstance = axios.create({
        BASE_URL,
        headers: {
            Authorization: `Bearer ${authTokens?.access}`
        }
    })

    axiosInstance.interceptors.request.use(async req => {
        const user = jwt_decode(authTokens.access);
        const isValid = dayjs.unix(user.exp).diff(dayjs()) > 0;

        if (isValid) {
            return req;
        }

        const response = await axios.post(`${BASE_URL}/api/token/refresh/`, {
            refresh: authTokens.refresh
        });

        if (!response.data.access) {
            logoutUser();
            navigate('/login');
            return req;
        }

        localStorage.setItem('authTokens', JSON.stringify(response.data));
        setAuthTokens(response.data);
        setUser(jwt_decode(response.data.access));
        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req;
    });

    return axiosInstance;
}

export default AxiosInstance;
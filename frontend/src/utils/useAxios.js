import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const BASE_URL = 'http://127.0.0.1:8000/api/';

const useAxios = () => {
    const { authTokens, setUser, setAuthTokens} = useContext(AuthContext);

    const axiosInstance = axios.create({
        baseURl: BASE_URL,
        headers: {
            Authorization: `Bearer ${authTokens?.access}`
        }
    });

    axiosInstance.interceptors.request.use(async req => {
        const jwt = jwt_decode(authTokens.access);
        const isExpired = dayjs.unix(jwt.exp).diff(dayjs()) < 1;

        if (isExpired) {
            const response = await axios.post(`${BASE_URL}/token/refresh`, {
                refresh: jwt.refresh
            })
            localStorage.setItem('authTokens', JSON.stringify(response.data));
            req.headers.Authorization = `Bearer ${response.data.access}`;
        }
        return req;
    });

    return axiosInstance;
}

export default useAxios;

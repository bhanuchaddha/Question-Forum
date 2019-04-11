import Cookies from 'js-cookie'
import axios from 'axios';
import { Route } from 'react-router-dom'
import React from 'react'
import Login from './Login/Login';

export const getAccessToken = () => Cookies.get('access_token')
export const isAuthenticated = () => !!getAccessToken()

export const authenticate = (email, password) => {
    return axios.post(`http://localhost:8081/login`,
        { "email": email, "password": password })
        .then(tokens => {
            //refresh token can be configured as well
            Cookies.set('access_token', tokens.data.access_token, { expires: tokens.data.expires_in });
            console.log(tokens)
            return true;
        })
        .catch(error => {
            console.error('Login failed', error);
            return false;
        });
}

export const authHeader = () => {
    return {
        headers: {
            Authorization: 'Bearer ' + getAccessToken()
        }
    }
}

export const removeAuth = () => {
    Cookies.remove('access_token');
}

export const AuthenticatedRoute = ({
    component: Component,
    exact,
    path,
}) => (
        <Route
            exact={exact}
            path={path}
            render={props =>
                isAuthenticated() ? (
                    <Component {...props} />
                ) : (
                        <Login />
                    )
            }
        />
    );
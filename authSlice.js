import axios from 'axios';

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'AUTH_LOGIN_REQUEST':
        case 'AUTH_REGISTER_REQUEST':
            return { ...state, loading: true, error: null };
        case 'AUTH_LOGIN_SUCCESS':
        case 'AUTH_REGISTER_SUCCESS':
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                loading: false
            };
        case 'AUTH_LOGIN_FAIL':
        case 'AUTH_REGISTER_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'AUTH_LOGOUT':
            localStorage.removeItem('token');
            return {
                user: null,
                token: null,
                isAuthenticated: false,
                loading: false,
                error: null
            };
        default:
            return state;
    }
};

export const login = (email, password) => async (dispatch) => {
    dispatch({ type: 'AUTH_LOGIN_REQUEST' });
    try {
        const response = await axios.post('/api/auth/login', { email, password });
        dispatch({ type: 'AUTH_LOGIN_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'AUTH_LOGIN_FAIL', payload: error.response?.data?.message });
    }
};

export const register = (username, email, password) => async (dispatch) => {
    dispatch({ type: 'AUTH_REGISTER_REQUEST' });
    try {
        const response = await axios.post('/api/auth/register', { username, email, password });
        dispatch({ type: 'AUTH_REGISTER_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'AUTH_REGISTER_FAIL', payload: error.response?.data?.message });
    }
};

export const logout = () => (dispatch) => {
    dispatch({ type: 'AUTH_LOGOUT' });
};

export default authReducer;

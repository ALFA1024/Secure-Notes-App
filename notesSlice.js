import axios from 'axios';

const initialState = {
    notes: [],
    currentNote: null,
    loading: false,
    error: null,
    searchResults: []
};

const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NOTES_FETCH_REQUEST':
        case 'NOTES_CREATE_REQUEST':
        case 'NOTES_UPDATE_REQUEST':
        case 'NOTES_DELETE_REQUEST':
            return { ...state, loading: true, error: null };
        case 'NOTES_FETCH_SUCCESS':
            return { ...state, notes: action.payload, loading: false };
        case 'NOTES_CREATE_SUCCESS':
            return { ...state, notes: [...state.notes, action.payload], loading: false };
        case 'NOTES_UPDATE_SUCCESS':
            return {
                ...state,
                notes: state.notes.map(note => note._id === action.payload._id ? action.payload : note),
                loading: false
            };
        case 'NOTES_DELETE_SUCCESS':
            return {
                ...state,
                notes: state.notes.filter(note => note._id !== action.payload),
                loading: false
            };
        case 'NOTES_FETCH_FAIL':
        case 'NOTES_CREATE_FAIL':
        case 'NOTES_UPDATE_FAIL':
        case 'NOTES_DELETE_FAIL':
            return { ...state, loading: false, error: action.payload };
        case 'NOTES_SEARCH_SUCCESS':
            return { ...state, searchResults: action.payload, loading: false };
        case 'NOTES_SEARCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export const fetchNotes = () => async (dispatch, getState) => {
    dispatch({ type: 'NOTES_FETCH_REQUEST' });
    try {
        const token = getState().auth.token;
        const response = await axios.get('/api/notes', {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: 'NOTES_FETCH_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'NOTES_FETCH_FAIL', payload: error.response?.data?.message });
    }
};

export const createNote = (title, content, category, tags) => async (dispatch, getState) => {
    dispatch({ type: 'NOTES_CREATE_REQUEST' });
    try {
        const token = getState().auth.token;
        const response = await axios.post('/api/notes', { title, content, category, tags }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: 'NOTES_CREATE_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'NOTES_CREATE_FAIL', payload: error.response?.data?.message });
    }
};

export const updateNote = (id, title, content, category, tags) => async (dispatch, getState) => {
    dispatch({ type: 'NOTES_UPDATE_REQUEST' });
    try {
        const token = getState().auth.token;
        const response = await axios.put(`/api/notes/${id}`, { title, content, category, tags }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: 'NOTES_UPDATE_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'NOTES_UPDATE_FAIL', payload: error.response?.data?.message });
    }
};

export const deleteNote = (id) => async (dispatch, getState) => {
    dispatch({ type: 'NOTES_DELETE_REQUEST' });
    try {
        const token = getState().auth.token;
        await axios.delete(`/api/notes/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: 'NOTES_DELETE_SUCCESS', payload: id });
    } catch (error) {
        dispatch({ type: 'NOTES_DELETE_FAIL', payload: error.response?.data?.message });
    }
};

export const searchNotes = (query) => async (dispatch, getState) => {
    dispatch({ type: 'NOTES_FETCH_REQUEST' });
    try {
        const token = getState().auth.token;
        const response = await axios.get(`/api/notes/search/query?q=${query}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        dispatch({ type: 'NOTES_SEARCH_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'NOTES_SEARCH_FAIL', payload: error.response?.data?.message });
    }
};

export default notesReducer;

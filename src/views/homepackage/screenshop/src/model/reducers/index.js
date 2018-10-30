import { combineReducers } from 'redux';
import {
    LOGIN_LOADING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE
} from '../actions';

export const initialState = {
    entities: {
        loginUser: null
    },
    loginPageData: {
        loading: false,
        error: null
    }
};

export default  combineReducers({
    entities: (state = {}, action) => {
        switch(action.type) {
            case LOGIN_SUCCESS:
            return {...state, loginUser: action.payload};
        default:
            return state;
        }
    },
    loginPageData:  (state = {}, action) => {
        switch(action.type) {
            case LOGIN_LOADING:
                return {...state, loading: action.payload};
            case LOGIN_FAILURE:
                return {...state, error: action.payload};
            case LOGIN_SUCCESS:
                return {...state, error: null};
            default:
                return state;
        }
    }
});

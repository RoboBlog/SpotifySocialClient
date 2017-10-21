import {LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE, LOGOUT_USER} from '../constants';
import jwtDecode from 'jwt-decode';

const initialState = {
  token: 'Bearer ojMXdWPrRTEyzlPr3bxQ',
  userName: null,
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: 'YRDY'
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST :
      return {...state,
        isAuthenticating: true,
        statusText: null
      };
    case LOGIN_USER_SUCCESS :
      return {
        isAuthenticating: false,
        isAuthenticated: true,
        token: action.payload.token,
        userName: jwtDecode(action.payload.token).userName,
        statusText: 'You have been successfully logged in.'
      };
    case LOGIN_USER_FAILURE :
      return {...state,
        isAuthenticating: false,
        isAuthenticated: false,
        token: null,
        userName: null,
        statusText: `Authentication Error: ${action.payload.status} ${action.payload.statusText}`
      };
    case LOGOUT_USER :
      return {... state,
        isAuthenticated: false,
        token: null,
        userName: null,
        statusText: 'You have been successfully logged out.'
      };

    default:
      return state;
  }

};
export default authReducer

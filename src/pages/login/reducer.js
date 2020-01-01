import * as actionTypes from './actionTypes';

const initialState = {
  token: undefined,
  loading: false,
  error: {},

};

const auth = (state = initialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return {
        ...state,
        token: action.payload,
        loading: false,
      };
    case actionTypes.LOADING:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case actionTypes.LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default auth;

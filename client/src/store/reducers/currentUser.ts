import { LOG_IN, LOG_OUT } from '../actionTypes';

const INITIAL_STATE = {
  isAuthenticated: false,
  user: {}
}

export default (state = INITIAL_STATE, action: any) => {
  switch(action.type) {
    case LOG_IN: 
      return {
          isAuthenticated: true,
          user: action.user
        };
      case LOG_OUT:
        return {
          isAuthenticated: false,
          user: {}
        }
      default: 
        return state;
  }
}
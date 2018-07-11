import {
    UPDATE_SAVED_DATA, DELETE_DATE
} from '../actions/types';

const INITIAL_STATE = { saved_info: [] };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_SAVED_DATA:
          var newState = { ...state };
          newState.saved_info.push(action.payload)
          return newState;
        case DELETE_DATE:
          return { saved_info: action.payload };
        default:
            return state;
    }
};

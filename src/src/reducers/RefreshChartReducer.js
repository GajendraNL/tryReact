import {
    ACTION_UPDATE_DATA
} from '../actions/types';

export default (state = null, action) => {
    switch (action.type) {
        case ACTION_UPDATE_DATA:
            return action.payload;
        default:
            return state;
    }
};

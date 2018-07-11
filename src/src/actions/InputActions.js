import {
    ACTION_UPDATE_DATA,
    PLANET_INFO,
    UPDATE_SAVED_DATA,
    DELETE_DATE
} from './types';

export const doRefresh = (data) => {
    return {
        type: ACTION_UPDATE_DATA,
        payload: data
    };
};

export const planetInfo = (planetdata) => {
    return {
        type: PLANET_INFO,
        payload: planetdata
    };
};

export const save_data = (data) => {
    return {
        type: UPDATE_SAVED_DATA,
        payload: data
    };
};

export const updateSavedDates = (data) => {
  return {
    type: DELETE_DATE,
    payload: data
  };
};

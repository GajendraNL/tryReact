import {
    SETTINGS_PLANETS_VALUE,
    SETTING_CHART,
    SETTING_AYANAMASA,
    SETTINGS_LONGITUDE_VALUE
  } from '../actions/types';


const INITIAL_STATE = {
    planetsRepresentation: 0,
    charts_Type: 0,
    ayanamsa_type: '3',
    ayanamsa_string: 'Raman',
    longitudeRepresentation: 0
  };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SETTINGS_PLANETS_VALUE:
        return { ...state, planetsRepresentation: action.payload };
    case SETTING_CHART:
        return { ...state, charts_Type: action.payload };
    case SETTING_AYANAMASA:
        return { ...state, ayanamsa_type: action.payload.value, ayanamsa_string: action.payload.ayanamsaString };
    case SETTINGS_LONGITUDE_VALUE:
        return { ...state, longitudeRepresentation: action.payload };
    default:
        return state;
  }
};

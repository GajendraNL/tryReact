import { SETTINGS_PLANETS_VALUE, SETTINGS_LONGITUDE_VALUE, SETTING_CHART, SETTING_AYANAMASA, SETTINGS_THEME } from './types';

export const settingsForPlanets = (value) => {
    return {
        type: SETTINGS_PLANETS_VALUE,
        payload: value
    };
};

export const settingsForLongitude = (value) => {
    return {
        type: SETTINGS_LONGITUDE_VALUE,
        payload: value
    };
};

export const settingCharts = (value) => {
    return {
        type: SETTING_CHART,
        payload: value
    };
};

export const settingAyanamasa = (value) => {
    return {
        type: SETTING_AYANAMASA,
        payload: value
    };
};

export const settingsForTheme = (value) => {
    return {
        type: SETTINGS_THEME,
        payload: value
    };
};

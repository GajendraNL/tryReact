import { combineReducers } from 'redux';
import CityReducer from './CityReducer';
//import OffsetReducer from './OffsetReducer';
import RefreshChartReducer from './RefreshChartReducer';
import PlanetInfoReducer from './PlanetInfoReducer';
import NakshatraReducer from './NakshatraReducer';
import SettingsReducer from './SettingsReducer';
import SavedDataReducer from './SavedDataReducer';
import ThemeSetting from './ThemeSetting';


const rootReducer = combineReducers({
    cities: CityReducer,
    //offsets: OffsetReducer,
    refreshChart: RefreshChartReducer,
    planetInfo: PlanetInfoReducer,
    nakshatraDetails: NakshatraReducer,
    settings: SettingsReducer,
    saved_info: SavedDataReducer,
    themeSetting: ThemeSetting,
});

export default rootReducer;

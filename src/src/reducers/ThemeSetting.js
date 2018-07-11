import { SETTINGS_THEME } from '../actions/types';


const INITIAL_STATE = { theme_state: 0,
                          headerbg: '#AFB42B',
                          textColor: '#000000',
                          astroListbg: '#FAFAFA',
                          charts: '#DCE775',
                          chartsAS: '#7CB342',
                          card_bg: '#F0F4C3',
                          tarabalamRow1: '#FFEBEE',
                          tarabalamRow2: '#E8F5E9',
                          tarabalamHead: '#F0F4C3',
                        };

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SETTINGS_THEME:
            if (action.payload === 0) {
              return {
                        theme_state: action.payload,
                        headerbg: '#AFB42B',
                        textColor: '#000000',
                        astroListbg: '#FAFAFA',
                        charts: '#DCE775',
                        chartsAS: '#7CB342',
                        card_bg: '#F0F4C3',
                        tarabalamRow1: '#FFEBEE',
                        tarabalamRow2: '#E8F5E9',
                        tarabalamHead: '#F0F4C3',
                    };
            }
              return {
                  theme_state: action.payload,
                  headerbg: '#5A666B',
                  astroListbg: '#142634',
                  textColor: 'white',
                  charts: '#7E8889',
                  chartsAS: '#BDC7C1',
                  card_bg: '#546E7A',
                  tarabalamRow1: '#546E7A',
                  tarabalamRow2: '#142634',
                  tarabalamHead: '#142634',
                };

        default:
            return state;
    }
};

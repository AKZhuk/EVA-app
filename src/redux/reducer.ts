import { IAction, IState } from '../types';
import {
  RECEIVE_CEO,
  RECEIVE_CORPORATION,
  RECEIVE_FRACTIONS,
  RECEIVE_RACE,
  RECEIVE_SOLAR_SYSTEM,
  REQUEST_SEARCH_RESULT,
  SET_SEARCH_PARAM,
  RECEIVE_SEARCH_RESULT,
  SWITCH_POPUP,
} from './actions';

const defaultState: IState = {
  factions: [],
  solarSystems: [],
  corporations: [],
  CEOs: [],
  races: [],
  popUp: {
    isOpen: false,
    id: undefined,
    view: 'Corporation',
  },
  search: {
    param: {
      category: 'agent',
      searchString: '',
    },
    result: [],
    isSearch: false,
  },
};

const reducer = (state = defaultState, action: IAction) => {
  switch (action.type) {
    case SWITCH_POPUP:
      return { ...state, popUp: action.payload };
    case RECEIVE_FRACTIONS:
      return { ...state, factions: action.payload };
    case RECEIVE_SOLAR_SYSTEM:
      return { ...state, solarSystems: [...state.solarSystems, action.payload] };
    case RECEIVE_CORPORATION:
      return { ...state, corporations: [...state.corporations, action.payload] };
    case RECEIVE_CEO:
      return { ...state, CEOs: [...state.CEOs, action.payload] };
    case RECEIVE_RACE:
      return { ...state, races: action.payload };
    case SET_SEARCH_PARAM:
      return {
        ...state,
        search: { ...state.search, param: { ...state.search.param, ...action.payload } },
      };
    case REQUEST_SEARCH_RESULT:
      return { ...state, search: { ...state.search, result: [], isSearch: true } };

    case RECEIVE_SEARCH_RESULT:
      return { ...state, search: { ...state.search, result: action.payload, isSearch: false } };
    default:
      return state;
  }
};

export default reducer;

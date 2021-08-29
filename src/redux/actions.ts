import { Dispatch } from 'react';
import { ISearchResult } from '../components/Search/SearchDashboard';
import { categories } from '../components/Search/SearchForm';
import { IAction, ICeo, ICorporation, IFaction, IRace } from '../types';

export const BASE_URL = 'https://esi.evetech.net/legacy';
export const RECEIVE_FRACTIONS = 'RECIVE_FRACTIONS';
export const RECEIVE_SOLAR_SYSTEM = 'RECEIVE_SOLAR_SYSTEM';
export const RECEIVE_CORPORATION = 'RECEIVE_CORPORATION';
export const RECEIVE_CEO = 'RECEIVE_CEO';
export const RECEIVE_RACE = 'RECEIVE_RACE';
export const SWITCH_POPUP = 'SWITCH_POPUP';
export const REQUEST_SEARCH_RESULT = 'REQUEST_SARCH_RESULT';
export const RECEIVE_SEARCH_RESULT = 'RECEIVE_SEARCH_RESULT';
export const SET_SEARCH_PARAM = 'SET_SEARCH_PARAM';

export const switchPopUp = (flag: boolean, corporation_id: number | undefined = undefined, view?: string): IAction => ({
  type: SWITCH_POPUP,
  payload: { isOpen: flag, id: corporation_id, view: view },
});

export const receiveFactions = (data: IFaction[]): IAction => ({ type: RECEIVE_FRACTIONS, payload: data });

export const receiveSolarSystem = (data: IFaction): IAction => ({ type: RECEIVE_SOLAR_SYSTEM, payload: data });

export const receiveCorporation = (data: any): IAction => ({ type: RECEIVE_CORPORATION, payload: data });

export const setSearchParam = (data: {}): IAction => ({ type: SET_SEARCH_PARAM, payload: data });

export const requestSearchResult = (): IAction => ({ type: REQUEST_SEARCH_RESULT, payload: [] });

export const receiveSearchResult = (data: ISearchResult[]): IAction => ({ type: RECEIVE_SEARCH_RESULT, payload: data });

export const actionCombine: any = {
  'solar-system': {
    URL: 'universe/systems',
    action: (data: IFaction): IAction => ({ type: RECEIVE_SOLAR_SYSTEM, payload: data }),
  },
  factions: {
    URL: 'universe/factions',
    action: (data: IFaction[]): IAction => ({ type: RECEIVE_FRACTIONS, payload: data }),
  },

  corporation: {
    URL: 'corporations',
    middleWare: <T, U>(data: T, idx: U): T => ({ ...data, id: idx }),
    action: (data: ICorporation): IAction => ({ type: RECEIVE_CORPORATION, payload: data }),
  },
  CEO: {
    URL: 'characters',
    middleWare: <T extends ICeo>(data: T): T => {
      data.birthday = new Date(data.birthday).toLocaleDateString('en-US');
      return data;
    },
    action: (data: ICeo): IAction => ({ type: RECEIVE_CEO, payload: data }),
  },
  race: {
    URL: 'universe/races',
    action: (data: IRace): IAction => ({ type: RECEIVE_RACE, payload: data }),
  },
};

export const loadData = (type: keyof typeof actionCombine, id?: number) => {
  const { URL, middleWare, action } = actionCombine[type];
  return async function (dispatch: Dispatch<IAction>) {
    try {
      const response = await fetch(`${BASE_URL}/${URL}/${id ? id : ''}?language=en`);
      let data = await response.json();
      if (middleWare) {
        data = middleWare(data, id);
      }
      return dispatch(action(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const searchInventoryType = async (arrayOfId: any[]): Promise<ISearchResult[]> => {
  let response = await (
    await fetch(`${BASE_URL}/universe/names/`, {
      method: 'POST',
      body: JSON.stringify(arrayOfId),
    })
  ).json();
  return response.map((elem: { id: number; name: string }): ISearchResult => ({ id: elem.id, name: elem.name }));
};

const searchFactions = async (arrayOfId: any[]): Promise<ISearchResult[]> => {
  let factions: IFaction[] = await (await fetch(`${BASE_URL}/universe/factions/?language=en`)).json();
  return factions
    .filter((faction) => arrayOfId.includes(faction.faction_id))
    .map((elem: IFaction): ISearchResult => ({ name: elem.name, id: elem.faction_id }));
};

export const searchData = (category: string, searchString: string) => {
  return async function (dispatch: Dispatch<IAction>) {
    let searchResult: ISearchResult[] = [];
    dispatch(requestSearchResult());
    try {
      let response = await (
        await fetch(`${BASE_URL}/search?categories=${category}&search=${searchString}&language=en`)
      ).json();
      let foundIDs: Array<number> = response[category];

      if (foundIDs === undefined) {
        dispatch(receiveSearchResult([]));
        return;
      }

      if (category === 'faction') {
        searchResult = await searchFactions(foundIDs);
      } else if (category === 'inventory_type') {
        searchResult = await searchInventoryType(foundIDs);
      } else {
        const promises = foundIDs.map((val: number) => {
          const reqUrl = BASE_URL + categories[category as keyof typeof categories](val);
          return fetch(reqUrl);
        });
        const responses = await Promise.all(promises);
        const arrayOfName = await Promise.all(responses.map((r) => r.json()));
        console.log(category);
        if (category === 'station') {
          searchResult = foundIDs.map((elem: number, idx: number) => {
            return { id: elem, name: arrayOfName[idx].station_name };
          });
        } else {
          searchResult = foundIDs.map((elem: number, idx: number) => {
            return { id: elem, name: arrayOfName[idx].name };
          });
        }
      }

      dispatch(receiveSearchResult(searchResult));
    } catch (error) {
      console.error(error);
    }
  };
};

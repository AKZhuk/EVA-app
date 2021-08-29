import { Dispatch, SetStateAction } from 'react';
import { ISearchResult } from './components/Search/SearchDashboard';
import { searchCategories } from './components/Search/SearchForm';

export interface IAction {
  type: string;
  payload: any;
}

export interface IState {
  factions: IFaction[];
  solarSystems: ISolarSystem[];
  corporations: ICorporation[];
  races: IRace[];
  CEOs: ICeo[];
  popUp: {
    isOpen: boolean;
    id: number | undefined;
    view: 'Corporation' | 'Ceo';
  };
  search: {
    param: ISearchParam;
    result: ISearchResult[];
    isSearch: boolean;
  };
}

export interface IFaction {
  corporation_id: number;
  description: string;
  faction_id: number;
  is_unique: boolean;
  militia_corporation_id: number;
  name: string;
  size_factor: number;
  solar_system_id: number;
  station_count: number;
  station_system_count: number;
  solar_system_name?: string;
}

export interface ISolarSystem {
  constellation_id: number;
  name: string;
  planets: Object[];
  position: { x: number; y: number; z: number };
  security_status: number;
  star_id: number;
  stargates: number[];
  system_id: number;
}
export interface ICorporation {
  id: number;
  ceo_id: number;
  creator_id: number;
  description: string;
  home_station_id: number;
  member_count: 0;
  name: string;
  shares: number;
  tax_rate: number;
  ticker: string;
}

export interface ICeo {
  birthday: string;
  bloodline_id: number;
  corporation_id: number;
  description: string;
  gender: string;
  name: string;
  race_id: number;
  security_status: number;
}

export interface IRace {
  alliance_id: number;
  description: string;
  name: string;
  race_id: number;
}
export interface IFactionCardProps {
  data: IFaction;
}

export interface ISearchFormProps {
  setSearchResult: Dispatch<SetStateAction<ISearchResult[]>>;
}

interface ISearchParam {
  searchString: string;
  category: keyof typeof searchCategories;
}

export interface IFieldProps {
  title: string;
  value: string | number | undefined;
  clickHandler?: (e: MouseEvent) => void;
}

interface IActionCombineItem {
  URL: string;
  action: <T>(data: T) => IAction;
  middleWare?: <T>(data: T) => T;
}
export interface IActionCombine {
  'solar-system': IActionCombineItem;
  factions: IActionCombineItem;
  race: IActionCombineItem;
  corporation: {
    URL: string;
    middleWare: (data: ICorporation, idx: number) => ICorporation;
    action: (data: ICorporation) => IAction;
  };
  CEO: {
    URL: string;
    middleWare: (data: ICeo) => ICeo;
    action: (data: ICeo) => IAction;
  };
}

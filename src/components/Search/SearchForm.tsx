import { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchData, setSearchParam } from '../../redux/actions';
import { IState } from '../../types';

export const searchCategories = {
  agent: (id: number) => `/characters/${id}`,
  character: (id: number) => `/characters/${id}`,
  alliance: (id: number) => `/alliances/${id}`,
  constellation: (id: number) => `/universe/constellations/${id}/`,
  corporation: (id: number) => `/corporations/${id}/`,
  region: (id: number) => `/universe/regions/${id}/`,
  solar_system: (id: number) => `/universe/systems/${id}/`,
  station: (id: number) => `/universe/stations/${id}/`,
  faction: () => `/universe/factions/`,
  inventory_type: () => `/universe/names/`,
};

const SearchForm = (): JSX.Element => {
  const dispatch = useDispatch();
  const search = useSelector((state: IState) => state.search);
  const [errors, setErrors] = useState(' ');

  const validate = (value: string) => {
    if (!value) {
      setErrors('Заполните все обязательные поля');
      return;
    }
    value.length < 3 ? setErrors('Минимальное количество символов поискового запроса: 3') : setErrors('');
  };

  const handleInput = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    validate(e.target.value);
    dispatch(setSearchParam({ [e.target.name as keyof typeof searchCategories]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(searchData(search.param.category, search.param.searchString));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__group">
        <select name="category" className="form_item" value={search.param.category} onChange={handleInput}>
          {Object.keys(searchCategories).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="searchString"
          className={errors ? 'form_item form_item_error' : 'form_item'}
          placeholder="Search..."
          value={search.param.searchString}
          onChange={handleInput}
        />
        <input type="submit" className="form__submit-button" value="Search" disabled={errors ? true : false} />
      </div>
      <span className="form_item-helper">{errors}</span>
    </form>
  );
};

export default SearchForm;

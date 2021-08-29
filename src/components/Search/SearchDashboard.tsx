import { useSelector } from 'react-redux';
import { IState } from '../../types';
import SearchForm from './SearchForm';
import Loader from '../Loader';
import SearchResult from './SearchResult';

export interface ISearchResult {
  id: number;
  name: string;
}

const SearchDashboard = () => {
  const search = useSelector((state: IState) => state.search);
  return (
    <div>
      <SearchForm />
      {search.isSearch ? <Loader /> : <SearchResult />}
    </div>
  );
};

export default SearchDashboard;

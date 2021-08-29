import { useSelector } from 'react-redux';
import { IState } from '../../types';

const SearchResult = () => {
  let search = useSelector((state: IState) => state.search);
  return (
    <>
      {search.result.length > 0 ? (
        <div className="table-wrapper">
          <h4>Найдено: {search.result.length}</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {search.result.map((elem) => {
                return (
                  <tr key={elem.id}>
                    <td>{elem.name}</td>
                    <td>{elem.id}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <h2>По вашему запросу ничего не найдено</h2>
      )}
    </>
  );
};

export default SearchResult;

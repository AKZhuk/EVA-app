import { NavLink } from 'react-router-dom';

const Header = (): JSX.Element => {
  return (
    <header className="nav">
      <nav>
        <ul>
          <li>
            <NavLink exact data-hover="Factions" to="/" className="" activeClassName="current">
              Factions
            </NavLink>
          </li>
          <li className="nav__item">
            <NavLink data-hover="Search" to="/search" className="" activeClassName="current">
              Search
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

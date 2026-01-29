import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FiLogOut, FiSun, FiMoon } from "react-icons/fi";
import ThemeContext from "../contexts/ThemeContext";

function Navigation({ logout, name }) {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => (
        <nav className="navigation">
          <ul>
            <li>
              <Link to='/archives'>Terarsip</Link>
            </li>
            <li>
              <button onClick={toggleTheme} className="toggle-theme">
                {theme === 'light' ? <FiMoon /> : <FiSun />}
              </button>
            </li>
            <li>
              <button onClick={logout} className="button-logout">
                {name} <FiLogOut />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </ThemeContext.Consumer>
  );
}

Navigation.PropTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
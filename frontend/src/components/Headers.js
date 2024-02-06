import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pizzas">Pizzas</Link>
          </li>
          <li>
            <Link to="/restaurants">Restaurants</Link>
          </li>
          <li>
            <Link to="/restaurant_pizzas">Restaurant Pizzas</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

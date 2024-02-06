import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Pizzas from './Pizzas';
import Restaurants from './Restaurants';
import RestaurantPizzas from './RestaurantPizzas';

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pizzas" element={<Pizzas />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/restaurants/:id" element={<Restaurants />} />
          <Route path="/restaurant_pizzas" element={<RestaurantPizzas />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Header from './components/Headers';
import Pizzas from './components/Pizzas';
import Restaurants from './components/Restaurants';
import RestaurantPizzas from './components/RestaurantPizzas';

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

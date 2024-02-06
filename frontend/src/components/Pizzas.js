import React, { useEffect, useState } from 'react';

const Pizzas = () => {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5555/pizzas');
        const data = await response.json();
        setPizzas(data);
      } catch (error) {
        console.error('Error fetching pizzas:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Pizzas</h2>
      {pizzas.map((pizza) => (
        <div key={pizza.id}>
          <h3>{pizza.name}</h3>
          <p>Ingredients: {pizza.ingredients}</p>
          <ul>
            {pizza.prices.map((price) => {
              const key = `${price.restaurant_id}-${price.pizza_id}`;
              if (!key) {
                console.error('Invalid key:', key);
              }
              return (
                <li key={key}>
                  Price at Restaurant {price.restaurant_id}: ${price.price}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Pizzas;

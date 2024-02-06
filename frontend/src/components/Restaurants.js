import React, { useEffect, useState } from 'react';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5555/restaurants');
        const data = await response.json();
        setRestaurants(data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (restaurantId) => {
    try {
      const response = await fetch(`http://localhost:5555/restaurants/${restaurantId}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        // Update the state after successful deletion
        setRestaurants((prevRestaurants) =>
          prevRestaurants.filter((restaurant) => restaurant.id !== restaurantId)
        );
      } else {
        console.error('Error deleting restaurant:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting restaurant:', error);
    }
  };

  return (
    <div>
      <h2>Restaurants</h2>
      {restaurants.map((restaurant) => (
        <div key={restaurant.id}>
          <h3>
            {restaurant.name}{' '}
            <button onClick={() => handleDelete(restaurant.id)}>Delete</button>
          </h3>
          <p>Address: {restaurant.address}</p>
          <ul>
            {restaurant.pizzas.map((pizza) => (
              <li key={pizza.id}>
                Pizza: {pizza.name} - {pizza.ingredients}, Price: ${pizza.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Restaurants;

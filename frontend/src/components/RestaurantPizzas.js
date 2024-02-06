import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RestaurantPizzas = () => {
  const [formData, setFormData] = useState({
    pizza_name: '',
    restaurant_name: '',
    price: '',
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear previous error message when the user changes input
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate price
      const price = parseFloat(formData.price);
      if (isNaN(price) || price < 1 || price > 30) {
        setError('Invalid price. Please enter a price between 1 and 30.');
        return;
      }

      console.log('Sending data:', formData);

      const response = await fetch('http://localhost:5555/restaurant_pizzas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Response:', response);

      if (response.status === 201) {
        const data = await response.json();
        console.log('Restaurant Pizza created:', data);

        // Redirect to the corresponding restaurant page after successful creation
        navigate(`/restaurants/${formData.restaurant_id}`);
      } else {
        console.error('Error creating Restaurant Pizza:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating Restaurant Pizza:', error);
    }
  };

  return (
    <div>
      <h2>Create Restaurant Pizza</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Pizza Name:
          <input type="text" name="pizza_name" value={formData.pizza_name} onChange={handleChange} />
        </label>
        <label>
          Restaurant Name:
          <input type="text" name="restaurant_name" value={formData.restaurant_name} onChange={handleChange} />
        </label>
        <label>
          Price:
          <input type="text" name="price" value={formData.price} onChange={handleChange} />
        </label>
        <button type="submit">Create Restaurant Pizza</button>
      </form>
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default RestaurantPizzas;

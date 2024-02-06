from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Models
class Pizza(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    ingredients = db.Column(db.String(200), nullable=False)
    restaurants = db.relationship('RestaurantPizza', backref='pizza', lazy=True)

class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    pizzas = db.relationship('RestaurantPizza', backref='restaurant', lazy=True)

class RestaurantPizza(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.Float, nullable=False)
    pizza_id = db.Column(db.Integer, db.ForeignKey('pizza.id'), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)

@app.route('/pizzas', methods=['GET'])
def get_pizzas():
    pizzas = Pizza.query.all()
    pizzas_list = []

    for pizza in pizzas:
        pizza_data = {'id': pizza.id, 'name': pizza.name, 'ingredients': pizza.ingredients}
        pizza_data['prices'] = [{'restaurant_id': rp.restaurant_id, 'price': rp.price} for rp in pizza.restaurants]
        pizzas_list.append(pizza_data)

    return jsonify(pizzas_list)

@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    restaurants = Restaurant.query.all()
    restaurants_list = []

    for restaurant in restaurants:
        restaurant_data = {'id': restaurant.id, 'name': restaurant.name, 'address': restaurant.address}
        restaurant_data['pizzas'] = [{'id': rp.pizza_id, 'name': rp.pizza.name, 'ingredients': rp.pizza.ingredients, 'price': rp.price} for rp in restaurant.pizzas]
        restaurants_list.append(restaurant_data)

    return jsonify(restaurants_list)


@app.route('/restaurants/<int:restaurant_id>', methods=['GET'])
def get_restaurant(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)

    if not restaurant:
        return jsonify({"error": "Restaurant not found"}), 404

    restaurant_data = {'id': restaurant.id, 'name': restaurant.name, 'address': restaurant.address}

    # Get pizzas for the restaurant
    pizzas = Pizza.query.join(RestaurantPizza).filter_by(restaurant_id=restaurant.id).all()
    pizzas_list = [{'id': pizza.id, 'name': pizza.name, 'ingredients': pizza.ingredients} for pizza in pizzas]

    restaurant_data['pizzas'] = pizzas_list

    return jsonify(restaurant_data)

@app.route('/restaurants/<int:restaurant_id>', methods=['DELETE'])
def delete_restaurant(restaurant_id):
    restaurant = Restaurant.query.get(restaurant_id)
    if restaurant:
        RestaurantPizza.query.filter_by(restaurant_id=restaurant.id).delete()
        db.session.delete(restaurant)
        db.session.commit()
        return '', 204
    else:
        return jsonify({"error": "Restaurant not found"}), 404

@app.route('/restaurant_pizzas', methods=['POST'])
def create_restaurant_pizza():
    data = request.json

    pizza_name = data.get('pizza_name')
    restaurant_name = data.get('restaurant_name')
    price = data.get('price')

    # Validate input
    if not all((pizza_name, restaurant_name, price)):
        return jsonify({"error": "Incomplete data"}), 400

    # Check if pizza and restaurant exist
    pizza = Pizza.query.filter_by(name=pizza_name).first()
    restaurant = Restaurant.query.filter_by(name=restaurant_name).first()

    if not pizza or not restaurant:
        return jsonify({"error": "Invalid pizza_name or restaurant_name"}), 400

    # Create and save the RestaurantPizza
    restaurant_pizza = RestaurantPizza(price=price, pizza_id=pizza.id, restaurant_id=restaurant.id)
    db.session.add(restaurant_pizza)
    db.session.commit()

    # Fetch the Pizza data related to the created RestaurantPizza
    pizza_data = {'id': pizza.id, 'name': pizza.name, 'ingredients': pizza.ingredients}

    return jsonify({"success": "RestaurantPizza created successfully", "pizza": pizza_data}), 201

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, port=5555)

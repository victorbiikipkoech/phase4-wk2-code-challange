from flask import Flask
from app import db, Pizza, Restaurant, RestaurantPizza

# Create the Flask application
app = Flask(__name__)

# Define your database URI and other configuration here 
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize the Flask-SQLAlchemy extension
db.init_app(app)

# Create sample pizzas
with app.app_context():
    pizza1 = Pizza(name='Cheese', ingredients='Dough, Tomato Sauce, Cheese')
    pizza2 = Pizza(name='Pepperoni', ingredients='Dough, Tomato Sauce, Cheese, Pepperoni')

    # Create sample restaurants
    restaurant1 = Restaurant(name='Sottocasa NYC', address='298 Atlantic Ave, Brooklyn, NY 11201')
    restaurant2 = Restaurant(name='PizzArte', address='69 W 55th St, New York, NY 10019')

    # Create sample restaurant pizzas
    restaurant_pizza1 = RestaurantPizza(price=10, pizza=pizza1, restaurant=restaurant1)
    restaurant_pizza2 = RestaurantPizza(price=12, pizza=pizza2, restaurant=restaurant1)
    restaurant_pizza3 = RestaurantPizza(price=8, pizza=pizza1, restaurant=restaurant2)

    # Add to the session and commit to the database
    db.session.add_all([pizza1, pizza2, restaurant1, restaurant2, restaurant_pizza1, restaurant_pizza2, restaurant_pizza3])
    db.session.commit()

print('Sample data added to the database.')

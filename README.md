PROJECT NAME: THE VOUGHT STORE

DESC: This project is a Single Page Application (SPA) shopping cart system for my programming on the internet assignment.
What can you do with the site?:

View products (read)
Add items to a cart (create)
Update quantities (update)
Remove items from the cart(delete)
Account system
User auth system
live search bar that updates while the user types
admin account features

(basically CRUD Operations)

Things i used in the project->
Frontend: HTML, CSS, React.js

Backend: Node.js, Express.js, CORS, Body parser

Database: PostgreSQL

PROBLEMS I FACED:
1.Quantity issue while adding to cart
2.Fetching cart error

How I solved them: 1. First I made the product id uniqe in the database so there wont be any case of duplicate products then I updated the line that adds product to cart to check conflicts which would happen if the same product id get entered. Which after that updates the quantity of the conflicted product which solves the issue of duplicate products in cart.
2.fetching cart error was happening because of a basic API rotue issue which I solved after checking the route. Since I changed from vanilla javascript to react this was quite expected while writting the new code. So i just fixed the route lines and it solved the issue.

HOW THE SITE WORKS: 
Frontend loads products using fetch() from the backend. Dynamically updates the DOM and Handles user actions like: Add to cart, Update quantity, Delete item

On Backend RESTful API built with Express which Handles requests from frontend and Communicates with PostgreSQL database

Database stores products and cart data and uses SQL queries for CRUD operations

SETUP GUIDE->

1. clone the repo and make sure you are in the shopping cart folder(cd shoppingcart)
2. install dependencies with "npm install"
3. change deatils in the db.js file to your own details.
4. start server with "node server.js" line
5. start frontend by openning index in the browser.

DATA BASE SCRIPT -> use this script to create the tables for database
CREATE TABLE products ( id SERIAL PRIMARY KEY, name VARCHAR(100) NOT NULL, price NUMERIC(10,2) NOT NULL, description TEXT, image_url TEXT );

 CREATE TABLE cart ( id SERIAL PRIMARY KEY, product_id INT REFERENCES products(id) ON DELETE CASCADE, quantity INT DEFAULT 1 );


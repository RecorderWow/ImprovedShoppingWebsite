This project is a Single Page Application (SPA) shopping cart system for my programming on the internet assignment.
What can you do with the site?:

View products (read)
Add items to a cart (create)
Update quantities (update)
Remove items from the cart(delete)

(basically CRUD Operations)

Things i used in the project->
Frontend: HTML, CSS, Vanilla JavaScript (Fetch API)

Backend: Node.js, Express.js, CORS, Body parser

Database: PostgreSQL

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


TITLE: THE VOUGHT STORE - Full Stack Clothing Store

THE VOUGHT STORE is a modern full-stack e-commerce web application built using React, Node.js, Express, and PostgreSQL.

The purpose of this application is to simulate a real world online shopping platform where users can:

browse products
search products instantly
create accounts
securely log in
manage shopping carts
add/remove cart items
update cart quantities
interact with a responsive user interface
view all registered users(Admin)
view all shopping carts(Admin)

The application also includes an admin dashboard system that allows administrators to monitor all users and their shopping carts.



PROBLEM THIS WEBSITE SOLVES

Traditional small scale online stores often lack:

secure authentication systems
real time product search
role based administration
scalable backend architecture
proper cart management

THE VOUGHT STORE solves these problems by providing:

Secure user authentication using JWT
Persistent shopping cart management
Live product searching
Admin only dashboard access
Structured PostgreSQL database integration
Modern single page application experience

The project shows how a real e-commerce platform can be built using modern web development technologies.



TECHNICAL STACK:
Frontend: React.js, JavaScript, Vite, CSS-in-JS styling, React Hooks

Backend: Node.js, Express.js

Database: PostgreSQL

Authentication and Security: JWT (JSON Web Tokens), bcrypt password hashing



PROBLEMS I FACED:
1.Quantity issue while adding to cart
2.Fetching cart error

How I solved them: 

1. First I made the product id uniqe in the database so there wont be any case of duplicate products then I updated the line that adds product to cart to check conflicts which would happen if the same product id get entered. Which after that updates the quantity of the conflicted product which solves the issue of duplicate products in cart.

2.fetching cart error was happening because of a basic API rotue issue which I solved after checking the route. Since I changed from vanilla javascript to react this was quite expected while writting the new code. So i just fixed the route lines and it solved the issue.




SETUP GUIDE->
before starting the steps make sure you download Node.js, PostgreSQL and npm

1. clone the repo and make sure you are in the correct folder(cd ImprovedShoppingWebsite)
2. install dependencies with "npm install"
for backend "npm install express cors pg bcrypt jsonwebtoken dotenv"
for frontend "npm install react react-dom"
3. change deatils in the db.js file to your own details.
4. start server with "node server.js" line(must be in the backend folder)
5. start frontend with "npm run dev".(must be in the frontend folder)

DATA BASE SCRIPT -> use this script to create the tables for database
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price NUMERIC,
    image_url TEXT
);

CREATE TABLE cart (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) ON DELETE CASCADE,
    product_id INT REFERENCES products(id),
    quantity INT DEFAULT 1
);





FOLDER STRUCTURE

backend/
Contains all server-side logic

    routes/
    Contains API route handlers:

    auth.js : login/register routes
    products.js: product/cart routes
    admin.js: admin-only routes
    
    db.js: Handles PostgreSQL database connection

    server.js: Main Express server configuration

    .env: Stores environment variables securely

frontend/
Contains the React application.

    api/
    Handles all frontend API requests.

    components/
    Reusable UI components.

    context/
    Global authentication state using Context API.

    pages/
    Application pages/views.

    App.jsx: Main application router/controller.

    main.jsx: React entry point.

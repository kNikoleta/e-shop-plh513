Nikoleta Kopasi

This is a web application built using the Angular framework for the frontend and MySQL for the backend database. The application includes basic functionalities. LocalStorage is used to persist cart data even after a page refresh. There is no login service implemented, the core functionalities of the application are operational, as described below.

-My Products
    In this section, the user can:
    Add new products with details like title, image, price, and quantity.
    Update the price and quantity of an existing product.
    Delete a product from the list.

-Products
    This section displays all the available products that a user can purchase.
    Users can search for products by name.
    Each product is displayed with its name, image, and price.
    All products are fetched from the database using the Product Service.

-Orders
    This section shows all the orders placed by the user.
    Users can view their order history, which includes a list of purchased products and the total price.
    All orders are stored in the database and managed through the Order Service.

-Cart
    This section lists all the products the user has added to their shopping cart.
    Users can remove products from the cart or add the same product more than once.
    The cart data is saved in LocalStorage, ensuring that the cart persists after refreshing the page. Once the user completes their purchase, the cart data is sent to the Order Service.

How to Run the Application.

1. Open a terminal and navigate to the project directory.

2. Run the following command to build and start the application using Docker:
docker-compose up --build

3. Once the application is running, open your browser and go to:
http://localhost:4200/dashboard

4. The application should now be live and ready to use!

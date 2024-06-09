# E-Commerce Website

This project is an e-commerce website built using Angular. It includes two main user pathways: one for customers and another for sellers.

## Features

### Seller Pathway

1. _Seller Account:_

   - Users can create an account and log in as a seller.
   - Sellers can add new products with detailed information.

2. _Product Management:_
   - Sellers can manage their products, including editing and deleting products.

### Customer Pathway

1. _Product Browsing:_

   - Any user can browse and view products without logging in.
   - Users can view detailed information about each product.
   - Users can search for products using the search bar and view search results.

2. _Shopping Cart:_

   - Users can add products to their shopping cart without logging in.
   - Upon logging in or registering, the products added to the shopping cart will be transferred from local storage to the user's database profile.
   - Users can update product quantities in the cart.

3. _User Authentication:_

   - Users can create an account and log in as a customer.
   - Once logged in, users can manage their shopping cart and proceed to checkout.

4. _Shopping Cart Management:_

   - Users can view and manage their shopping cart contents.
   - The cart page provides a detailed invoice that includes tax, discounts, and the total cost of the products.

5. _Order Placement:_
   - Users can proceed to the order placement page to provide contact information and finalize their order.
   - Users can view their order history on the orders page.

## Usage

### As a Seller

1. _Creating and Managing Products:_
   - Log in as a seller.
   - Add new products with detailed information.
   - Edit or delete existing products as needed.

### As a Customer

1. _Browsing Products:_

   - Navigate through the product listings to find items of interest.
   - Click on a product to view more details.

2. _Adding to Cart:_

   - Add desired products to your shopping cart.
   - If you are not logged in, the cart contents will be saved locally.

3. _User Registration and Login:_

   - Register a new account or log in to an existing account as a customer.
   - Upon login, any items previously added to the cart will be transferred to your user profile.

4. _Managing the Cart:_

   - Go to the cart page to view all added products.
   - Adjust product quantities as needed.
   - Review the invoice for taxes, discounts, and total costs.

5. _Placing an Order:_
   - Proceed to the order page.
   - Enter your contact information and complete the order process.
   - View all past orders in the order history page.

### Technologies Used

- Angular
- RxJS for component interaction
- Services for state management
- JSON server for mock database and fake APIs
- Router guards for route protection

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

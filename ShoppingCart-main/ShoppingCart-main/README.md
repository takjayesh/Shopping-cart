# E-commerce for electronics (e-shop)

1. This application provides features where user can view the available products and add the items in the cart and purchase them by mentioning their quantity
2. Upon succesfully logggin-in to the application, user will be shown home page with curated, popular and price drop products
3. Logged in user will see the items in cart if there are any. In addition, user can update item quantiy, delete item from cart
4. Cart and other pages are available in header so that navigation is smooth.
5. In the application User has option to go back to the home page by clicking on Home option in header
6. User have option to logout any time in the application

### Login

1. This application accepts username which are
   a. Username should be combination of alphanumberic
   b. Username will not accept any special characters not even space in between username, failed to do so user will get user friendly error message
   c. Users cannot have username as "dog", failed to do so you will get the user friendly error message
   d. If user directly hit the "login" button with empty username, user will get the user friendly error message
2. With Successful login user will be navigated to the Home page where curated, popular products and price drop products are shown

### Logout

1. By clicking on Logout Button user will send back to the Login page
2. Cart Items of the user will be shown after the user logs back into application.
3. If the server is restarted, 

### Home Page

1. When user successfully login, home page will be shown as the default landing page
2. This page consists of the header, footer and content
3. In header, home and product navigation links are available for smooth user navigation. In addition, number of items in cart are displayed. 
4. By clicking on the Cart button, user will be directed to Cart page
5. Multiple sections are shown in the content of the page. Below are the sections:
    a. Price Drop Section : In this section, product with the price drop is shown 
    b. Popular Products Section : Popular products will have top 3 products purchased by user.
    c. Curated Products section : This section will display the curated products selected by professionals from e-shop 
6. Clicking on Show Now, will display Product catalog page

### Product catalog Page

1. Upon clicking on Shop Now, user will be show list of products.
2. Pagination is implemented from the back end, so that front end makes call for necessary products 
3. On product card, cart quantity is show and drop down to select the quantity is displayed
4. Upon clicking Add To Cart button, the product card will be displayed with item quantity on the product Catalog Page
5. For understanding the product in detail, clicking on the image of the product card will show individual product page

### Individual Product Page

1. Upon clicking on the image present in the product card, user will be shown with Product page with detailed information of the product
2. In the this page user have option to add, update item in the cart by selecting quantity from the drop down
3. In addition to the mentioned in previous comment, description, category and sub category will be shown for user to understand the product in detail
4. On clicking add to cart, item will be added with quantity

### Cart 

1. User can view all the items saved in cart with the quantity
2. Every item in cart will be displayed with original price and cart quantity is defined as number of unique items in cart
3. Checkout option is available for the user in case done with shopping.
4. On clicking on checkout, a message will be popped up informing that checkout is successful

## Installation

Use npm (node package manager) to install the node_modules which is required to run the project `npm install`

## To run the project

1. open the terminal and run `npm start` this will start running server
2. In second terminal run `npm run dev` this will run the frontend application
3. command `npm run build` will build the application with the necessary static files
4. `npm start` will start the front and backend application which will be running on same port


## Highlights of project

1. Userfriendly error message for the validation check wherever is applicable
2. Clicking on Cart shows the items added in cart with quantity with their total price on checkout
3. User can update, add and delete items of only his cart but not the cart of the user
4. Logout button is present in header which is displayed across all pages giving user privilege to log out of the application when needed
5. Use of font-awesome icons to display social media icons and spinner
6. Cart Application is built using REST APIs and appropriate API was used based on need 
7. User can go to individual product page by clicking on product card in the product Catalog page
8. User can add/update items in the cart from Productcatalog page and individual product page. In addition, user can delete the item from cart in cart page
9. Used `useContext` , `useReducer` and `useState` for state management across application
10. Used images from unsplash to display items in card for a better user experience and making the shopping simple
11. Pagination is implemented in the backed so that product catalog page will display limited number 


## Source of Image Used in Project

* All the images used in product Catalog and home page are taken from unsplash
* License : https://unsplash.com/license

## Worked on this project by 

NUID: 002775682
Name: Jayesh Tak
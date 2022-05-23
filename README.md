# AAU-Laundary-App-Node.js-Backend
This repository contains all the node js backend code for the AAU-Laundary Moblile app. The Server consists of serveral REST apis and uses JSON WEB TOKEN for authentication

To start this node js server, first you have to create a dot evnironment file at the root folder of the repository and provide the values of PORT, DB_CONNECTION_STRING, ACCESS_TOKEN_KEY and REFRESH_TOKEN_KEY.

**The API endpoints of the server are **

**FOR USER ROUTE**

  1. GET http://localhost:port/user/id  To get all user information
  2. POST http://localhost:port/user    To Create a new user 
  3. PUT http://localhost:port/user/id  TO update details of the user
  4. GET http://localhost:port/user/order To get all orders of the user
  5. DELETE http://localhost:port/user/id  To delete a user
  
**FOR ORDER ROUTE**

  1. GET http://localhost:port/order/id  To get all details of an order 
  2. POST http://localhost:port/order    To Create a new order 
  3. PUT http://localhost:port/order/id  TO update details of an existing order
  4. DELETE http://localhost:port/order/id  To delete an order

**FOR ORDER ROUTE**

  1. GET http://localhost:port/cloth/id  To get all details a cloth
  2. POST http://localhost:port/cloth    To Create a new cloth detail 
  3. PUT http://localhost:port/cloth/id  TO update details of an existing cloth
  4. DELETE http://localhost:port/cloth/id  To delete a cloth

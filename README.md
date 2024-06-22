# Booking Server

### Introduction
This is my first project which I made to get to familiar with the payments gateway.How to integrate them , How to work with them and how they work internally. I made a Server for this purpose which could further be utilised for the purpose of Frontend Development as everything is well defined.  


### Features
1. **User Authentication** - Protected user and authorization routes for anyone to work smoothely without the fear of security compromise. Authentication is done using JWT **(For NOW)**.

2. **Stripe Integration** - This is the payments gateway for the purpose of booking. This allows the user to pay again even after the transaction fails.

3. **Data Storage** - User's data , Hotel Information , Rooms Data everything is stored using the profound and secure cloud of MongoDB.

### Future Development
1. **Frontend Development** - Integration of server with the Frontend Technologies for greater user experience.

2. **Auth API Integration** - using the already implemented Authentication APIs for more secure Authentication as well as for more reliability.

### Technologies
- Database - MongoDB
- Backend - Express.js & Node.js
- Payment - Stripe

### How to use
1. Clone the repo
    ```
    git clone <The Repo Link>
    ```
2. Install the Dependencies
    ```
    npm i
    ```
3. Create Your Stripe Api Key 
```
go to https://stripe.com/in
```

4. create .env file
   - Create Variables
   ```
    STRIPE_PRIVATE_KEY = YOUR PRIVATE API KEY
    MONGO_URL = YOUR MONGO CLUSTER URI    
    PORT = YOUR SERVER PORT
    JWT_SECRET = RANDOM STRING 
    CLIENT_URL = FRONTEND URL
   ```
5. Run the server   
    ```
    npm start
    ```
    If you see "mongoDB disconnected!" and "Server has been         started successfully". 
    You Are Done!!
Thank You!

# Lima Backend
Server API made with Express.js for [lima-frontend](https://github.com/R-dVL/lima-frontend).


## Table of Contents
1. [Models](#Models)
2. [Routes](#Routes)
3. [Middlewares](#Middlewares)


## Models
Database models.


### Photo
Model for [Cat Watcher](https://github.com/R-dVL/cat-watcher) photos uploaded in MongoDB.


### User
User model for frontend protected routes.


### Tokens
Undefined expiration tokens saved in database.


## Routes
API HTTP Requests routes.


### auth
User auth routes.


### photos
[Cat Watcher](https://github.com/R-dVL/cat-watcher) CRUD.


### docker
Docker remote API wrapper to control connected applications.


## Middlewares
### authMiddleware
Private routes protection with JWT token.
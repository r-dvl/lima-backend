# Lima Backend
Rest API made with Express.js for [lima-frontend](https://github.com/R-dVL/lima-frontend).


## Contents
1. [Models](#Models)
2. [Routes](#Routes)
3. [Middlewares](#Middlewares)


## Models
Database models.


### Photo
Model for [cat-watcher](https://github.com/R-dVL/cat-watcher) photos uploaded in MongoDB.


### User
User model for frontend protected routes.


### Tokens
Undefined expiration tokens saved in database.


## Routes
API endpoints.


### auth
User auth routes.


### photos
[cat-watcher](https://github.com/R-dVL/cat-watcher) CRUD.


### docker
Docker remote API wrapper to control connected applications.


## Middlewares
### authMiddleware
Private routes protection with JWT token.


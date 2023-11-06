# Lima Backend
_Server API made with Express.js for [lima-frontend](https://github.com/R-dVL/lima-frontend)._


## Table of Contents
1. [Dependencies](#Dependencies)
2. [Project Structure](#Project%20Structure)
3. [Models](#Models)
4. [Routes](#Routes)


## Dependencies
- MongoDB


## Project Structure
~~~text
(root)
+- bin
|   +- www
+- models
|   +- Photo.js
|   +- User.js
+- routes
|   +- auth.js
|   +- photos.js
|   +- scripts.js
+- App.js
~~~


## Models
_Database models._


### Photo
Model for cat-watcher photos uploaded in MongoDB.


### User
User model for frontend protected routes.


## Routes
_API HTTP Requests routes._


### auth
User token auth routes.


### photos
GET, POST and DELETE Routes for photos shown in frontend.


### scripts
HTTP Requests for scripts that turn on/off cameras.


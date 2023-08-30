# Lima (backend)
Server API made with Express.js for __lima-frontend__ and __cat-watcher__.
> [lima-frontend](https://github.com/R-dVL/lima-frontend)
> [cat-watcher](https://github.com/R-dVL/cat-watcher)

## Dependencies
- MongoDB

## Structure
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
Database models.

### Photo
Model for cat-watcher photos uploaded in MongoDB.

### User
User model for frontend protected routes.

## Routes
API HTTP Requests routes.

### auth
User token auth routes.

### photos
GET, POST and DELETE Routes for photos shown in frontend.

### scripts
HTTP Requests for scripts that turn on/off cameras.

## TODO
- [ ] Improve camera activation to have less dependencies in host scripts.

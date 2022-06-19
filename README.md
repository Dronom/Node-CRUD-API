# Node-CRUD-API

to run in developer mode: npm run start:dev
to run in developer mode: npm run start:prod

Please, check the app using postman

App should create server on localhost:8000

commands to test:
GET api/users
get list of all users (I hold 2 test users for test)

GET api/users/{UserId}
get user with {UserId}

POST api/users
creates user, returns user data including id; for test: {
"username":"Roma",
"hobbies":["javascript"],
"age":22
}

PUT api/users/{UserId}
changes data of user with {UserId}. You may change all user field simultaneously and separately : {
"username":"Roman"}

DELETE api/users/{UserId}
deletes user from base

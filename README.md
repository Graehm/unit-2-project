# Blog API
In this project we download and practice data relationship by using a Node, Express and MongoDB app. The two data entities are demonstrated with a user and their post(s). Once a user is created, we can then apply CRUD (create, read, update and deleted) functionality to each of the data entities. 

View my [Trello board](https://trello.com/b/a2z1tiWO/unit-2-project) for a more detailed and structured analysis. 
## Prerequisites 
In preperation for this app to run and test on your device, you must have these packages and apps downloaded:
- node
- nodeman (download globally - Linux and Mac users must use "sudo npm i -g nodemon)
- postman
## App Set Up 
Follow these steps to launch the app:
1. clone this repository by clicking on the "<> Code" button and copy the SSH key. 
2. In the terminal, first type git clone followed by pasting the SSH key
3. cd into the directory, then cd into unit-2-project
4. open VScode with code 
5. create your .env file
6. Then inside the .env, place in your private MONGO_URI as well as a [hashed secret](https://emn178.github.io/online-tools/sha256.html)
7. type npm i or npm install
8. Start the app with by typying npm run dev or npm start!
## Automated Testing
In order to run automated testing
+ In the terminal type and enter "npm run test"
    - A passing test will be verified with a green PASS icon
In order to run load testing
+ In the terminal type and enter "npm run load"
    - *NOTE* the server must be linked in order for artillery to work
## Running the App
Now that the app is running, open Postman and manually test our CRUD functionality on either of the data entities. For a breakdown, follow these steps.
#### To Create a User
+ open Postman and connect to PORT 3000 "http://localhost:3000"
    - set the endpoint to /users
+ Postman method: POST
+ fill out required user info 
+ verify the data is set to *raw* and type *JSON*
+ press send

In Postman
```
{
    "name": "me",
    "username": "myself",
    "email": "and@gmail.com",
    "password": "i"
}
```
Postman Response
```
{
"user": {
        "name": "me",
        "username": "myself",
        "email": "and@gmail.com",
        "password": "$2b$08$UhNWW7sMag9u8Ojpx7aaS.3/vq9XAsDMW6N07P9neQnMQ904DbH9.",
        "post": [],
        "_id": "64a85c8feccaf13ee35f95c8",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE4NWM4ZmVjY2FmMTNlZTM1Zjk1YzgiLCJpYXQiOjE2ODg3NTUzNDR9.8fUCu2yQtPkkMaB6TngAEw9nzFTm0vP--tbQc0CYiSE"
}
```
#### To Login a User
+ add /login to the endpoint
+ Postman method: POST
+ press send 
+ with the updated user auth *token*, copy and paste the key into the "Authorization" tag in Postman
    - verify "Type" is set the Bearer Token
        * 
+ now you will be authorized to create, read, update and delete posts and your user id

Postman Response 
```
{
    "user": {
        "_id": "64a85c8feccaf13ee35f95c8",
        "name": "me",
        "username": "myself",
        "email": "and@gmail.com",
        "password": "$2b$08$UhNWW7sMag9u8Ojpx7aaS.3/vq9XAsDMW6N07P9neQnMQ904DbH9.",
        "post": [],
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE4NWM4ZmVjY2FmMTNlZTM1Zjk1YzgiLCJpYXQiOjE2ODg3NTU4NjJ9._nyTF8rnQ-Zb60sitvW8ieVruLtXa_fbBN-Vf46VEmE"
}
```
#### To Create a Post
+ delete the user endpoints in the URL and replace it with "/posts"
+ Postman method: POST
+ fill out the required post information

In Postman 
```
{
    "title": "The Title",
    "body": "A blog post about the title."
}
```
Postman Response 
```
{
    "title": "The Title",
    "body": "A blog post about the title.",
    "user": "64a85c8feccaf13ee35f95c8",
    "_id": "64a862070b4a0864294b98df",
    "__v": 0
}
```
#### To Read the specific Created Post 
+ Postman method: GET
+ In the URL after /posts/, attach the unique _id of the post to the end of the URL
+ press send
    - in order to view a list of all posts from all user, follow all steps apart from attached the post _id in the URL
    - Postman method: GET

Postman Response 
```
{
    "_id": "64a862070b4a0864294b98df",
    "title": "The Title",
    "body": "A blog post about the title.",
    "user": "64a85c8feccaf13ee35f95c8",
    "__v": 0
}
```
#### To Update a Specific Post
+ Postman method: PUT
+ copy the unique post _id and paste it into the URL after /posts/
+ make changes and edits to the blog post
+ press send 

In Postman
```
{
    "title": "In a Time, Not so far Away",
    "body": "online blogs will pop off again"
}
```
Postman Response 
```
{
    "_id": "64a862070b4a0864294b98df",
    "title": "In a Time, Not so far Away",
    "body": "online blogs will pop off again",
    "user": "64a85c8feccaf13ee35f95c8",
    "__v": 0
}
```
#### To Delete a Post
+ Postman method: DELETE
+ place the unique post _id onto the end of the URL after /posts/
+ verify the the data inside of the body of Postman is the same that is being displayed 
+ press send

In Postman
```
{
    "title": "In a Time, Not so far Away",
    "body": "online blogs will pop off again"
}
```
Postman Response
```
{
    returns a status of 1
}
```

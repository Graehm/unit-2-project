## h2 Blog API Application
# Blog API
In this project we download and practice data relationship by using a Node, Express and MongoDB app. The two data entities are demonstrated with a user and their post(s). Once a user is created, we can then apply CRUD (create, read, update and deleted) functionality to each of the data entities. 

View my [Trello board](https://trello.com/b/a2z1tiWO/unit-2-project) for a more detailed and structured analysis. 
## Prerequisites 
In preperation for this app to run and test on your device, you must have these packages and apps downloaded:
- node
- nodeman (download globally)
- postman
## App Set Up 
Follow these steps to launch the app:
1. clone this repository by clicking on the "<> Code" button and copy the SSH key. 
2. In the terminal, first type git clone followed by the SSH key...
3. type npm i or npm install...
4. create your .env file...
5. Then inside the .env, place in your private MONGO_URI as well as a [hashed secret](https://emn178.github.io/online-tools/sha256.html)..
6. Start the app with by typying npm run dev or npm start!
## Running the App
Now that the app is running, open Postman and manually test our CRUD functionality on either of the data entities. For a breakdown, follow these steps:
+ open Postman and connect to PORT 3000 "http://localhost:3000
    - set the endpoint to /users
+ Postman method: POST
+ fill out required user info 
+ verify the data is set to *raw* and type *JSON*
+ press send

Enter into Postman Body
```
{
    "name": "me",
    "username": "myself",
    "email": "and@gmail.com",
    "password": "i"
}
```
Postman response
```
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


# User Login and Registration App

This is a simple user login and registration app for registering patients built with Node.js, Express, MongoDB, and EJS for the front-end. The app allows users to register an account, log in, and view their profile details after successful login.

## Features

- User Registration: Patients can register an account by providing their First Name, Last Name, Mobile Number, Email, Username, Password, and Profile Picture.

- User Login: Registered patients can log in using their email and password credentials.

- Profile Details: After successful login, users can view their profile details, including First Name, Last Name, Mobile Number, Email, and Username.

## Installation

1. Clone the repository

2. Install dependencies: npm install

3.Change the URL in /routes/index.js at line 12,
mongodb+srv://dummyuser:<password>@cluster0.ftftqmv.mongodb.net/?retryWrites=true&w=majority

using your own cluster usernames and passwords. You can easily create a new cluster from MongoDB Atlas and connect it.

4. Then do npm run and you are all set!

## Dependencies

- Node.js
- Express
- MongoDB
- Mongoose
- EJS (Embedded JavaScript templates)
- express-session (for session management)
- express-fileupload (for file uploading support)
- dotenv (for managing environment variables)
- connect-mongo (for storing sessions in MongoDB)
- multer (for handling file uploads)

## Directory Structure

- `models`: Contains the Mongoose models for the MongoDB database.
- `routes`: Defines the application's routes and request handlers.
- `views`: Contains the EJS templates for rendering the front-end.
- `public`: Static assets like CSS, JS, and images.
- `server.js`: The main entry point of the application.

## Screenshots

![register](https://github.com/YasiruRuwantha/node-html-patient-dashboard/assets/31759902/89d7c3f0-e2aa-44fe-ba7b-b8561fb06869)

![mongodb](https://github.com/YasiruRuwantha/node-html-patient-dashboard/assets/31759902/f31091a6-efc9-4f55-a612-fd7037d5cb1b)

![login](https://github.com/YasiruRuwantha/node-html-patient-dashboard/assets/31759902/aa755b77-54c8-451f-bafd-cce5eb2caf12)

![profile](https://github.com/YasiruRuwantha/node-html-patient-dashboard/assets/31759902/9bbb19a4-3745-491d-914a-d7111060bfb4)


## Known Issues

- The profile picture uploading is not working properly


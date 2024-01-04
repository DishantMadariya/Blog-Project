
# Blog Project

This is a simple blog web application built with Node.js, Express.js, and MongoDB.


## Features

 - Admin login, logout, change password, edit profile 
 - Forgot Password,Reset Password 
 - Create, edit, delete blog posts
 - Categorize posts with categories and subcategories
 - Homepage slider/featured posts
 - Contact us page
 - Three Column Gallary
 - Manage posts,categories and subcategories in admin dashboard
 - Uses online MongoDB cluster database


## Usage

#### Install dependencies

```http
  npm init
  npm run dev
```
- Configure .env
- Copy the .env.example file to .env and update the MongoDB URI and other environment variables.

#### Get item

```http
  npm start
```
- This will start the node server on port 8005. The app will be available at localhost:8005

#### Admin credentials
 ```http {
  `"_id": {
    "$oid": "656731dd5c7e497ecb7aef26"
  },
  "name": "Manish Moradiya",
  "email": "manish@gmail.com",
  "password": "123",
  "discription": "k,ovmov",
  "city": "Surat",
  "gender": "Male",
  "hobby": ["Singing","Reading"],
  "adminImage": "/uploads/adminImages/adminImage-1701261789691",
  "isActive": true,
  "currentDate": "29/11/2023, 6:13:09 pm",
  "updateDate": "29/11/2023, 6:13:09 pm",
  "__v": 0
}` 
```
#### Customization
The app can be customized by editing code in the following folders:

 ```routes``` - Express route handlers

```models``` - MongoDB schemas

```controllers``` - request handlers

```views``` - EJS templates

#### Authentication

The app uses Passport.js for authentication along with express-session for managing user sessions.

Some relevant authentication related info:

#### Strategies

Local strategy for email/password based login

The app also has middleware for:

- Authentication check on protected routes

- Checking for admin role access

#### Pasport Usage

To implement authentication in a new app:

- Configure session and passport
- Add login/register routes and passport auth
- Use ```passport.checkAuthentication``` middleware on protected routes
- Access logged in user in templates via user variable The full implementation can be checked out in source code under [config/passportStrategy.js](https://github.com/DishantMadariya/Blog-Project-/blob/master/config/passportStrategy.js)

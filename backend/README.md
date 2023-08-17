# WebLedger-Assignment Documentation

Welcome to the API documentation for the WebLedger User Routes. This documentation covers the available routes, their functionalities, request formats, and responses.

## User Routes

### Register a New User

**Route**: `POST /users/register`

**Description**: Register a new user with the provided details.

**Request Body**:

| Field       | Type   | Description               |
| ----------- | ------ | ------------------------- |
| firstName  | String | The first name of the user. |
| lastName   | String | The last name of the user.  |
| email       | String | The email of the user.      |
| password    | String | The password of the user.   |
| age         | Number | The age of the user.        |

**Responses**:

- 201 (Created):
  ```json
  {
    "status": true,
    "message": "User registered successfully",
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "age": 30
    }
  }
  ```
- 400 (Bad Request):
  ```json
  {
    "status": false,
    "message": "Please provide all required fields."
  }
  ```
- 404 (Not Found):
  ```json
  {
    "status": false,
    "message": "User is already Registered."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "status": false,
    "message": "An error occurred while registering the user"
  }
  ```

### User Login

**Route**: `POST /users/login`

**Description**: Authenticate user login.

**Request Body**:

| Field       | Type   | Description               |
| ----------- | ------ | ------------------------- |
| email       | String | The email of the user.      |
| password    | String | The password of the user.   |

**Responses**:

- 200 (OK):
  ```json
  {
    "status": true,
    "msg": "Login successful",
    "token": "jwt_token",
    "user": {
      "id": "user_id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "age": 30
    }
  }
  ```
- 401 (Unauthorized):
  ```json
  {
    "status": false,
    "msg": "Invalid Password."
  }
  ```
- 404 (Not Found):
  ```json
  {
    "status": false,
    "msg": "User-Email is not Registered."
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "status": false,
    "msg": "An error occurred while logging in."
  }
  ```

### Update User Information by ID

**Route**: `PATCH /users/:id`

**Description**: Update user information by their ID.

**Request Body**:

| Field       | Type   | Description               |
| ----------- | ------ | ------------------------- |
| firstName  | String | The updated first name of the user. |
| lastName   | String | The updated last name of the user.  |
| age         | Number | The updated age of the user.        |

**Responses**:

- 200 (OK):
  ```json
  {
    "status": true,
    "message": "User updated successfully",
    "user": {
      "id": "user_id",
      "firstName": "Updated John",
      "lastName": "Updated Doe",
      "email": "john@example.com",
      "age": 35
    }
  }
  ```
- 404 (Not Found):
  ```json
  {
    "status": false,
    "message": "User not found"
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "status": false,
    "message": "An error occurred while updating the user"
  }
  ```

### Delete User by ID

**Route**: `DELETE /users/:id`

**Description**: Delete a user by their ID.

**Responses**:

- 200 (OK):
  ```json
  {
    "status": true,
    "message": "User deleted successfully"
  }
  ```
- 404 (Not Found):
  ```json
  {
    "status": false,
    "message": "User not found"
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "status": false,
    "message": "An error occurred while deleting the user"
  }
  ```

### Reset User Password

#### Request

- Method: POST
- URL: `/users/reset-password`
- Description: Reset the user's password.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "new_password"
}
```

**Responses:**

- 200 (OK):
  ```json
  {
    "status": true,
    "msg": "Password reset successful."
  }
  ```
- 404 (Not Found):
  ```json
  {
    "status": false,
    "msg": "User-Email-Id Not Found!"
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "status": false,
    "msg": "An error occurred while resetting the password."
  }
  ```

## Favorite Routes

### Add a Favorite Recipe

**Route**: POST /favorites/:id

**Description**: Add a recipe to the user's favorites.

**Request Headers**:
- Authorization: Bearer <token>

**Request Body**:

Field    | Type   | Description
-------- | ------ | ---------------------------
title    | String | The title of the recipe.
image    | String | The image URL of the recipe.

**Responses**:

- 201 (Created):
  ```json
  {
    "status": true,
    "data": {
      "id": "favorite_id",
      "title": "Chicken Curry",
      "image": "http://example.com/chicken-curry.jpg",
      "recipeID": "recipe_id",
      "userId": "user_id"
    },
    "msg": "Favorite recipe added successfully"
  }
  ```
- 400 (Bad Request):
  ```json
  {
    "status": false,
    "msg": "Invalid request data"
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "status": false,
    "msg": "An error occurred while adding the favorite recipe"
  }
  ```

### Get Favorite Recipes

**Route**: GET /favorites

**Description**: Retrieve user's favorite recipes.

**Request Headers**:
- Authorization: Bearer <token>

**Query Parameters**:

Parameter | Type   | Description
--------- | ------ | ---------------------------
id        | String | Get a favorite recipe by its ID.
title     | String | Get favorite recipes by title search.

**Responses**:

- 200 (OK):
  ```json
  {
    "status": true,
    "data": [
      {
        "id": "favorite_id",
        "title": "Chicken Curry",
        "image": "http://example.com/chicken-curry.jpg",
        "recipeID": "recipe_id",
        "userId": "user_id"
      },
      ...
    ]
  }
  ```
- 404 (Not Found):
  ```json
  {
    "status": false,
    "msg": "Favorite recipe not found"
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "status": false,
    "msg": "An error occurred while retrieving favorite recipes"
  }
  ```

### Delete Favorite Recipe

**Route**: DELETE /favorites/:id

**Description**: Delete a favorite recipe.

**Request Headers**:
- Authorization: Bearer <token>

**Responses**:

- 200 (OK):
  ```json
  {
    "status": true,
    "msg": "Favorite recipe deleted successfully"
  }
  ```
- 404 (Not Found):
  ```json
  {
    "status": false,
    "msg": "Favorite recipe not found"
  }
  ```
- 500 (Internal Server Error):
  ```json
  {
    "status": false,
    "msg": "An error occurred while deleting the favorite recipe"
  }
  ```

---



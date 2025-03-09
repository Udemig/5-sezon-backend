# Bookmark API Postman Guide

This guide explains how to use the Postman collection to test the Bookmark API endpoints.

## Setup

1. Import the `bookmark-app.postman_collection.json` file into Postman
2. Make sure your NestJS server is running (typically on http://localhost:3000)

## Environment Variables

The collection uses the following variables:

- `baseUrl`: The base URL of your API (default: http://localhost:3000)
- `accessToken`: Your JWT access token (automatically filled after login)
- `refreshToken`: Your JWT refresh token (automatically filled after login)

## Testing Authentication Flow

### 1. Create a New User

1. Open the "Signup" request in the "Auth" folder
2. The request body contains a sample user - modify if needed:
```json
{
  "email": "test@example.com",
  "password": "password123",
  "firstName": "Test",
  "lastName": "User"
}
```
3. Send the request
4. You should receive a response with `access_token` and `refresh_token`
5. Copy these tokens and set them in the environment variables if needed

### 2. Login

1. Open the "Login" request in the "Auth" folder
2. The request body should contain:
```json
{
  "email": "test@example.com",
  "password": "password123"
}
```
3. Send the request
4. You should receive `access_token` and `refresh_token`
5. These tokens will be used for subsequent authenticated requests

### 3. Test Protected Routes

Now that you have valid tokens, you can test protected routes:

1. Use the "Get Profile" request to retrieve user info
2. Use the "Get All Bookmarks" request to list bookmarks
3. Use the "Create Bookmark" request to add a new bookmark

### 4. Refresh Token

If your access token expires:

1. Open the "Refresh Token" request in the "Auth" folder
2. Make sure your `refreshToken` variable is set
3. Send the request
4. You should receive a new `access_token` and `refresh_token`

### 5. Logout

1. Open the "Logout" request
2. Send the request
3. The server will respond with a logout confirmation

## Automatic Token Handling

For more advanced usage, you can set up automatic token refresh using Postman's pre-request scripts and test scripts.

## Troubleshooting

- If you receive 401 Unauthorized errors, your token might have expired. Use the "Refresh Token" request.
- If the refresh token doesn't work, you may need to log in again.
- Ensure your server is running and accessible at the URL specified in the `baseUrl` variable. 
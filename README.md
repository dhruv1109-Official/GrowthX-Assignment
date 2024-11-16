# Project Documentation

## **1. Entry Point: `index.js`**
The `index.js` file is the starting point of the application. It initializes the Express server, connects to MongoDB, and sets up routes for admin and user functionalities.

### **Key Components**
- **Middleware**:
  - `express.json()`: Parses incoming JSON request bodies.
  - `cors()`: Enables Cross-Origin Resource Sharing, allowing requests from other domains.
  - `dotenv.config()`: Loads environment variables from a `.env` file.

- **Database Connection**:
  - **MongoDB Atlas**: The app connects to MongoDB using a URI stored in `process.env.MONGODB_URL`. It ensures scalability and security for storing application data.

- **Routing**:
  - **User Routes**: Prefixed with `/user` and handled via `userRoutes.js`.
  - **Admin Routes**: Prefixed with `/admin` and handled via `adminRoutes.js`.

- **Server Initialization**:
  - Starts the server on the port defined in `process.env.PORT`. If not specified, it defaults to port `5000`.

---

## **2. Routes**
The app is organized into two route files: `adminRoutes.js` and `userRoutes.js`. These define the endpoints for admin and user operations, respectively.

### **`adminRoutes.js`**
Handles routes for admins. All endpoints are protected using the `auth("admin")` middleware to restrict access to admins only.

- **Endpoints**:
  1. `GET /admin/assignments`: Fetches assignments assigned to the logged-in admin.
  2. `POST /admin/assignments/:id/accept`: Updates the status of an assignment to "accepted."
  3. `POST /admin/assignments/:id/reject`: Updates the status of an assignment to "rejected."

### **`userRoutes.js`**
Manages user and admin functionalities like registration, login, and uploading assignments. Most routes are protected using the `auth("user")` middleware to ensure only authenticated users can access them.

- **Endpoints**:
  1. `POST /user/register`: Registers a new user or admin with a hashed password.
  2. `POST /user/login`: Authenticates the user or admin and returns a JWT token.
  3. `POST /user/upload`: Allows a user to upload an assignment.
  4. `GET /user/admins`: Retrieves a list of all registered admins.

---

## **3. Controllers**
Controllers contain the logic for handling requests and interacting with the database.

### **`adminController.js`**
1. **getAssignments**: Fetches all assignments assigned to the logged-in admin using the `admin` field in the `assignment` collection.
2. **acceptAssignment**: Updates an assignment's status to "accepted" based on the provided `assignmentId`.
3. **rejectAssignment**: Updates an assignment's status to "rejected" based on the provided `assignmentId`.

### **`userController.js`**
1. **register**: Handles user/admin registration. Passwords are hashed using `bcrypt` before storing them in the database.
2. **login**: Verifies the username and password, then generates a JWT token with the user's details.
3. **uploadAssignment**: Allows a user to create and upload a new assignment.
4. **getAllAdmins**: Fetches all users with the role `admin`.

---

## **4. Models**
The project uses Mongoose to define schemas for MongoDB collections.

### **`user.js`**
Defines the schema for users (both admins and regular users):
- **Fields**:
  - `username`: A unique and required identifier for the user.
  - `password`: The hashed password for secure storage.
  - `role`: Enum to specify whether the user is an "admin" or a "user."
  
- Ensures data validation and prevents irrelevant inputs via `required` and `enum`.

### **`assignment.js`**
Defines the schema for assignments:
- **Fields**:
  - `assignmentId`: A unique identifier generated via `short-uuid`.
  - `userId`: The ID of the user who created the assignment.
  - `task`: The assignment description or content.
  - `admin`: The admin assigned to review the assignment.
  - `status`: Enum field with values: `pending`, `accepted`, or `rejected` (default: `pending`).
  - `createdAt`: A timestamp indicating when the assignment was created.

---

## **5. Middleware**
### **`auth.js`**
This file provides middleware for authentication and role-based authorization using JWT tokens.

1. **Authorization Process**:
   - Extracts the `Authorization` header.
   - Splits the header to retrieve the JWT token.
   - Verifies the token using the secret key (`"abcdefg"`).

2. **Role Verification**:
   - Checks if the role in the token matches the required role (e.g., "admin" or "user").
   - Attaches the user details (payload) to the request (`req.user`) for further use.

3. **Error Handling**:
   - Returns `401 Unauthorized` if the token is missing or invalid.
   - Returns `403 Forbidden` if the user's role does not match the required role.

---

## **6. Environment Variables (`.env`)**
### **Key Variables**
1. `MONGODB_URL`: Connection URI for MongoDB Atlas.
2. `PORT`: Port number for the server (defaults to `5000` if not provided).

---

## **7. Additional Information**
### **Dependencies**
The project uses the following key Node.js modules:
1. **Express**: For building REST APIs.
2. **Mongoose**: For connecting to MongoDB and defining schemas.
3. **Bcrypt**: For securely hashing passwords.
4. **JWT (jsonwebtoken)**: For user authentication and authorization.
5. **Dotenv**: For managing environment variables.
6. **Short-uuid**: For generating unique assignment IDs.

### **Development Workflow**
1. **Register** as a user or admin.
2. **Login** to receive a JWT token.
3. Use the **admin routes** to manage assignments or the **user routes** to upload assignments and fetch admin details.
4. All sensitive operations are secured using role-based JWT authentication.

---

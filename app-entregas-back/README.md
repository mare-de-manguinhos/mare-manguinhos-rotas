# Delivery App Backend

This project provides a back-end service for a delivery application, focusing on the delivery driver's workflow.

## Features

*   **In-Memory Data Store:** All data (users, deliveries) is managed in memory, suitable for a mock backend or small-scale applications.
*   **User Authentication:** Basic email/password login.
*   **Delivery Management:** CRUD operations for deliveries, including status updates.
*   **API Endpoints:** RESTful API endpoints for managing users and deliveries.

## Technologies Used

*   Node.js
*   Express.js
*   TypeScript
*   CORS

## Setup and Running

1.  **Clone the repository (if applicable).**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run in development mode (with hot-reloading):**
    ```bash
    npm run dev
    ```
4.  **Build for production:**
    ```bash
    npm run build
    ```
5.  **Start the production server:**
    ```bash
    npm run start
    ```

## API Endpoints

### Authentication (`/api/auth`)

*   `POST /api/auth/login`
    *   Payload: `{ "email": "...", "password": "..." }`
    *   Responds with user data (excluding password) and a mock session token on success (200 OK).
    *   Returns 401 Unauthorized on invalid credentials.

### Deliveries (`/api/deliveries`)

*   `GET /api/deliveries`
    *   Query Params: `?driverId=...` (Optional)
    *   Returns a list of deliveries, optionally filtered by `driverId`.
*   `GET /api/deliveries/:id`
    *   Returns a specific delivery by its ID or 404 Not Found.
*   `POST /api/deliveries`
    *   Payload: New delivery data.
    *   Creates a new delivery and returns it.
*   `PUT /api/deliveries/:id`
    *   Payload: Complete delivery object for update.
    *   Updates an existing delivery by its ID.
*   `PATCH /api/deliveries/:id/status`
    *   Payload: `{ "status": "ACCEPTED" | "DELIVERING" | "COMPLETED" }`
    *   Updates the status of a delivery. Sets `completedAt` timestamp if status becomes `COMPLETED`.
*   `DELETE /api/deliveries/:id`
    *   Deletes a delivery by its ID.

## Project Structure

```
.
├── dist/                  # Compiled JavaScript output
├── node_modules/          # Project dependencies
├── src/
│   ├── controllers/       # Request handling logic
│   ├── routes/            # API route definitions
│   ├── store/             # In-memory data store and mock data
│   ├── types/             # TypeScript interfaces and types
│   └── server.ts          # Main Express application setup
├── tsconfig.json          # TypeScript compiler configuration
├── package.json           # Project manifest and scripts
└── README.md              # Project documentation
```

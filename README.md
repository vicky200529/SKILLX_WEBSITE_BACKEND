# SKILLX Backend

Production-ready backend for the SKILLX platform built with Node.js, Express.js, MongoDB, and Socket.IO.

## Tech Stack

- **Runtime:** Node.js LTS
- **Framework:** Express.js
- **Database:** MongoDB Atlas + Mongoose ODM
- **Authentication:** JWT (Access + Refresh Tokens), bcrypt
- **Validation:** express-validator
- **Security:** Helmet, CORS, Rate Limiting, Mongo Sanitization, XSS Protection
- **Logging:** Morgan
- **Real-Time:** Socket.IO
- **Deployment:** Render

## Project Structure

```
src/
  config/         # App configuration and database connection
  controllers/    # Thin controllers delegating to services
  models/         # Mongoose schemas and models
  routes/         # Express route definitions
  middlewares/    # Auth, error handling, rate limiting, validation
  services/       # Business logic layer
  utils/          # Helpers (ApiError, ApiResponse, JWT, Email)
  validators/     # express-validator schemas
  sockets/        # Socket.IO event handlers
  app.js          # Express application setup
  server.js       # Entry point (HTTP server + Socket.IO)
```

## Installation

```bash
git clone git@github.com:vicky200529/SKILLX_WEBSITE_BACKEND.git
cd SKILLX_WEBSITE_BACKEND
npm install
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable            | Description                  |
| ------------------- | ---------------------------- |
| PORT                | Server port (default: 5000)  |
| NODE_ENV            | development / production     |
| MONGODB_URI         | MongoDB Atlas connection URI |
| JWT_ACCESS_SECRET   | Secret for access tokens     |
| JWT_REFRESH_SECRET  | Secret for refresh tokens    |
| CLIENT_URL          | Frontend URL for CORS        |

## Running the Server

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Health Check

```
GET /api/health
```

### Auth

| Method | Endpoint                  | Description        |
| ------ | ------------------------- | ------------------ |
| POST   | /api/auth/register        | Register a user    |
| POST   | /api/auth/login           | Login              |
| POST   | /api/auth/logout          | Logout             |
| POST   | /api/auth/refresh-token   | Refresh JWT        |
| POST   | /api/auth/forgot-password | Send reset email   |
| POST   | /api/auth/reset-password  | Reset password     |
| GET    | /api/auth/me              | Get current user   |

### User

| Method | Endpoint             | Description       |
| ------ | -------------------- | ----------------- |
| GET    | /api/users/profile   | Get profile       |
| PUT    | /api/users/profile   | Update profile    |
| DELETE | /api/users/profile   | Delete profile    |

### Translations

| Method | Endpoint                  | Description            |
| ------ | ------------------------- | ---------------------- |
| POST   | /api/translations         | Create translation     |
| GET    | /api/translations         | List translations      |
| GET    | /api/translations/:id     | Get translation by ID  |
| DELETE | /api/translations/:id     | Delete translation     |

### History

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| GET    | /api/history      | List history         |
| DELETE | /api/history/:id  | Delete history entry |

### Analytics

| Method | Endpoint                  | Description         |
| ------ | ------------------------- | ------------------- |
| GET    | /api/analytics/dashboard  | Dashboard analytics |

## API Response Format

```json
{
  "success": true,
  "message": "Operation successful",
  "data": {}
}
```

## Socket.IO

Connect with JWT token:

```js
const socket = io("ws://localhost:5000", {
  auth: { token: "Bearer <access_token>" },
});
```

### Events

| Event                   | Direction         | Description                |
| ----------------------- | ----------------- | -------------------------- |
| connected               | Server → Client   | Welcome message            |
| subscribe:notifications | Client → Server   | Subscribe to notifications |
| unsubscribe:notifications | Client → Server | Unsubscribe from notifications |

## Deployment (Render)

- **Root Directory:** `/`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Health Check Path:** `/api/health`
# SKILLX_WEBSITE_BACKEND

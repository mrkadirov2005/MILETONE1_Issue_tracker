# Issue Tracker - Full Stack Application

A complete issue tracking application with a React-based frontend and a Node.js/Express backend API. This application provides comprehensive issue management, labeling, and commenting capabilities.

---


**Frontend (Vercel):**
<!-- live version of frontend connected to backend and fully functioning -->
- 🔗 https://i-tracker.m-kadirov.uz/ 

<!-- AWS deployed backend -->
**Backend (AWS):**
- 🔗 https://shoppos.m-kadirov.uz


## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Frontend](#frontend)
- [Backend](#backend)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Technology Stack](#technology-stack)
- [Documentation](#documentation)

---

## 🎯 Project Overview

This project includes:

- **Issue Tracker API** - RESTful backend with PostgreSQL database
- **Issue Tracker Frontend** - Modern React application with Material-UI
- Full authentication with JWT tokens
- Complete CRUD operations for issues, labels, and comments
- Search, filtering, and pagination capabilities

---

## 🖥️ Frontend

A modern, feature-rich issue tracking application built with **React, TypeScript, and Material-UI**.

### ✨ Frontend Features

- 🔐 **Authentication** - Secure registration and login with JWT tokens
- 📋 **Issues Management** - Create, read, update, and delete issues
- 🏷️ **Labels** - Organize issues with reusable labels
- 💬 **Comments** - Add discussions to issues with Telegram-style chat UI
- 🔍 **Search & Filter** - Search by title, filter by status, priority, and labels
- 📄 **Pagination** - Navigate through large issue lists efficiently
- 🎨 **Modern UI** - Built with Material-UI for professional appearance

### 🛠️ Frontend Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type-safe code
- **Vite** - Fast build tool
- **React Router v7** - Client-side routing
- **React Query** - Server state management
- **Material-UI (MUI)** - Component library
- **Axios** - HTTP client with JWT interceptor
- **React Toastify** - Toast notifications

### 🚀 Frontend Quick Start

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   ```
   http://localhost:5173
   ```

> **Note:** No .env file configuration is required for the frontend. The API base URL is configured internally.

### 📁 Frontend Project Structure

```
frontend/
├── src/
│   ├── features/           # Feature modules
│   │   ├── auth/          # Authentication
│   │   ├── issue/         # Issues management
│   │   ├── comments/      # Comments
│   │   └── label/         # Labels
│   ├── shared/            # Shared utilities
│   │   ├── api/           # HTTP client setup
│   │   ├── layout/        # Layout components
│   │   ├── routes/        # Route definitions
│   │   └── utils/         # Utility functions
│   ├── App.tsx            # Root component
│   └── main.tsx           # Entry point
├── docs/                  # Documentation
└── package.json           # Dependencies
```

### 🏃 Frontend Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint   # Lint code
npm run db_con_checkk     #for checking the DB parameters
npm run db_setup  # for creating a database and coonnecting and creating the tables
```

---

## 🔧 Backend

A robust Node.js/Express backend API with PostgreSQL database and full TypeScript support.

### ✨ Backend Features

- **Issue Management** - Create, read, update, and delete issues with priority and status tracking
- **Label System** - Assign/unassign labels to issues with many-to-many relationships
- **Comments** - Add and manage comments on issues for collaboration
- **User Authentication** - Secure JWT-based authentication with refresh tokens
- **Interactive API Documentation** - Swagger/OpenAPI UI at `/api-docs`
- **Database** - PostgreSQL with UUID primary keys and full referential integrity
- **Type Safety** - Full TypeScript support for robust development

### 🛠️ Backend Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **PostgreSQL** - Database
- **TypeScript** - Type-safe development
- **JWT** - Token-based authentication
- **Swagger/OpenAPI** - API documentation

### 🚀 Backend Quick Start

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Copy environment configuration**
   ```bash
   cp .env.example .env
   ```

3. **Configure database settings**
   Fill in your `.env` file:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=postgres    //you own db name because the script will create anotehr database
   DB_USER=your_postgres_user
   DB_PASSWORD=your_postgres_password
   JWT_SECRET=your_jwt_secret_key
   REFRESH_TOKEN_SECRET=your_refresh_token_secret
   PORT=5000
   NODE_ENV=development
   ```

4. **Verify database connection**
   ```bash
   npm run db_con_check
   ```

5. **Setup database schema**
   ```bash
   npm run db_setup
   ```

6. **Verify connection again**
   ```bash
   npm run db_con_check
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

The server will be running on `http://localhost:5000`

Access the interactive API documentation at: `http://localhost:5000/api-docs`

### 📁 Backend Project Structure

```
backend/
├── src/
│   ├── config/              # Configuration files
│   │   ├── dbClient.ts      # Database client setup
│   │   ├── dbConnection.ts  # Connection pooling
│   │   ├── dbSetupNode.ts   # Node-postgres setup
│   │   └── swagger.ts       # Swagger/OpenAPI configuration
│   ├── controllers/         # Request handlers
│   │   ├── authControllers.ts
│   │   ├── issueController.ts
│   │   ├── labelControllers.ts
│   │   ├── commentControllers.ts
│   │   └── tokenControllers.ts
│   ├── services/            # Business logic
│   │   ├── authService.ts
│   │   ├── issueService.ts
│   │   ├── labelService.ts
│   │   └── commentService.ts
│   ├── repositories/        # Database queries
│   │   ├── userRepository.ts
│   │   ├── issueRepository.ts
│   │   ├── labelRepository.ts
│   │   ├── tokenRepository.ts
│   │   └── commentsRepository.ts
│   ├── routes/              # API route definitions
│   │   ├── auth_routes.ts
│   │   ├── issue_routes.ts
│   │   ├── label_routes.ts
│   │   ├── comment_routes.ts
│   │   └── token_routes.ts
│   ├── middlewares/         # Custom middleware
│   │   ├── tokenVerifyMiddleware.ts
│   │   ├── requestHeaderValidator.ts
│   │   ├── paramsValidator.ts
│   │   └── log/
│   │       └── logComingRoutes.ts
│   ├── utils/               # Utility functions and types
│   │   └── types.ts
│   ├── logs/                # Application logs
│   │   └── apiLogs.txt
│   ├── db/                  # Database scripts
│   │   ├── schema.sql       # PostgreSQL schema
│   │   └── dbSetupPsql.sh   # Database setup script
│   └── index.ts             # Application entry point
├── docs/                    # Documentation
└── package.json             # Dependencies
```

### 🏃 Backend Commands

```bash
npm run dev              # Start with auto-reload
npm run build            # Compile TypeScript
npm start                # Start production build
npm run watch            # Watch for TypeScript changes
npm run db_con_check     # Check database connection
npm run db_setup         # Initialize/setup database schema
```

### API Endpoints Overview

#### Authentication (2 endpoints)
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get access token

#### Issues (5 endpoints)
- `GET /issue/all` - Get all issues with optional filters
- `GET /issue/by_id/:id` - Get a specific issue
- `POST /issue/add` - Create a new issue
- `PUT /issue/update/:id` - Update an issue
- `DELETE /issue/delete/:id` - Delete an issue

#### Labels (6 endpoints)
- `GET /label/all` - Get all labels
- `POST /label/add` - Create a new label
- `POST /label/assign` - Assign label to issue
- `POST /label/unassign` - Unassign label from issue
- `PUT /label/update/:id` - Update a label
- `DELETE /label/delete/:id` - Delete a label

#### Comments (5 endpoints)
- `POST /comment/add` - Add comment to issue
- `GET /comment/issue/:id` - Get comments for an issue
- `GET /comment/user/:id` - Get comments by a user
- `PUT /comment/update/:id` - Update a comment
- `DELETE /comment/delete/:id` - Delete a comment

#### Token Management (1 endpoint)
- `POST /token/verify` - Verify and refresh access token

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16 or higher
- **npm** v7 or higher
- **PostgreSQL** installed and running
- Both backend and frontend should be running

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd MILETONE1_Issue_tracker
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Fill in your database configuration in .env
   npm run db_setup
   npm run dev
   ```

3. **Setup Frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install
   cp .env.example .env.local
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:5000
   - API Documentation: http://localhost:5000/api-docs

---


## 🔐 Authentication

### Frontend Authentication Flow

1. **Register** - Create a new account with email and password
2. **Login** - Sign in with your credentials
3. **Token Storage** - JWT token stored in browser localStorage
4. **Protected Routes** - Automatic route protection for authenticated users
5. **Auto-Logout** - Redirected to login if token expires

**Password Requirements:**
- Minimum 6 characters
- At least one number (0-9)
- At least one special character (!@#$%^&*)

Example: `Password123!`

---


## 🌐 Deployment

### Live Application

The application has been deployed and is accessible at:

**Frontend (Vercel):**
- 🔗 https://i-tracker.m-kadirov.uz/

**Backend (AWS):**
- 🔗 https://shoppos.m-kadirov.uz

Both services are connected to custom domain `m-kadirov.uz` and are production-ready.

---


## 🧪 API Testing

Use the included **Postman Collection** to test and validate API endpoints:

**File Location:** `backend/docs/issue_tracker.postman_collection.json` or `frontend/docs/issue_tracker.postman_collection.json`

**To Import:**
1. Open Postman
2. Click "Import"
3. Select `issue_tracker.postman_collection.json`
4. Configure base URL: `http://localhost:5000`
5. Start testing!

---

## 📚 Documentation

### Backend Documentation
- **Interactive Swagger UI**: http://localhost:5000/api-docs
- **[API Documentation](./backend/docs/API_DOCUMENTATION.md)**
- **[Technical Requirements](./backend/docs/technical_requirements.txt)**

### Frontend Documentation
- **[Getting Started Guide](./frontend/docs/GETTING_STARTED.md)**
- **[Project Structure](./frontend/docs/PROJECT_STRUCTURE.md)**
- **[Features Documentation](./frontend/docs/FEATURES.md)**
- **[Components Guide](./frontend/docs/COMPONENTS.md)**
- **[API Integration](./frontend/docs/API_INTEGRATION.md)**
- **[Development Guide](./frontend/docs/DEVELOPMENT.md)**
- **[Troubleshooting](./frontend/docs/TROUBLESHOOTING.md)**

---

## 🐛 Troubleshooting

### Common Issues

**"Cannot connect to API"**
- Ensure backend server is running on port 5000
- Check `VITE_API_BASE_URL` in `.env.local`

**"401 Unauthorized"**
- Log out and log in again
- Clear browser cache and localStorage

**"Database connection failed"**
- Verify PostgreSQL is running
- Check database credentials in `.env`
- Ensure database `issue_tracker` is created

**"Issues list is empty"**
- Create an issue using the green FAB button
- Check filters and search aren't too restrictive

For more help, see detailed troubleshooting guides in the respective documentation folders.

---

## ✅ Requirements Met

### Core Features
✅ Authentication (register/login)
✅ Issues CRUD operations
✅ Labels CRUD operations
✅ Comments (optional feature)
✅ Filtering & search
✅ Pagination

### Non-Functional Requirements
✅ Input validation
✅ JWT authentication
✅ Protected routes
✅ Error handling
✅ Proper HTTP status codes

### Tech Stack
✅ React + TypeScript
✅ Vite build tool
✅ React Router
✅ React Query
✅ Material-UI (single UI library)
✅ Node.js + Express Backend
✅ PostgreSQL Database
✅ No ORMs used

---

## 📄 License

This project is built as part of the **VENTION internship program - Milestone 1**.

---

## 📞 Support

For help with:
- **Setup issues** → Check Getting Started guides
- **Feature questions** → Review Features documentation
- **API details** → Check API Integration or Swagger UI
- **Common problems** → Check Troubleshooting guides
- **Development** → Read Development Guides

---

**Last Updated:** January 2026

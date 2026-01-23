# Issue Tracker Frontend

A modern, feature-rich issue tracking application built with React, TypeScript, and Material-UI. This frontend provides a comprehensive interface for managing issues, labels, and comments with pagination, filtering, and search capabilities.

## ✨ Features

- 🔐 **Authentication** - Secure registration and login with JWT tokens
- 📋 **Issues Management** - Create, read, update, and delete issues
- 🏷️ **Labels** - Organize issues with reusable labels
- 💬 **Comments** - Add discussions to issues (Telegram-style chat UI)
- 🔍 **Search & Filter** - Search by title, filter by status, priority, and labels
- 📄 **Pagination** - Navigate through large issue lists efficiently
- 🎨 **Modern UI** - Built with Material-UI for professional appearance

## 🛠️ Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type-safe code
- **Vite** - Fast build tool
- **React Router v7** - Client-side routing
- **React Query** - Server state management
- **Material-UI (MUI)** - Component library
- **Axios** - HTTP client with JWT interceptor
- **React Toastify** - Toast notifications

## 🚀 Quick Start

### Prerequisites
- **Node.js** v16 or higher
- **npm** v7 or higher
- **Backend server** running on `http://localhost:5000`

### Installation

1. **Install dependencies**
   ```bash
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

## 📖 Documentation

###### Complete documentation is available in the `/docs` folder:

- **[Getting Started](./docs/GETTING_STARTED.md)** - Detailed setup guide
- **[Project Structure](./docs/PROJECT_STRUCTURE.md)** - Architecture and folder organization
- **[Features](./docs/FEATURES.md)** - Feature descriptions and workflows
- **[Components Guide](./docs/COMPONENTS.md)** - Component reference
- **[API Integration](./docs/API_INTEGRATION.md)** - API communication patterns
- **[Database Schema](./docs/DATABASE_SCHEMA.md)** - Database structure and relationships
- **[Development Guide](./docs/DEVELOPMENT.md)** - Development workflow and best practices
- **[Troubleshooting](./docs/TROUBLESHOOTING.md)** - Common issues and solutions

## 🧪 API Testing

Use the included **Postman Collection** to test and validate API endpoints:

**File Location:** `docs/issue_tracker.postman_collection.json`

**To Import:**
1. Open Postman
2. Click "Import"
3. Select `issue_tracker.postman_collection.json`
4. Configure base URL: `http://localhost:5000`
5. Start testing!

## 📁 Project Structure

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
├── package.json           # Dependencies
├── .env.example           # Environment template
└── README.md              # This file
```

## 🏃 Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🔐 Authentication

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

## 🐛 Troubleshooting

### Common Issues

**"Cannot connect to API"**
- Ensure backend server is running on port 5000
- Check your network connection to localhost

**"401 Unauthorized"**
- Log out and log in again
- Clear browser cache and localStorage

**"Issues list is empty"**
- Create an issue using the green FAB button
- Check filters and search aren't too restrictive

For more help, see [Troubleshooting](./docs/TROUBLESHOOTING.md)

## 📝 Development

To understand the project structure and development workflow:

1. Read [Project Structure](./docs/PROJECT_STRUCTURE.md)
2. Review [Development Guide](./docs/DEVELOPMENT.md)
3. Check [Components Guide](./docs/COMPONENTS.md)

## 🚢 Production Build

```bash
# Build for production
npm run build

# The output will be in the 'dist' folder
# Deploy the dist folder to your hosting service
```

## 📞 Support & Documentation

- For setup issues → [Getting Started](./docs/GETTING_STARTED.md)
- For feature questions → [Features](./docs/FEATURES.md)
- For API details → [API Integration](./docs/API_INTEGRATION.md)
- For common problems → [Troubleshooting](./docs/TROUBLESHOOTING.md)
- For development → [Development Guide](./docs/DEVELOPMENT.md)

## 📋 Requirements Met

✅ **Core Features**
- Authentication (register/login)
- Issues CRUD operations
- Labels CRUD operations
- Comments (optional feature)
- Filtering & search
- Pagination

✅ **Non-Functional Requirements**
- Input validation
- JWT authentication
- Protected routes
- Error handling
- Proper HTTP status codes

✅ **Tech Stack**
- React + TypeScript
- Vite build tool
- React Router
- React Query
- Material-UI (single UI library)
- No ORMs used

## 📄 License

This project is built as part of the VENTION internship program.

---

**Last Updated:** January 2026 
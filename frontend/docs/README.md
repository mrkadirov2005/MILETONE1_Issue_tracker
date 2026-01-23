# Issue Tracker Frontend Documentation

Welcome to the Issue Tracker Frontend documentation. This guide covers everything you need to know about the project structure, features, setup, and development.

## 📚 Documentation Overview

- **[Getting Started](./GETTING_STARTED.md)** - Setup instructions and prerequisites
- **[Project Structure](./PROJECT_STRUCTURE.md)** - Folder organization and architecture
- **[Features](./FEATURES.md)** - Detailed feature documentation
- **[Components Guide](./COMPONENTS.md)** - Reusable components and their usage
- **[API Integration](./API_INTEGRATION.md)** - API communication and data flow
- **[Development Guide](./DEVELOPMENT.md)** - Development workflow and best practices
- **[Troubleshooting](./TROUBLESHOOTING.md)** - Common issues and solutions

## 🚀 Quick Start

```bash
# Install dependencies
npm install
# THE API CONSTANTS ARE IN The /shared/api/constats.ts
# Start development server
npm run dev
```

> **Note:** No .env file configuration is required for the frontend.

## 📖 Table of Contents by Topic

### For New Developers
1. Start with [Getting Started](./GETTING_STARTED.md)
2. Review [Project Structure](./PROJECT_STRUCTURE.md)
3. Check [Development Guide](./DEVELOPMENT.md)

### For Feature Development
1. Read [Features](./FEATURES.md)
2. Check [Components Guide](./COMPONENTS.md)
3. Review [API Integration](./API_INTEGRATION.md)

### For Troubleshooting
1. Check [Troubleshooting](./TROUBLESHOOTING.md)
2. Review error messages and common solutions

## 📁 Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | This file - documentation index |
| `GETTING_STARTED.md` | Installation and setup guide |
| `PROJECT_STRUCTURE.md` | Folder organization and architecture |
| `FEATURES.md` | Feature descriptions and usage |
| `COMPONENTS.md` | Component library and usage examples |
| `API_INTEGRATION.md` | API communication patterns |
| `DEVELOPMENT.md` | Development workflow and conventions |
| `TROUBLESHOOTING.md` | Common issues and solutions |

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **State Management**: React Query (TanStack Query)
- **HTTP Client**: Axios
- **Routing**: React Router v7
- **Notifications**: React Toastify

## 🏗️ Architecture

This project follows a **feature-based architecture**:

```
src/
├── features/          # Feature modules
│   ├── auth/         # Authentication feature
│   ├── issue/        # Issues management
│   ├── comments/     # Comments functionality
│   └── label/        # Labels management
├── shared/           # Shared utilities and components
│   ├── api/          # HTTP client setup
│   ├── layout/       # Layout components
│   ├── routes/       # Route definitions
│   └── utils/        # Utility functions
└── App.tsx           # Root component
```

## 📝 Key Concepts

### Feature-Based Architecture
Each feature is self-contained with its own:
- API layer
- React Query hooks
- Components
- Types

### Query Management
Using React Query for server state:
- Caching
- Synchronization
- Automatic refetching

### Error Handling
Centralized error handling with:
- Toast notifications
- Proper HTTP status codes
- User-friendly messages

## 🔗 Useful Links

- [Backend Documentation](../backend/docs) - Backend API docs
- [API Documentation](../src/docs/API_DOCUMENTATION.md) - API endpoint reference
- [React Query Docs](https://tanstack.com/query/latest)
- [Material-UI Docs](https://mui.com/)

## 📞 Support

For issues or questions:
1. Check [Troubleshooting](./TROUBLESHOOTING.md)
2. Review relevant feature documentation
3. Check the [Development Guide](./DEVELOPMENT.md)

---

Last Updated: January 2026

# Issue Tracker API - Backend

## Quick Start Setup Guide

Follow these steps in order to set up the project:

### 1. Install Dependencies
```bash
npm install
```

### 2. Copy Environment Configuration
Copy the contents of the `.env.example` file into the `.env` file:
```bash
cp .env.example .env
```

### 3. Configure Database Settings
Fill the contents of the `.env` file with your DB configuration, especially `DB_NAME`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=postgres //existing database name should be entered , it will not create tables inside itit will create another database called issue_tracker
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
JWT_SECRET=your_jwt_secret_key
REFRESH_TOKEN_SECRET=your_refresh_token_secret
PORT=5000
NODE_ENV=development
```

### 4. Verify Database Connection
Run the database connection check to verify your configuration:
```bash
npm run db_con_check
```

### 5. Setup Database Schema
Run the database setup command which will:
- Log in to your PostgreSQL database
- Create a database called `issue_tracker`
- Create all necessary tables and schemas
- Automatically update the `DB_NAME` in the `.env` file if needed
```bash
npm run db_setup
```

### 6. Verify Connection Again
Run the database connection check one more time to ensure everything is properly set up:
```bash
npm run db_con_check
```

### 7. Start the Development Server
Finally, start the development server:
```bash
npm run dev
```

The server will be running on `http://localhost:5000`

Access the interactive API documentation at: `http://localhost:5000/api-docs`


## more detailed docs are available in the /doc folder in the root
---

## Features

- **Issue Management**: Create, read, update, and delete issues with priority and status tracking
- **Label System**: Assign/unassign labels to issues with many-to-many relationships
- **Comments**: Add and manage comments on issues for collaboration
- **User Authentication**: Secure JWT-based authentication with refresh tokens
- **Interactive API Documentation**: Swagger/OpenAPI UI at `/api-docs`
- **Database**: PostgreSQL with UUID primary keys and full referential integrity
- **Type Safety**: Full TypeScript support for robust development

## Project Structure

```
src/
├── config/              # Configuration files
│   ├── dbClient.ts      # Database client setup
│   ├── dbConnection.ts  # Connection pooling
│   ├── dbSetupNode.ts   # Node-postgres setup
│   └── swagger.ts       # Swagger/OpenAPI configuration
├── controllers/         # Request handlers
│   ├── authControllers.ts
│   ├── issueController.ts
│   ├── labelControllers.ts
│   ├── commentControllers.ts
│   └── tokenControllers.ts
├── services/            # Business logic
│   ├── authService.ts
│   ├── issueService.ts
│   ├── labelService.ts
│   └── commentService.ts
├── repositories/        # Database queries
│   ├── userRepository.ts
│   ├── issueRepository.ts
│   ├── labelRepository.ts
│   ├── tokenRepository.ts
│   └── commentsRepository.ts
├── routes/              # API route definitions
│   ├── auth_routes.ts
│   ├── issue_routes.ts
│   ├── label_routes.ts
│   ├── comment_routes.ts
│   └── token_routes.ts
├── middlewares/         # Custom middleware
│   ├── tokenVerifyMiddleware.ts
│   ├── requestHeaderValidator.ts
│   ├── requestBodyValidator.ts
│   └── paramsValidator.ts
├── utils/               # Utility functions and types
│   └── types.ts
├── logs/                # Application logs
│   └── apiLogs.txt
├── db/                  # Database scripts
│   ├── schema.sql       # PostgreSQL schema
│   └── dbSetupPsql.sh   # Database setup script
└── index.ts             # Application entry point
```

## Common Commands

### Development
```bash
npm run dev                # Start with auto-reload
npm run build              # Compile TypeScript
npm start                  # Start production build
npm run watch              # Watch for TypeScript changes
```

### Database
```bash
npm run db_con_check       # Check database connection
npm run db_setup           # Initialize/setup database schema
```

## API Endpoints Overview

### Authentication (2 endpoints)
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get access token

### Issues (5 endpoints)
- `GET /issue/all` - Get all issues with optional filters
- `GET /issue/by_id/:id` - Get a specific issue
- `POST /issue/add` - Create a new issue
- `PUT /issue/update/:id` - Update an issue
- `DELETE /issue/delete/:id` - Delete an issue

### Labels (6 endpoints)
- `GET /label/all` - Get all labels
- `POST /label/add` - Create a new label
- `POST /label/assign` - Assign label to issue
- `POST /label/unassign` - Unassign label from issue
- `PUT /label/update/:id` - Update a label
- `DELETE /label/delete/:id` - Delete a label

### Comments (5 endpoints)
- `POST /comment/add` - Add comment to issue
- `GET /comment/issue/:id` - Get comments for an issue
- `GET /comment/user/:id` - Get comments by a user
- `PUT /comment/update/:id` - Update a comment
- `DELETE /comment/delete/:id` - Delete a comment

### Token Management (1 endpoint)
- `POST /token/verify` - Verify and refresh access token

## Documentation

- **Interactive Swagger UI**: http://localhost:5000/api-docs
- **Static API Docs**: See [API_DOCUMENTATION.md](docs/API_DOCUMENTATION.md)

## Support

For issues and questions:
1. Check [API Documentation](docs/API_DOCUMENTATION.md)
2. Review [Swagger UI](http://localhost:5000/api-docs)
3. Check application logs in `logs/apiLogs.txt`

## License

This project is part of the Vention Internship Program - Milestone 1.
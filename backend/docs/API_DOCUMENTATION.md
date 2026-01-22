# Issue Tracker API Documentation

## Overview
The Issue Tracker API is a comprehensive REST API for managing issues, labels, comments, and user authentication. It provides full CRUD operations for tracking and managing project issues.

## Base URL
```
http://localhost:5000
```

## Authentication
Most endpoints require JWT (JSON Web Token) authentication. Include the token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

Obtain a token by logging in via the `/auth/login` endpoint.

---

## Table of Contents
1. [Authentication Endpoints](#authentication-endpoints)
2. [Issue Endpoints](#issue-endpoints)
3. [Label Endpoints](#label-endpoints)
4. [Comment Endpoints](#comment-endpoints)
5. [Token Endpoints](#token-endpoints)
6. [Error Handling](#error-handling)

---

## Authentication Endpoints

### 1. Register User
**Endpoint:** `POST /auth/register`

**Description:** Create a new user account.

**Request Body:**
```json
{
  "user_email": "user@example.com",
  "user_password": "SecurePassword123$"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "user_email": "user@example.com"
  }
}
```

**Error (400 Bad Request):**
```json
{
  "error": "User with this email already exists"
}
```

---

### 2. Login User
**Endpoint:** `POST /auth/login`

**Description:** Authenticate user and receive JWT tokens.

**Request Body:**
```json
{
  "user_email": "user@example.com",
  "user_password": "SecurePassword123$"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error (401 Unauthorized):**
```json
{
  "error": "Invalid credentials"
}
```

---

## Issue Endpoints

### 3. Create Issue
**Endpoint:** `POST /issue/add`

**Authentication:** Required ✅

**Description:** Create a new issue.

**Request Body:**
```json
{
  "issue_details": "Fix login button styling",
  "issue_status": "todo",
  "issue_priority": "high",
  "created_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Parameters:**
- `issue_details` (string, required): Detailed description of the issue
- `issue_status` (string, required): Status of the issue
  - Allowed values: `todo`, `in-progress`, `done`, `cancelled`
- `issue_priority` (string, required): Priority level
  - Allowed values: `low`, `medium`, `high`
- `created_by` (UUID, required): ID of the user creating the issue

**Response (201 Created):**
```json
{
  "issue_id": "660e8400-e29b-41d4-a716-446655440001",
  "issue_details": "Fix login button styling",
  "issue_status": "todo",
  "issue_priority": "high",
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2026-01-23T10:30:00Z",
  "updated_at": "2026-01-23T10:30:00Z"
}
```

---

### 4. Get Issue by ID
**Endpoint:** `GET /issue/by_id`

**Authentication:** Required ✅

**Description:** Retrieve a specific issue with all associated labels.

**Headers:**
```
Authorization: Bearer <token>
issue_id: 660e8400-e29b-41d4-a716-446655440001
```

**Response (200 OK):**
```json
{
  "issue_id": "660e8400-e29b-41d4-a716-446655440001",
  "issue_details": "Fix login button styling",
  "issue_status": "todo",
  "issue_priority": "high",
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2026-01-23T10:30:00Z",
  "updated_at": "2026-01-23T10:30:00Z",
  "labels": [
    {
      "label_id": "770e8400-e29b-41d4-a716-446655440002",
      "label_name": "Bug"
    }
  ]
}
```

**Error (404 Not Found):**
```json
{
  "error": "Issue not found"
}
```

---

### 5. Get All Issues
**Endpoint:** `GET /issue/all`

**Authentication:** Required ✅

**Description:** Retrieve all issues with optional filtering and pagination.

**Query Parameters:**
- `limit` (integer, optional): Items per page (default: 10, max: 100)
- `page` (integer, optional): Page number (default: 1)
- `search` (string, optional): Search in issue details
- `status` (string, optional): Filter by status (`todo`, `in-progress`, `done`, `cancelled`)
- `priority` (string, optional): Filter by priority (`low`, `medium`, `high`)
- `label` (string, optional): Filter by label name

**Example Request:**
```
GET /issue/all?limit=10&page=1&status=todo&priority=high&label=Bug
```

**Response (200 OK):**
```json
{
  "data": [
    {
      "issue_id": "660e8400-e29b-41d4-a716-446655440001",
      "issue_details": "Fix login button styling",
      "issue_status": "todo",
      "issue_priority": "high",
      "created_by": "550e8400-e29b-41d4-a716-446655440000",
      "created_at": "2026-01-23T10:30:00Z",
      "updated_at": "2026-01-23T10:30:00Z",
      "labels": [
        {
          "label_id": "770e8400-e29b-41d4-a716-446655440002",
          "label_name": "Bug"
        }
      ]
    }
  ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 25
  }
}
```

---

### 6. Update Issue
**Endpoint:** `PUT /issue/update`

**Authentication:** Required ✅

**Description:** Update an existing issue. Only the issue creator can update it.

**Request Body:**
```json
{
  "issue_id": "660e8400-e29b-41d4-a716-446655440001",
  "issue_details": "Fix login button styling - updated",
  "issue_status": "in-progress",
  "issue_priority": "medium",
  "created_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response (200 OK):**
```json
{
  "issue_id": "660e8400-e29b-41d4-a716-446655440001",
  "issue_details": "Fix login button styling - updated",
  "issue_status": "in-progress",
  "issue_priority": "medium",
  "created_by": "550e8400-e29b-41d4-a716-446655440000",
  "updated_at": "2026-01-23T11:45:00Z"
}
```

**Error (403 Forbidden):**
```json
{
  "error": "Unauthorized: You can only update your own issues"
}
```

---

### 7. Delete Issue
**Endpoint:** `DELETE /issue/delete`

**Authentication:** Required ✅

**Description:** Delete an issue. Only the issue creator can delete it.

**Headers:**
```
Authorization: Bearer <token>
issue_id: 660e8400-e29b-41d4-a716-446655440001
```

**Request Body:**
```json
{
  "created_by": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response (200 OK):**
```json
{
  "message": "Issue deleted successfully"
}
```

**Error (403 Forbidden):**
```json
{
  "error": "Unauthorized: You can only delete your own issues"
}
```

---

## Label Endpoints

### 8. Create Label
**Endpoint:** `POST /label/add`

**Authentication:** Required ✅

**Description:** Create a new label for organizing issues.

**Request Body:**
```json
{
  "label_name": "Bug",
  "user_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "label_id": "770e8400-e29b-41d4-a716-446655440002",
    "label_name": "Bug",
    "user_id": "550e8400-e29b-41d4-a716-446655440000"
  }
}
```

**Error (400 Bad Request):**
```json
{
  "error": "Label with this name already exists for this user"
}
```

---

### 9. Get All Labels
**Endpoint:** `GET /label/all`

**Authentication:** Required ✅

**Description:** Retrieve all available labels.

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "label_id": "770e8400-e29b-41d4-a716-446655440002",
      "label_name": "Bug",
      "user_id": "550e8400-e29b-41d4-a716-446655440000"
    },
    {
      "label_id": "880e8400-e29b-41d4-a716-446655440003",
      "label_name": "Feature",
      "user_id": "550e8400-e29b-41d4-a716-446655440000"
    }
  ]
}
```

---

### 10. Assign Label to Issue
**Endpoint:** `POST /label/assign`

**Authentication:** Required ✅

**Description:** Assign a label to an issue.

**Request Body:**
```json
{
  "issue_id": "660e8400-e29b-41d4-a716-446655440001",
  "label_id": "770e8400-e29b-41d4-a716-446655440002"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": true
}
```

**Error (400 Bad Request):**
```json
{
  "error": "This label is already assigned to the issue"
}
```

---

### 11. Update Label
**Endpoint:** `PUT /label/update`

**Authentication:** Required ✅

**Description:** Update a label. Only the label owner can update it.

**Request Body:**
```json
{
  "label_id": "770e8400-e29b-41d4-a716-446655440002",
  "label_name": "Critical Bug",
  "user_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": true
}
```

**Error (403 Forbidden):**
```json
{
  "error": "You are not allowed to update this label"
}
```

---

### 12. Delete Label
**Endpoint:** `DELETE /label/delete`

**Authentication:** Required ✅

**Description:** Delete a label. Only the label owner can delete it.

**Request Body:**
```json
{
  "label_id": "770e8400-e29b-41d4-a716-446655440002",
  "user_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": true
}
```

**Error (400 Bad Request):**
```json
{
  "error": "Label not found"
}
```

---

### 13. Unassign Label from Issue
**Endpoint:** `POST /label/unassign`

**Authentication:** Required ✅

**Description:** Remove a label from an issue.

**Request Body:**
```json
{
  "issue_id": "660e8400-e29b-41d4-a716-446655440001",
  "label_id": "770e8400-e29b-41d4-a716-446655440002"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": true
}
```

**Error (400 Bad Request):**
```json
{
  "error": "Label is not assigned to this issue"
}
```

---

## Comment Endpoints

### 14. Create Comment
**Endpoint:** `POST /comment/add`

**Authentication:** Required ✅

**Description:** Add a comment to an issue.

**Request Body:**
```json
{
  "comment_details": "This needs urgent attention",
  "issue_id": "660e8400-e29b-41d4-a716-446655440001",
  "user_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response (201 Created):**
```json
{
  "comment_id": "990e8400-e29b-41d4-a716-446655440004",
  "comment_details": "This needs urgent attention",
  "issue_id": "660e8400-e29b-41d4-a716-446655440001",
  "user_id": "550e8400-e29b-41d4-a716-446655440000",
  "created_at": "2026-01-23T12:00:00Z"
}
```

---

### 15. Get Comments by Issue
**Endpoint:** `GET /comment/issue`

**Authentication:** Required ✅

**Description:** Retrieve all comments for a specific issue.

**Headers:**
```
Authorization: Bearer <token>
issue_id: 660e8400-e29b-41d4-a716-446655440001
```

**Response (200 OK):**
```json
[
  {
    "comment_id": "990e8400-e29b-41d4-a716-446655440004",
    "comment_details": "This needs urgent attention",
    "issue_id": "660e8400-e29b-41d4-a716-446655440001",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2026-01-23T12:00:00Z",
    "updated_at": "2026-01-23T12:00:00Z"
  }
]
```

---

### 16. Get Comments by User
**Endpoint:** `GET /comment/user`

**Authentication:** Required ✅

**Description:** Retrieve all comments made by a specific user.

**Request Body:**
```json
{
  "user_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response (200 OK):**
```json
[
  {
    "comment_id": "990e8400-e29b-41d4-a716-446655440004",
    "comment_details": "This needs urgent attention",
    "issue_id": "660e8400-e29b-41d4-a716-446655440001",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "created_at": "2026-01-23T12:00:00Z",
    "updated_at": "2026-01-23T12:00:00Z"
  }
]
```

---

### 17. Update Comment
**Endpoint:** `PUT /comment/update`

**Authentication:** Required ✅

**Description:** Update a comment. Only the comment author can update it.

**Request Body:**
```json
{
  "comment_id": "990e8400-e29b-41d4-a716-446655440004",
  "comment_details": "Updated comment text",
  "user_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response (200 OK):**
```json
{
  "comment_id": "990e8400-e29b-41d4-a716-446655440004",
  "comment_details": "Updated comment text",
  "updated_at": "2026-01-23T12:15:00Z"
}
```

---

### 18. Delete Comment
**Endpoint:** `DELETE /comment/delete`

**Authentication:** Required ✅

**Description:** Delete a comment. Only the comment author can delete it.

**Request Body:**
```json
{
  "comment_id": "990e8400-e29b-41d4-a716-446655440004",
  "user_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": true
}
```

**Error (403 Forbidden):**
```json
{
  "error": "Could not delete comment"
}
```

---

## Token Endpoints

### 19. Verify Token
**Endpoint:** `GET /token/verify`

**Authentication:** Required ✅

**Description:** Verify if the current JWT token is valid.

**Response (200 OK):**
```json
{
  "valid": true,
  "message": "Token is valid"
}
```

**Error (401 Unauthorized):**
```json
{
  "error": "Invalid or missing token"
}
```

---

## Error Handling

### Common HTTP Status Codes

| Status Code | Description |
|---|---|
| 200 | OK - Request successful |
| 201 | Created - Resource successfully created |
| 400 | Bad Request - Invalid request parameters |
| 401 | Unauthorized - Authentication failed or missing |
| 403 | Forbidden - Access denied (e.g., updating someone else's issue) |
| 404 | Not Found - Resource not found |
| 500 | Internal Server Error - Server-side error |

### Error Response Format

All error responses follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

---

## Rate Limiting

Currently, there are no rate limits implemented. In production, rate limiting should be added to prevent abuse.

---

## Best Practices

1. **Always include the Authorization header** for protected endpoints
2. **Use pagination** when fetching large datasets (use `limit` and `page` parameters)
3. **Validate input** before sending requests
4. **Handle errors gracefully** in your client application
5. **Keep tokens secure** and never expose them in logs or version control
6. **Use HTTPS in production** for secure communication

---

## Swagger Documentation

For interactive API documentation with the ability to test endpoints directly, visit:

```
http://localhost:5000/api-docs
```

The Swagger UI provides:
- Complete endpoint documentation
- Request/response schemas
- Try-it-out functionality to test endpoints
- Authentication token management

---

## Support

For issues or questions about the API, please refer to the project repository or contact the development team.

**Last Updated:** January 23, 2026  
**API Version:** 1.0.0

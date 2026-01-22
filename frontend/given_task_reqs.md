
Your task is to build an Issue Tracker using the knowledge and technologies covered during the first part of the internship.
The goal of this milestone is to evaluate your ability to design, implement, and document a small but realistic fullstack application with clear separation of concerns, correct TypeScript usage, and predictable behavior.


Tech stack
Backend
Frontend
Tech constraints
Non-Functional Requirements
Required Edge Cases
Project scope
Core Features
Frontend UI
Optional features
Core Data Entities
User
Issue
Comment (Optional)
Label
Deliverables
Definition of Done
AI Usage
Evaluation Criteria



Tech stack
Backend

TypeScript
Node.js
Express
PostgreSQL
Raw SQL only (no ORM, no query builders)
Frontend

TypeScript
React
Vite
React Router
React Query
One UI library only: MUI or ShadCN


Tech constraints

No ORMs or query builders (Prisma, TypeORM, Sequelize, Knex, etc.)
No backend frameworks other than Express
No multiple UI libraries
No usage of prebuilt issue tracker templates or starter dashboards
No putting business logic inside UI components or route handlers
No use of any in the codebase. Allowed only with a proper code comment explaining the reasoning
Backend SQL queries must be parameterized
Frontend global state only if justified (Context / Redux / Zustand)


Non-Functional Requirements

Request body, route params, and query params must be correctly validated
Validation errors must return proper HTTP status codes
Backend must handle errors in a predictable and consistent format
Email + password authentication and related data security
JWT-based authentication
Protected backend routes
Frontend route guarding
Pagination for list endpoints (issues list)
Proper documentation with:Clear setup steps
Swagger (or equivalent) API documentation
Database schema diagram
Required Edge Cases
You must correctly handle:

Missing or invalid input data
Accessing protected routes without authentication
Requesting non-existent issues
Invalid pagination parameters
Deleting issues that have related data (e.g. labels, comments if implemented)


Project scope
Core Features
The following features are required for task completion. If you don't have one or more features listed below, your submission will not be counted. 
1. Authentication

Registration with email and password
Login with email and password
Out of scope:

Refresh tokens
OAuth/social login
Password recovery flow
2. Issues

Create issue
List issues (with pagination)
View issue details
Update issue
Delete issue
3. Labels

Create labels (project-wide)
Assign labels to issues
Filter issues by label
4. Filtering & Search

Filter issues by status 
Search issues by title 
Pagination must work together with filters/search 
Frontend UI

Issues table with:Filters
Search input
Pagination controls
Create issue form
Issue detail page:Issue fields
Edit issue form
Assigned labels
Example UI:

Optional features
Optional features are not required for completion but may positively impact evaluation if implemented correctly.
1. Comments

Add comment to issue
List comments per issue (paginated)
Soft deletes for comments 
Optimistic UI updates for comments
2. Auth

Refresh tokens for login
3. Issues

Assign issue to a user
4. Filtering & Search

Filter issues by assignee
Sorting by:Priority
Status
Updated date


Core Data Entities
User
Represents an authenticated system user:

Identified by email
Can create issues and comments
Can be assigned issues
Notes:

Passwords must be stored securely
Issue
Represents a trackable unit of work or problem:

Has a single creator
Has a status and priority
Can be associated with multiple labels
Notes:

Status values: todo, in-progress, done, cancelled
Priority values: low, medium, high
Deleting an issue must respect existing relations
Comment (Optional)
Represents a discussion entry attached to an issue:

Always belongs to exactly one issue
Has a single author
Content is required
Notes:

Must not exist without an issue
Required only if the Comments feature is implemented
Label
Represents a reusable classification tag:

Created once and reused across issues
Issues can have multiple labels
Labels can be associated with multiple issues
Notes:

Relationship between issues and labels is many-to-many
Label deletion should consider existing associations


Deliverables

GitHub repository: /backend  
/frontend    
Working backend endpoints (tested manually) 
Frontend UI covering all core flows 
README.md including: Setup & run instructions 
API documentation with examples 
Schema diagram 
.env.example for backend and frontend repositories
Demo video (uploaded to OneDrive) 


Definition of Done
The project is considered complete when:

All core features are implemented 
API endpoints follow a consistent structure 
TypeScript is used correctly throughout the project 
Project can be run locally using the README


AI Usage
AI tools are allowed and expected.
Blind copying or lack of understanding is not acceptable.
You may use AI for:

Syntax help
Boilerplate code generation
Explaining concepts
Debugging errors
TypeScript typing help
Code autocompletion
Requirements:

You must understand and be able to explain your own code
AI-generated code must be adapted to project constraints
AI usage must respect all assignment rules
Red flags that will lower evaluation:

Inconsistent coding style across files
Unused abstractions or patterns that don’t fit the project
Code the author cannot explain during review
ORM-like abstractions despite raw SQL requirement
Overengineered solutions with no justification
Large chunks of copied code that violate constraints
Automatic failure cases:

Copying full projects or templates using AI
Submitting code you do not understand
Using AI to bypass assignment restrictions
During review, mentors may ask:

"Why did you structure this this way?"
"What problem does this abstraction solve?"
"What alternatives did you consider?"
Inability to answer indicates insufficient ownership, regardless of functionality and may lead to disqualification


Evaluation Criteria

Correctness and completeness: 40% 
Code structure and readability: 25% 
TypeScript usage and typing quality: 20% 
API & error design: 10% 
Documentation quality: 5% 

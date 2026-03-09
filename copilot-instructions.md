# Secure Notes App - Copilot Instructions

## Project Overview
**Secure Notes App** - A full-stack web application for creating and managing encrypted notes with cloud sync, rich text editing, and dark mode support.

**Tech Stack:**
- Frontend: React with Redux for state management
- Backend: Node.js/Express server
- Database: MongoDB for data persistence
- Authentication: JWT tokens
- Encryption: AES-256 for note encryption
- Rich Text: TipTap editor

**Features:**
- User Authentication (Sign up, Login, Logout)
- End-to-end encryption for all notes
- Cloud sync across devices
- Dark/Light mode theme support
- Rich text editing with formatting
- Full-text search functionality
- Create, read, update, delete notes
- Note categories/tags
- Responsive design

## Development Checklist

- [x] Project requirements clarified
- [ ] React frontend scaffolded
- [ ] Node.js backend scaffolded
- [ ] Database schema defined
- [ ] Authentication system implemented
- [ ] Encryption utilities created
- [ ] API endpoints implemented
- [ ] Frontend components created
- [ ] Dark mode theme implemented
- [ ] Search functionality added
- [ ] Dependencies installed and verified
- [ ] Project compiles without errors
- [ ] Development server can start

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)

### Installation
See README.md for detailed setup instructions.

### Running the Project
- Backend: `npm run dev` (from server directory)
- Frontend: `npm start` (from client directory)

## Key Files & Directories
- `/server` - Express backend server
- `/client` - React frontend application
- `/server/.env` - Environment variables (create from .env.example)
- `/client/src/components` - React components
- `/client/src/pages` - Page components
- `/server/routes` - API routes
- `/server/models` - MongoDB schemas

# Issue Tracker

A simple issue tracking application built with Angular and ASP.NET Core.

## Features

- Create, read, update, and delete issues
- Modern and responsive UI
- RESTful API backend

## Prerequisites

- Node.js (v14 or later)
- .NET 6.0 SDK or later
- Angular CLI

## Setup

### Backend

1. Navigate to the backend directory:

   ```bash
   cd issue-tracker-backend
   ```

2. Restore dependencies:

   ```bash
   dotnet restore
   ```

3. Run the application:
   ```bash
   dotnet run
   ```

The backend API will be available at `https://localhost:7211`.

### Frontend

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   ng serve
   ```

The frontend application will be available at `http://localhost:4200`.

## Project Structure

- `frontend/` - Angular application
- `issue-tracker-backend/` - ASP.NET Core Web API

## API Endpoints

- GET `/api/issues` - Get all issues
- GET `/api/issues/{id}` - Get issue by ID
- POST `/api/issues` - Create new issue
- PUT `/api/issues/{id}` - Update issue
- DELETE `/api/issues/{id}` - Delete issue

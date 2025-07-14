# Mood Tracker App

## Overview

Mood Tracker is a web application that allows users to register, log in, and track their mood on a daily basis. Users can post their mood for each day and review their mood trends by month. The app helps users gain insights into their emotional well-being over time.

## Features

- **User Registration & Login:** Secure authentication for users.
- **Daily Mood Posting:** Submit your mood for each day.
- **Monthly Mood Overview:** View your mood history and trends per month.
- **RESTful API:** Backend endpoints follow REST principles.

## Technology Stack

- **Frontend:** React
- **Backend:** Python (FastAPI)
- **Database:** PostgreSQL 17 (AWS RDS)
- **Containerization:** Docker
- **Cloud Hosting:** AWS ECS (Elastic Container Service)
    - Cluster with one service for frontend and backend
    - RDS for PostgreSQL database
    - App Load Balancer for traffic management
- **Docker Images:** Stored in AWS ECR (Elastic Container Registry) private repositories
- **CI/CD:** GitHub Actions
    - Automatic builds a docker image and deployment
    - Updates ECS task definition and redeploys service

## Live App

Access the deployed application via the [App Load Balancer DNS](http://mood-tracker-alb-542910875.eu-north-1.elb.amazonaws.com).

## Architecture

```
[User] <---> [App Load Balancer] <---> [ECS Service: Frontend (React)]
                                     <---> [ECS Service: Backend (FastAPI)]
                                                    |
                                              [AWS RDS: PostgreSQL]
```

## Getting Started

### Prerequisites

- Docker
- AWS account
- Node.js & npm (for React)
- Python 3.12 (for FastAPI)
- PostgreSQL

### Local Development

#### Backend

1. Clone the repo and navigate to the backend directory.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run FastAPI server:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

#### Frontend

1. Navigate to the frontend directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```

#### Database

- Set up a PostgreSQL instance locally or connect to AWS RDS.
- Configure environment variables for DB connection.

### Deployment

1. Build Docker images for frontend and backend:
   ```bash
   docker build -t mood-tracker-frontend ./frontend
   docker build -t mood-tracker-backend ./backend
   ```
2. Push images to AWS ECR.
3. Deploy on AWS ECS using your cluster and service configuration.
4. Ensure App Load Balancer routes traffic to frontend and backend services.
5. Connect AWS RDS to the backend for persistent storage.

### CI/CD

- GitHub Actions workflow automatically builds and pushes Docker images to ECR.
- The workflow updates ECS task definitions and redeploys services upon new commits.

## API Documentation

- The FastAPI backend provides interactive API docs at `/docs`.

## Environment Variables
### 1. Backend:
- `DATABASE_URL`: postgresql://[username]:[password]@localhost:5432/mood_tracker - *Postgres connection string*
- `SECRET_KEY`: [your-key] - *the secret key for hashing the password*
- `DEBUG`:True - *for production set to False*
- `ALLOWED_ORIGINS`: http://localhost:3000,... - *comma delimited paths for the frontend*

### 2. Frontend:
REACT_APP_API_URL=http://localhost:8000 - *the url to the api from python*

### 3. AWS Deployment
- `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` / `AWS_REGION`
- Other variables for ECS and frontend/backend configuration as needed.

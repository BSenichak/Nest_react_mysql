# Project Title: NestJS, React, and MySQL Full-Stack Application

## Description
This project is a full-stack application demonstrating the integration of a NestJS backend API, a React frontend, and a MySQL database, all orchestrated with Docker Compose.

## Features
- **Backend:** Robust RESTful API built with NestJS and TypeScript.
- **Frontend:** Dynamic user interface developed with React and TypeScript, powered by Vite.
- **Database:** Persistent data storage using MySQL.
- **Containerization:** Seamless development and deployment using Docker and Docker Compose.

## Technologies Used
- **Backend:**
    - NestJS
    - TypeScript
    - Node.js
- **Frontend:**
    - React
    - TypeScript
    - Vite
    - Node.js
- **Database:**
    - MySQL
- **Orchestration:**
    - Docker
    - Docker Compose

## Getting Started

### Prerequisites
Before running this project, ensure you have the following installed:
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (includes Docker Engine and Docker Compose)

### Installation and Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd nest-react-mysql # (assuming this is the root directory name)
    ```

2.  **Build and run the containers:**
    Navigate to the root directory of the project (where `docker-compose.yml` is located) and run:
    ```bash
    docker-compose up --build -d
    ```
    This command will:
    - Build the `backend` and `frontend` Docker images.
    - Start the `db` (MySQL), `backend`, and `frontend` services.
    - The `-d` flag runs the containers in detached mode (in the background).

3.  **Access the applications:**
    - **Frontend:** http://localhost:5173
    - **Backend API:** http://localhost:3000
    - **MySQL Database:** Accessible on `localhost:3307` (You can use a tool like MySQL Workbench or DataGrip to connect).

### Stopping the applications
To stop and remove the running containers, networks, and volumes, run:
```bash
docker-compose down
```

## Project Structure

```
.
├── backend/                  # NestJS backend application
│   ├── src/                  # Source code
│   ├── Dockerfile            # Dockerfile for backend service
│   └── package.json          # Backend dependencies and scripts
├── frontend/                 # React frontend application
│   ├── src/                  # Source code
│   ├── Dockerfile            # Dockerfile for frontend service
│   └── package.json          # Frontend dependencies and scripts
├── docker-compose.yml        # Defines and runs multi-container Docker application
└── README.md                 # Project README file
```

## Available Scripts (within containers)

You can execute scripts inside the running Docker containers.

### Backend (NestJS)
To run a command in the backend container:
```bash
docker-compose exec backend npm run <script-name>
```
Common scripts:
- `npm run start:dev`: Start the backend in development mode (with watch).
- `npm run build`: Build the backend for production.
- `npm run lint`: Lint backend code.
- `npm run test`: Run backend tests.

### Frontend (React)
To run a command in the frontend container:
```bash
docker-compose exec frontend npm run <script-name>
```
Common scripts:
- `npm run dev`: Start the frontend in development mode.
- `npm run build`: Build the frontend for production.
- `npm run lint`: Lint frontend code.

## Environment Variables
(Assuming default values are used or handled by Docker Compose directly. If there were `.env` files, I would list them here.)
The `docker-compose.yml` directly defines database environment variables.

## Contributing
(Placeholder for contribution guidelines)

## License
This project is [UNLICENSED](backend/package.json) (or specify your chosen license).

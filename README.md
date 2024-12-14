# AI-Finance Management Application

A cutting-edge application designed to simplify finance management using AI. This project is tailored for students studying abroad and freshers starting their careers, helping them manage their savings, investments, and expenses with ease.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [APIs](#apis)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Deployment](#deployment)
- [CI/CD](#ci-cd)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- AI-driven financial advice for better money management.
- Personalized savings, investment, and expense strategies.
- CRUD operations to manage user data and financial reports.
- Secure authentication via credentials and Google login.

---

## Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/)
- **Libraries**: 
  - [NextAuth](https://next-auth.js.org/): Authentication.
  - [Axios](https://axios-http.com/): HTTP requests.
  - [Chart.js](https://www.chartjs.org/): Data visualization.
  - [Recoil](https://recoiljs.org/): State management.
  - [Zod](https://zod.dev/): Schema validation.

### Backend
- **Framework**: [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/)
- **Libraries**: 
  - [Prisma](https://www.prisma.io/): ORM for database operations.
  - [JWT](https://jwt.io/): Authentication.
  - [OpenAI](https://platform.openai.com/docs/): AI-driven financial advice.
  - [Zod](https://zod.dev/): Schema validation.
  - [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js): Password hashing.

---

## APIs

### User Routes
- `GET /userInfo/:id` - Fetch user information by ID.
- `GET /checkFinancialReport/:email` - Check financial report for a given email.

### Authentication Routes
- `POST /session` - Authenticate user session and handle Google authentication.
- `POST /userCreate` - Register a new user via credentials.
- `POST /credentials` - Authenticate a credential-based user.

### AI-Driven Advice
- `POST /generateAdvice` - Generate financial advice tailored to user data.

---

## Getting Started

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/) (for backend deployment)
- npm or yarn

### Installation

#### Clone the Repository
```bash
git clone https://github.com/your-repo/finance-management.git
cd finance-management
```

#### Install Dependencies

**Frontend**
```bash
cd frontend
npm install
```

**Backend**
```bash
cd backendNode
npm install
```

### Running the Application

#### Start Frontend
```bash
cd frontend
npm run dev
# Application will run on http://localhost:3000
```

#### Start Backend
```bash
cd backend
npm run dev
# API server will run on http://localhost:3001
```

---

## Deployment

### Frontend
Deployed using [Vercel](https://vercel.com/).

### Backend
- Docker containerized.
- Hosted on AWS EC2 instance.

---

## CI/CD
The project includes a CI/CD setup to automate deployment. Ensure proper credentials are added to your CI/CD pipeline configuration.

---

## Contributing
We welcome contributions! To get started:
1. Fork the repository.
2. Create a new branch (`feature/your-feature-name`).
3. Commit your changes.
4. Push to the branch.
5. Submit a pull request.

---

## License
This project is licensed under the [MIT License](./LICENSE).

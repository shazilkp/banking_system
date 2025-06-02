# Banking System

This repository contains a full-stack banking system application built with Next.js. It utilizes a MySQL database for data management and JWT (JSON Web Tokens) for secure authentication. The system features role-based access control, providing separate dashboards and functionalities for regular users and administrators. The project is named "NITC Bank" within the admin interface.

## Key Features

**User Functionalities (Customer Dashboard):**
*   User registration and login.
*   Create new bank accounts (savings, current), initially set to 'pending' status for admin approval.
*   View account balances and details.
*   Transfer funds between own accounts or to other users' accounts.
*   Withdraw funds from accounts.
*   Apply for loans, which are then reviewed by administrators.
*   Repay outstanding loans.
*   View detailed transaction history (deposits, withdrawals, transfers).

**Admin Functionalities (Admin Dashboard):**
*   Secure login for administrators.
*   Approve or reject pending bank account applications.
*   Freeze or close existing bank accounts.
*   Approve or reject pending loan applications.
*   Manage deposits into user accounts.
*   Reverse transactions with a specified reason.
*   View history of reversed transactions.

**General System Features:**
*   Secure API endpoints with JWT authentication.
*   Role-based authorization enforced by middleware for customer and admin routes.
*   MySQL database for persistent storage of user data, accounts, transactions, and loans.

## Tech Stack

*   **Framework:** Next.js (with React) [![My Skills](https://skillicons.dev/icons?i=react)](https://skillicons.dev)
*   **Backend Logic:** Next.js API Routes
*   **Database:** MySQL (`mysql2` driver)
*   **Authentication:** JWT (`jose` for token verification, `jsonwebtoken` for signing, `bcryptjs` for password hashing)
*   **Styling:** Tailwind CSS
*   **Data Validation:** Zod (in login/signup routes)
*   **Unique ID Generation:** `nanoid`
*   **Development Server:** Next.js with Turbopack
*   **Environment Management:** `dotenv`

## Prerequisites

*   Node.js (latest LTS version recommended)
*   npm, yarn, or pnpm
*   MySQL server instance

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/shazilkp/banking_system.git
cd banking_system
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Set Up the Database

*   Ensure your MySQL server is running.
*   Create a new database for the application (e.g., `banking_db`).
*   Import the database schema by executing the `init.sql` script located in the root of the project. You can use a MySQL client or tool for this:
    ```bash
    mysql -u your_mysql_user -p your_database_name < init.sql
    ```

### 4. Configure Environment Variables

Create a `.env` file in the root of the project and add the following environment variables, replacing the placeholder values with your actual configuration:

```env
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name # e.g., banking_db
JWT_SECRET=your_very_strong_and_secret_jwt_key # A long, random string
```

### 5. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application. You will be redirected to the login page.

## Project Structure Overview

*   `app/`: Contains the Next.js application code.
    *   `app/api/`: Backend API endpoints.
        *   `app/api/auth/`: Authentication status check.
        *   `app/api/login/`: Handles user login.
        *   `app/api/signup/`: Handles user registration.
        *   `app/api/logout/`: Handles user logout.
        *   `app/api/accounts/`: User-facing account operations.
        *   `app/api/loans/`: User-facing loan operations.
        *   `app/api/transfers/`: User-facing transfer, deposit, and withdrawal operations.
        *   `app/api/admin/`: Admin-specific API endpoints for managing accounts, loans, and transactions.
    *   `app/dashboard/`: Frontend pages and components for the customer dashboard.
    *   `app/admin/`: Frontend pages and components for the admin dashboard.
    *   `app/login/`: Frontend page for login and signup.
    *   `app/layout.js`: Main application layout.
    *   `app/globals.css`: Global styles.
*   `lib/db.js`: MySQL database connection pool setup.
*   `middleware.js`: Handles JWT authentication, route protection, and role-based access control.
*   `init.sql`: SQL script for initializing the database schema.
*   `public/`: Static assets like images and SVGs.
*   `package.json`: Project dependencies and scripts.
*   `next.config.mjs`: Next.js configuration.
*   `jsconfig.json` / `tsconfig.json`: JavaScript/TypeScript configuration for path aliases and compiler options.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

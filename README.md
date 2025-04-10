# Candor Employee

Candor Employee is Employee Management Directory built with Next.js, Drizzle, Tailwind CSS, and Radix UI. This project is a full-stack application that allows users to create, view, edit, and delete employee records. It also includes a user authentication system using the [better-auth](https://github.com/Better-Auth/better-auth) library.

[Image](.github/images/image.png)

## Prerequisites

- Node.js 18.x
- PostgreSQL

## Getting Started

First, initialize .env file with your database credentials:

```bash
cp .env.example .env
```

Fill in the values for the .env file.

```bash
DATABASE_URL= # postgres
BETTER_AUTH_SECRET= # random long string
BETTER_AUTH_URL= # this is mostly same as your domain (e.g http://localhost:3000)
```

Then, install dependencies:
```bash
npm install
```

Then, run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the project.

# Bus App

A full-stack application for bus tracking, forums, and system monitoring.

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- [Git](https://git-scm.com/)
- Optional: [VS Code](https://code.visualstudio.com/) for development

## Project Structure

bus/
├─ backend/ # Backend server
├─ frontend/ # Frontend React app
├─ package.json # Root scripts
├─ .gitignore
└─ README.md

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Refilwe58/bus.git
cd bus
Install root dependencies 

npm install
Install backend dependencies:

cd backend
npm install


Install frontend dependencies:

cd ../frontend
npm install

Create a .env file in the backend folder with your configuration, for example:


STRIPE_SECRET_KEY=your_stripe_test_key
DB_URL=your_database_url

From the root folder, run:

npx run dev


This will start both the backend and frontend servers simultaneously.

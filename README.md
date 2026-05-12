# Review & Rate

A full-stack company review and rating platform built with Next.js, TypeScript, Tailwind CSS, Node.js, Express.js, and MongoDB.

## Features
- Browse and search companies
- Filter companies by city and sort by name, rating, reviews
- Add new companies
- View detailed company profiles
- Add, like, and share reviews
- Responsive design for mobile, tablet, and desktop

## Tech Stack
**Frontend:** Next.js 15, TypeScript, Tailwind CSS v4  
**Backend:** Node.js, Express.js, MongoDB, Mongoose

## Getting Started

### Prerequisites
- Node.js
- MongoDB connection string

### Installation

1. Clone the repository
```bash
git clone https://github.com/KrishnaMehta4/review-rate.git
```

2. Setup Server
```bash
cd server
npm install
```
Create a `.env` file in the server folder:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```
Start the server:
```bash
node server.js
```

3. Setup Client
```bash
cd client
npm install
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.


# Habitry

**Habitry** is a modern, full-stack self-improvement platform designed to help users track their personal growth, build better habits, and reflect on their progress over time. Built with a focus on clean design and robust architecture, it provides a seamless experience for logging activities and monitoring milestones.

---

## Key Features

-   **Activity Tracking**: Log numeric or boolean-based activities to monitor your daily habits and personal growth.
-   **Progress Visualization**: View your history and milestones through a clean, intuitive interface.
-   **Calendar Integration**: Track your daily logs in a structured calendar view to see patterns over time.
-   **Secure Authentication**: Robust JWT-based authentication system to keep your data private.
-   **Responsive Design**: A premium SaaS-style aesthetic that works beautifully across devices.

---

## Tech Stack

### Backend (API)
-   **Framework**: [NestJS](https://nestjs.com/) (Node.js)
-   **Language**: TypeScript
-   **Database**: [MongoDB](https://www.mongodb.com/) with Mongoose
-   **Authentication**: Passport.js & JWT
-   **Validation**: Class-validator & DTOs

### Frontend (App)
-   **Framework**: [React](https://reactjs.org/) (Vite)
-   **Language**: TypeScript
-   **State Management**: [Zustand](https://github.com/pmndrs/zustand)
-   **Styling**: Semantic UI & Tailwind CSS
-   **Data Fetching**: React Query (TanStack Query)

---

## Getting Started

### Prerequisites
-   Node.js (v18+)
-   npm or yarn
-   MongoDB instance (Local or Atlas)

### 1. Clone the Repository
```bash
git clone https://github.com/annazoi/BeBetter.git
cd BeBetter
```

### 2. Backend Setup (API)
```bash
cd api
npm install
```
**Environment Variables (.env)**
Create a `.env` file in the `api` root:
```env
DB_CONNECTION=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRATION_TIME=3600s
# Optional Cloudinary Integration
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_KEY_SECRET=your_api_key_secret
```
**Start the API**
```bash
npm run start:dev
```

### 3. Frontend Setup (App)
```bash
cd ../app
npm install
```
**Environment Variables (.env)**
Create a `.env` file in the `app` root:
```env
VITE_API_URL=http://localhost:3000
```
**Start the App**
```bash
npm run dev
```

---

## Project Structure

```text
BeBetter/
├── api/            # NestJS Backend
│   ├── src/        # Core API logic
│   └── ...
├── app/            # React Frontend
│   ├── src/        # UI components, stores, and hooks
│   └── ...
└── README.md
```

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## License

This project is licensed under the [UNLICENSED](LICENSE) license.


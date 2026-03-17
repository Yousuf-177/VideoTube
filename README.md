# VidTube

A comprehensive, full-stack video hosting platform inspired by YouTube. VidTube allows users to upload, watch, like, and comment on videos, create playlists, subscribe to channels, and interact via community tweets.

The project is structured entirely around a robust Node.js/Express backend paired with a modern React.js frontend built on Vite.

## Architecture Overview

### Backend (Node.js & Express)

A RESTful API built with Express and MongoDB (Mongoose), handling complex aggregations, authentication, and file management.

- **Database Models (7):** User, Video, Comment, Like (Polymorphic), Playlist, Subscription, and Tweet.
- **Authentication:** Secure JWT-based strategy using short-lived Access Tokens and long-lived Refresh Tokens (stored securely via HttpOnly cookies).
- **Media Storage:** Integration with Cloudinary for scalable image (avatars, covers) and video payload uploads, utilizing Multer for local temporary storage during transit.
- **Pagination & Aggregation:** Uses `mongoose-aggregate-paginate-v2` for efficient pagination of complex nested queries (e.g., fetching a channel's videos along with subscriber counts and video likes).
- **Security & Error Handling:** Custom ApiError and ApiResponse utility classes for consistent client communication. Global error handling middleware intercepts and formats all exceptions.

### Frontend (React & Vite)

A highly responsive, dynamic Single Page Application (SPA) prioritizing performance and modern design aesthetics.

- **Design System:** Built from the ground up using raw CSS Custom Properties. Features a dark-themed, glassmorphism UI with gradient accents, utilizing "Inter" and "Outfit" fonts.
- **State Management & API Layer:** React Context API handles global authentication state. A centralized Axios instance uses request/response interceptors to automatically refresh expired access tokens silently in the background, maintaining a seamless user workflow.
- **Routing:** React Router v6 manages Protected and Guest routes to secure application flow (e.g., redirecting unauthenticated users away from the Profile or Channel dashboards).
- **Component Modularity:** High reuse of underlying UI atoms such as customized Loaders, skeleton loaders, and interactive Video Cards.

## Key Features

1.  **User Authentication & Profiles:** Registration with required avatar uploads, login, password management, and profile customization (cover images, detailing).
2.  **Video Management:** Upload capabilities, publish/unpublish toggles, video metadata updating, and video deletion.
3.  **Community Interactions:**
    - **Comments & Likes:** Threaded video comments and a polymorphic liking system allowing users to like videos, comments, or tweets.
    - **Tweets:** A community feed for users to broadcast text updates to their subscribers.
4.  **Channel System:** Dynamic channel pages displaying subscriber counts, total videos, and channel-specific media. Users can subscribe/unsubscribe to other creators.
5.  **Organization:** Watch history tracking and the ability to curate custom playlists.
6.  **Dashboard Analytics:** Aggregated statistics for creators showing total channel views, likes, subscriber counts, and video metrics.

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB instance (local or Atlas)
- Cloudinary Account (API Key, Secret, Cloud Name)

### Backend Setup

1.  Navigate to the project root directory.
2.  Install dependencies: `npm install`
3.  Create a `.env` file based on `.env.sample` and fill in your MongoDB URI, JWT secrets, and Cloudinary credentials.
4.  Start the development server: `npm run dev` (Runs on port 8000).

### Frontend Setup

1.  Navigate to the frontend directory: `cd frontend`
2.  Install dependencies: `npm install`
3.  The frontend uses Vite's proxy configuration to route `/api/v1` requests to the backend (`localhost:8000`), so no local environment variables are strictly needed for the API URL in development.
4.  Start the development server: `npm run dev` (Runs on port 5173).

## Testing

The backend includes a comprehensive testing script (`test_endpoints.ps1`) to validate all exposed CRUD and Authentication routes against the live server.

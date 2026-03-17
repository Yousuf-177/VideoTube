# VidTube : A Full Stack Video Hosting Platform 🎥

A comprehensive, full-stack video hosting platform inspired by YouTube. VidTube allows users to upload, watch, like, and comment on videos, create playlists, subscribe to channels, and interact via community tweets.

The project is structured entirely around a robust Node.js/Express backend paired with a modern React.js frontend built on Vite.

---

## Technical Stack & Architecture

The application is split into two distinct environments to ensure separation of concerns, scalability, and maintainability.

### Backend Overview

| Component          | Technology      | Description                                                                                         |
| :----------------- | :-------------- | :-------------------------------------------------------------------------------------------------- |
| **Runtime**        | Node.js         | Asynchronous, event-driven JavaScript runtime environment.                                          |
| **Framework**      | Express.js      | Fast, unopinionated web framework for building RESTful APIs.                                        |
| **Database**       | MongoDB         | NoSQL document database, utilizing Mongoose as the Object Data Modeling (ODM) library.              |
| **Media Storage**  | Cloudinary      | Cloud-based service for processing, managing, and delivering video and image assets.                |
| **Authentication** | JSON Web Tokens | Secure, stateless authentication utilizing short-lived Access Tokens and long-lived Refresh Tokens. |

### Frontend Overview

| Component      | Technology      | Description                                                                                                |
| :------------- | :-------------- | :--------------------------------------------------------------------------------------------------------- |
| **Framework**  | React.js        | UI library for building component-based, dynamic user interfaces.                                          |
| **Build Tool** | Vite            | Lightning-fast build tool and development server.                                                          |
| **Routing**    | React Router v6 | Declarative routing for Single Page Applications (SPA), including Protected and Guest routes.              |
| **API Client** | Axios           | Promise-based HTTP client configuration, featuring automated token-refresh interceptors.                   |
| **Styling**    | Vanilla CSS     | Custom, scalable design system utilizing CSS Custom Properties (Variables) and a glassmorphism dark theme. |

---

## Key Features

| Feature Module          | Core Capabilities                                                                                                        |
| :---------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| **User Accounts**       | Registration with avatar/cover uploads, secure login, password management, and profile customization.                    |
| **Video Engine**        | Video file uploads, thumbnail generation, view counting, publish/unpublish toggling, and video deletion.                 |
| **Community**           | Threaded comments on videos, and a polymorphic liking system (capable of liking videos, comments, or tweets).            |
| **Creator Channels**    | Public-facing creator profiles displaying aggregated statistics (subscribers, total videos) and subscription management. |
| **Playlists & History** | Seamless tracking of user watch history and CRUD operations for custom user playlists.                                   |

---

## Installation and Running Guide for Developers

This section provides a step-by-step walkthrough to get the entire full-stack application running on your local machine.

### Prerequisites

Before beginning, ensure your local environment contains the following tools:

1.  **Node.js**: Version 18.0 or higher is recommended. Check your version by running `node -v` in your terminal.
2.  **Git**: For version control.
3.  **MongoDB**: A running MongoDB instance. This can be a local installation or a cloud cluster (e.g., MongoDB Atlas). Obtain your connection string URI.
4.  **Cloudinary Account**: Create a free account at Cloudinary and note your Cloud Name, API Key, and API Secret.

### Step 1: Backend Setup

The backend servers act as the data and logic core of the application.

1.  **Open your terminal** and navigate to the project directory:

    ```bash
    cd VidTube
    ```

2.  **Install backend dependencies**:

    ```bash
    npm install
    ```

3.  **Configure Environment Variables**:

    - Locate the file named `.env.sample` in the root directory.
    - Create a copy of this file and rename the new file to exactly `.env`.
    - Open the `.env` file and populate the empty variables with your actual credentials:
      - `PORT`: Keep as `8000`
      - `MONGODB_URI`: Insert your MongoDB connection string.
      - `ACCESS_TOKEN_SECRET` / `REFRESH_TOKEN_SECRET`: Generate long, random, secure strings.
      - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`: Insert your Cloudinary credentials.

4.  **Start the Backend Server**:
    ```bash
    npm run dev
    ```
    - **Success Indicator**: The terminal should display messages indicating that MongoDB is connected and the server is actively listening on port 8000. Keep this terminal window open.

### Step 2: Frontend Setup

The frontend serves as the interactive user interface, proxying API requests to your local backend.

1.  **Open a new terminal window** (leave the backend running in the previous one).

2.  **Navigate directly into the frontend directory**:

    ```bash
    cd VidTube/frontend
    ```

3.  **Install frontend dependencies**:

    ```bash
    npm install
    ```

4.  **Start the Frontend Development Server**:
    ```bash
    npm run dev
    ```
    - **Success Indicator**: The terminal will display a local URL (typically `http://localhost:5173/`).

### Step 3: Verify the Application

1.  Open your preferred web browser.
2.  Navigate to `http://localhost:5173/`.
3.  The frontend will load. Because Vite is configured to automatically proxy `/api/v1` requests to port `8000`, the frontend interface is immediately capable of communicating with your local backend database.

**Note on Proxy configuration:** If you inspect `frontend/vite.config.js`, you will observe the server proxy rule that routes all Axios API calls seamlessly to the backend server without causing CORS errors.

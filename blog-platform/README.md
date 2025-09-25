# Blog Platform (React + Appwrite)

This repository contains the source code for a full‑stack blog platform built with **React** on the front end and **Appwrite** as the back‑end service.  The project demonstrates how to implement user authentication, CRUD operations for blog posts, image uploads and optional comments using Appwrite’s Auth, Databases, Storage and Functions services.

## Features

- User registration and login with Appwrite Auth (email/password; easily extendable to OAuth or magic links).
- Session management with React Context.
- Create, read, update and delete blog posts (title, content, category and cover image).
- Upload images to Appwrite Storage and display them on posts.
- (Optional) Manage categories, comments and user profiles.
- Responsive design with a minimal navigation bar.
- Example Appwrite function for generating slugs from post titles.

## Getting Started

### Prerequisites

1. **Appwrite project** – Create an account at [Appwrite](https://appwrite.io) and set up a new project.  Enable email/password authentication and create the following resources:
   - **Database** – Create a database (e.g. `blog`).
   - **Collections** – Create collections for `posts`, `categories`, `comments` and `profiles` with the appropriate attributes.  For posts, include attributes such as `title`, `slug`, `content`, `coverImageId`, `authorId`, `categoryId`, `createdAt`, `updatedAt` and `status`.  Set read/write permissions according to your needs.
   - **Storage bucket** – Create a storage bucket for images and allow public read access.
   - **Functions (optional)** – Create a function to generate slugs when a new post is created.  See `functions/generateSlug.js` for an example.
2. **Node.js** – Install [Node.js](https://nodejs.org/) (version 18+ recommended).  After cloning the repository, run `npm install` to install dependencies.

### Setup

1. Clone this repository and navigate to the project directory:

   ```bash
   git clone <repository-url>
   cd blog-platform
   ```

2. Copy the `.env.example` file to `.env` and update the variables with your Appwrite configuration:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and replace the placeholder values:

   ```env
   VITE_APPWRITE_ENDPOINT=https://<YOUR-ENDPOINT>/v1
   VITE_APPWRITE_PROJECT_ID=<PROJECT-ID>
   VITE_APPWRITE_DATABASE_ID=<DATABASE-ID>
   VITE_APPWRITE_POSTS_COLLECTION_ID=<POSTS-COLLECTION-ID>
   VITE_APPWRITE_CATEGORIES_COLLECTION_ID=<CATEGORIES-COLLECTION-ID>
   VITE_APPWRITE_COMMENTS_COLLECTION_ID=<COMMENTS-COLLECTION-ID>
   VITE_APPWRITE_PROFILES_COLLECTION_ID=<PROFILES-COLLECTION-ID>
   VITE_APPWRITE_STORAGE_BUCKET_ID=<BUCKET-ID>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:5173`.

### Building for Production

To build the application for production, run:

```bash
npm run build
```

The production files will be generated in the `dist` directory.

## Project Structure

```
blog-platform/
├── functions/
│   └── generateSlug.js         # Example Appwrite Function for slug creation
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Top navigation bar
│   │   └── PostCard.jsx       # Component for displaying a post summary
│   ├── contexts/
│   │   └── AuthContext.jsx    # Provides user and session state
│   ├── pages/
│   │   ├── Home.jsx           # Displays list of posts
│   │   ├── Login.jsx          # Login form
│   │   ├── Register.jsx       # Registration form
│   │   ├── NewPost.jsx        # Form to create or edit posts
│   │   ├── PostDetail.jsx     # Individual post page with content and comments
│   │   └── Profile.jsx        # User profile page (optional)
│   ├── utils/
│   │   ├── appwrite.js        # Appwrite client and helper methods
│   │   └── slugify.js         # Utility to slugify titles (used by function)
│   ├── App.jsx                # Root component with routes
│   └── main.jsx               # Entry point
├── .env.example               # Sample environment variables
├── .gitignore
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## Appwrite Function Example

The `functions/generateSlug.js` file contains a sample Appwrite Cloud Function (Node.js) that listens for new documents in the `posts` collection, generates a URL‑friendly slug from the `title`, ensures uniqueness, and updates the document.  Deploy this function to your Appwrite project and set it to trigger on the `databases.*.collections.<POSTS_COLLECTION_ID>.documents.create` event.

## Contributions

This project is provided as a starting point for building a blog platform with React and Appwrite.  Feel free to adapt it to your requirements and contribute improvements via pull requests.

## License

This project is licensed under the MIT License.

import { Client, Account, Databases, Storage, Query, ID } from 'appwrite';

// Configure Appwrite client with environment variables
const client = new Client();
client
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// Exported SDK modules
const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);

// IDs from environment
const databaseId = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const postsCollectionId = import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID;
const categoriesCollectionId = import.meta.env.VITE_APPWRITE_CATEGORIES_COLLECTION_ID;
const commentsCollectionId = import.meta.env.VITE_APPWRITE_COMMENTS_COLLECTION_ID;
const profilesCollectionId = import.meta.env.VITE_APPWRITE_PROFILES_COLLECTION_ID;
const bucketId = import.meta.env.VITE_APPWRITE_STORAGE_BUCKET_ID;

// Helper methods for posts
export async function createPost(data) {
  return databases.createDocument(databaseId, postsCollectionId, ID.unique(), data);
}

export async function listPosts({ queries = [] } = {}) {
  return databases.listDocuments(databaseId, postsCollectionId, queries);
}

export async function getPost(documentId) {
  return databases.getDocument(databaseId, postsCollectionId, documentId);
}

export async function updatePost(documentId, data) {
  return databases.updateDocument(databaseId, postsCollectionId, documentId, data);
}

export async function deletePost(documentId) {
  return databases.deleteDocument(databaseId, postsCollectionId, documentId);
}

// File upload and retrieval
export async function uploadFile(file) {
  // file should be a File object from input[type="file"]
  return storage.createFile(bucketId, ID.unique(), file);
}

export function getFilePreview(fileId) {
  return storage.getFilePreview(bucketId, fileId);
}

export { account, databases, storage, Query, ID, databaseId, postsCollectionId, categoriesCollectionId, commentsCollectionId, profilesCollectionId, bucketId };

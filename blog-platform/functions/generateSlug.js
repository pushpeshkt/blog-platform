const { Client, Databases } = require('appwrite');

/**
 * Appwrite Function: Generate a unique slug for a new post document.
 *
 * This function expects to be triggered by the Appwrite event:
 * `databases.*.collections.<POSTS_COLLECTION_ID>.documents.create`.
 * It retrieves the created document, generates a URL‑friendly slug from the title,
 * appends a unique suffix to avoid collisions, and updates the document with the slug.
 */
module.exports = async function (req, res) {
  const payload = JSON.parse(req.body || '{}');
  const { databaseId, collectionId, documentId } = payload;

  // Initialize the SDK client
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT)
    .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new Databases(client);

  try {
    // Fetch the newly created document to access its title
    const document = await databases.getDocument(databaseId, collectionId, documentId);
    const title = document.title || '';

    // Basic slugify logic
    let slug = title
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    // Append a unique suffix from the document ID to ensure uniqueness
    const uniqueSuffix = documentId.slice(-5);
    slug = `${slug}-${uniqueSuffix}`;

    // Update the document with the new slug
    await databases.updateDocument(databaseId, collectionId, documentId, { slug });

    return res.json({ slug });
  } catch (error) {
    console.error('Error generating slug:', error);
    return res.json({ error: error.message }, 500);
  }
};

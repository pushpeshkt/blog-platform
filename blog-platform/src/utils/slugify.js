export default function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Remove invalid chars
    .replace(/[^\w\s-]/g, '')
    // Replace whitespace with hyphens
    .replace(/\s+/g, '-')
    // Remove multiple hyphens
    .replace(/--+/g, '-');
}

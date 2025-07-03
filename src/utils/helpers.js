/**
 * Converts a string to a URL-friendly slug
 * @param {string} text - The text to convert to a slug
 * @returns {string} - The URL-friendly slug
 */
export const generateSlug = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')        // Replace spaces with -
    .replace(/&/g, '-and-')      // Replace & with 'and'
    .replace(/[^\w\-]+/g, '')    // Remove all non-word characters
    .replace(/\-\-+/g, '-')      // Replace multiple - with single -
    .replace(/^-+/, '')          // Trim - from start of text
    .replace(/-+$/, '');         // Trim - from end of text
};

/**
 * Creates a combined slug with ID for uniqueness
 * @param {string} name - The name to use in the slug
 * @param {string} id - The ID to append to the slug
 * @returns {string} - The combined slug (name-id)
 */
export const createUniqueSlug = (name, id) => {
  const nameSlug = generateSlug(name);
  return `${nameSlug}-${id}`;
};

/**
 * Extracts the ID from a combined slug
 * @param {string} slug - The combined slug (name-id)
 * @returns {string} - The extracted ID
 */
export const extractIdFromSlug = (slug) => {
  if (!slug) return null;
  // Extract the ID part (assuming it's the last part after the last dash)
  const parts = slug.split('-');
  return parts[parts.length - 1];
}; 
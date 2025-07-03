// src/utils/slugUtils.js

/**
 * Generate a URL-friendly slug from a string
 * @param {string} text - The text to convert to a slug
 * @returns {string} - URL-friendly slug
 */
export const generateSlug = (text) => {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, "-") // Replace spaces with hyphens
		.replace(/&/g, "-and-") // Replace & with 'and'
		.replace(/[^\w\-]+/g, "") // Remove all non-word characters except hyphens
		.replace(/\-\-+/g, "-"); // Replace multiple hyphens with single hyphen
};

/**
 * Generate a content URL using the title as a slug
 * @param {string} id - The content ID
 * @param {string} title - The content title
 * @returns {string} - URL with slug
 */
export const getContentUrl = (title) => {
	return `/content/${generateSlug(title)}`;
};

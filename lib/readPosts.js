import { readFile } from "fs/promises";
import path from "path";

export const readPosts = async (id) => {
	// load existing file
	const existingData = await readFile(
		path.join(process.cwd(), process.env.POSTS_FILE),
		"utf-8"
	);
	const posts = JSON.parse(existingData);
	if (id) {
		return posts[id];
	}
	return posts;
};

export const formatPosts = (posts) => {
	// convert to array for frontend
	return Object.values(posts);
};

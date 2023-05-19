import { writeFile } from "fs/promises";
import path from "path";

export const writePosts = async (posts) => {
	const postsString = JSON.stringify(posts);
	await writeFile(
		path.join(process.cwd(), process.env.POSTS_FILE),
		postsString,
		"utf-8"
	);
};

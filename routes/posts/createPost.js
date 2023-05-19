import { writeFile } from "fs/promises";
import path from "path";
import { createPost as createPostObject } from "../../lib/createPost";
import { validate } from "../../lib/validate";
import { readPosts } from "../../lib/readPosts";

export const createPost = async (req, res) => {
	try {
		// validate
		const errorString = validate(req.body);
		if (errorString) {
			return res.status(400).json({ message: errorString });
		}

		// create post
		const newPost = createPostObject(req.body);

		// load existing posts
		const posts = await readPosts();

		// modify posts object
		posts[newPost.id] = newPost;

		// write file
		const postsString = JSON.stringify(posts);
		await writeFile(
			path.join(process.cwd(), process.env.POSTS_FILE),
			postsString,
			"utf-8"
		);
		return res.status(201).json({ message: "Post created", data: newPost });
	} catch (e) {
		console.error(e);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

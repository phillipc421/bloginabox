import { writeFile } from "fs/promises";
import path from "path";
import { writePosts } from "../../lib/writePosts";

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
		await writePosts(posts);

		return res.status(201).json({ message: "Post created", data: newPost });
	} catch (e) {
		console.error(e);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

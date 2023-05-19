import { readPosts } from "../../lib/readPosts";
import { writePosts } from "../../lib/writePosts";
import { postIdCheck } from "../../lib/validate";

export const deletePost = async (req, res) => {
	try {
		// valid id format
		const id = postIdCheck(req, res);
		if (!id) {
			return;
		}

		// load posts
		const posts = await readPosts();
		// post with id doesn't exist
		const post = posts[id];
		if (!post) {
			return res
				.status(404)
				.json({ message: "No post with 'id': " + id });
		}

		// delete post
		delete posts[id];

		// write new file
		await writePosts(posts);

		return res.status(200).json({ message: "Post deleted", data: post });
	} catch (e) {
		console.error(e);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

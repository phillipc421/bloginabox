import { readPosts, formatPosts } from "../../lib/readPosts";
import { postIdCheck } from "../../lib/validate";

export const getPosts = async (req, res) => {
	try {
		// load posts
		const posts = await readPosts();

		// single post (id param)
		if (req.query.id) {
			const id = postIdCheck(req, res);
			if (!id) return;
			const post = posts[id];
			// post with id doesn't exist
			if (!post) {
				return res
					.status(404)
					.json({ message: "No post with 'id': " + id });
			}
			return res.status(200).json({ post: post });
		}

		// all posts
		const postsList = formatPosts(posts);
		return res.status(200).json({ posts: postsList });
	} catch (e) {
		console.error(e);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

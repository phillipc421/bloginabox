import { readPosts, formatPosts } from "../../lib/readPosts";

export const getPosts = async (req, res) => {
	try {
		const posts = await readPosts();
		const postsList = formatPosts(posts);
		return res.status(200).json({ posts: postsList });
	} catch (e) {
		console.error(e);
		return res.status(500).json({ message: "Internal Server Error" });
	}
};

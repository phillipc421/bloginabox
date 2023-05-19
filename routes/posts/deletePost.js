import { readPosts } from "../../lib/readPosts";
import validator from "validator";
export const deletePost = async (req, res) => {
	// valid id format
	const { id } = req.query;
	if (!id) {
		return res.status(400).json({ message: "Missing 'id' parameter" });
	}
	if (!validator.isUUID(id, 4)) {
		return res
			.status(400)
			.json({ message: "'id' parameter must be a UUID" });
	}
	// find post
	const post = await readPosts(id);
	// post with id doesn't exist
	if (!post) {
		return res.status(404).json({ message: "No post with 'id': " + id });
	}
};

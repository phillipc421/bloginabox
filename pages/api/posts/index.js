import { createPost } from "../../../routes/posts/createPost";
import { getPosts } from "../../../routes/posts/getPosts";
import { deletePost } from "../../../routes/posts/deletePost";

export default async function handler(req, res) {
	const {
		method,
		headers: { host },
	} = req;
	console.log(req.query);
	console.log(`${method} request from ${host}`);
	switch (method) {
		case "GET":
			await getPosts(req, res);
			break;
		case "POST":
			await createPost(req, res);
			break;
		case "DELETE":
			await deletePost(req, res);
			break;
		default:
			res.status(404).json({ message: "Route not found" });
	}
}

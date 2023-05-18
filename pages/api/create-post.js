import { readFile, writeFile } from "fs/promises";
import path from "path";

export default async function handler(req, res) {
	const { method } = req;
	if (method !== "POST") {
		return res.status(400).json({ message: "Invalid endpoint" });
	}

	try {
		// load existing file
		const existingData = await readFile(
			path.join(process.cwd(), process.env.POSTS_FILE),
			"utf-8"
		);
		const parsedData = JSON.parse(existingData);
		// validate
		const { title, body, author } = req.body;

		// write file
		return res.status(201).json({ message: parsedData });
	} catch (e) {
		console.error(e);
		return res.status(500).json({ message: "Internal Server Error" });
	}
}

/*
post schema
{
    id: string (uuid) - auto
    title: string,
    body: string,
    author: string (uuid)
    createdOn: Date - auto
    updatedOn: Date - auto
} 
*/

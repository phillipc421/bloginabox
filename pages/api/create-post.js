import { readFile, writeFile } from "fs/promises";
import path from "path";
import { createPost } from "../../lib/createPost";
import { validate } from "../../lib/validate";

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

export default async function handler(req, res) {
  const { method } = req;
  if (method !== "POST") {
    return res.status(400).json({ message: "Invalid endpoint" });
  }

  try {
    // validate
    const errorString = validate(req.body);
    if (errorString) {
      return res.status(400).json({ message: errorString });
    }

    // create post
    const newPost = createPost(req.body);

    // load existing file
    const existingData = await readFile(
      path.join(process.cwd(), process.env.POSTS_FILE),
      "utf-8"
    );
    const posts = JSON.parse(existingData);

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
}

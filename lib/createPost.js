import crypto from "crypto";
export const createPost = ({ title, body, author }) => {
  // generate id
  const id = crypto.randomUUID();
  // dates
  let date = new Date().toISOString();
  return { id, title, body, author, createdOn: date, updatedOn: date };
};

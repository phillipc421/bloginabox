export const validate = ({ title, body, author }) => {
  // return error string or void
  if (!title) {
    return 'Missing "title" property';
  }
  if (!body) {
    return 'Missing "body" property';
  }
  if (!author) {
    return 'Missing "author" property';
  }
};

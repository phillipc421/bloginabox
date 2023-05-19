import validator from "validator";

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

export const postIdCheck = (req, res) => {
	// return false if invalid id or missing, else return id
	const { id } = req.query;
	if (!id) {
		res.status(400).json({ message: "Missing 'id' parameter" });
		return false;
	}
	if (!validator.isUUID(id, 4)) {
		res.status(400).json({ message: "'id' parameter must be a UUID" });
		return false;
	}
	return id;
};

const { signupUser } = require("../service/user");

const createUser = async (req, res) => {
  const data = req.body.data;
  const result = await signupUser(data);
  res.status(200).json({ result });
};

module.exports = {
  createUser,
};

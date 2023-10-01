const { signupUser, signInUser } = require("../service/user.js");

const createUser = async (req, res) => {
  const data = req.body.data;
  const result = await signupUser(data);
  res.status(200).json({ result });
};

const loginUser = async (req, res) => {
  const data = req.body.data;
  const result = await signInUser(data);
  res.status(200).json({ result });
};
module.exports = {
  createUser,
  loginUser,
};

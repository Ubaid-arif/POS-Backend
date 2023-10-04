const { signupUser, signInUser , update_password } = require("../service/user.js");

const createUser = async (req, res) => {
  const data = req.body.data;
  console.log("data-------->", data);
  const result = await signupUser(data);
  res.status(200).json({ result });
};

const loginUser = async (req, res) => {
  const data = req.body.data;
  const result = await signInUser(data);
  res.status(200).json({ result });
};
const updatePassword = async (req, res) => {
  const data = req.body.data;
  const result = await update_password(data);
  console.log("🚀 ~ file: User.js:18 ~ updatePassword ~ result:", result)
  res.status(200).json({ result });

}
module.exports = {
  createUser,
  loginUser,
  updatePassword,
};

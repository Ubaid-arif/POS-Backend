const {
  signupUser,
  signInUser,
  update_password,
  fetchUserDetail,
} = require("../service/user.js");
const jwt = require("jsonwebtoken");

const createUser = async (req, res) => {
  const data = req.body.data;
  const result = await signupUser(data);
  res.status(200).json({ result });
};

const loginUser = async (req, res) => {
  const data = req.body.data;
  var token = jwt.sign({ email: data?.email }, "raazkibthain");
  const result = await signInUser(data);
  console.log("result-------->", result);
  res.status(200).json({ result, token });
};
const updatePassword = async (req, res) => {
  const data = req.body.data;
  const result = await update_password(data);
  console.log("🚀 ~ file: User.js:18 ~ updatePassword ~ result:", result);
  res.status(200).json({ result });
};

const userDetails = async (req, res) => {
  const { token } = req?.headers;
  const result = await fetchUserDetail(token);
  return res.status(200).json({ result });
};
module.exports = {
  createUser,
  loginUser,
  updatePassword,
  userDetails,
};

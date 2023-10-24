const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const genToken = (userId) => {
  const token = jwt.sign({ id: userId }, secret, { expiresIn: "7d" });
  return token;
};

const tokenVerify = (token) => {
  const payload = jwt.verify(token, secret);
  return payload;
};

module.exports = {
  tokenVerify,
  genToken,
};

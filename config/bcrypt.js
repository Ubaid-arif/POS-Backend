const bcrypt = require("bcrypt");

const hashing = async (password) => {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  console.log("🚀 ~ file: bcrypt.js:6 ~ hashing ~ hash:", hash);
  return hash;
};

const compareHashing = (password, hash) => {
  const IsMatch = bcrypt.compare(password, hash);
  return IsMatch;
};

module.exports = {
  hashing,
  compareHashing,
};

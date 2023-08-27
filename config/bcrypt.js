const bcrypt = require("bcrypt");

const hashing = (password) => {
  const saltRounds = 10;
  const hash = bcrypt.hash(password, saltRounds);
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

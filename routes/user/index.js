const express = require("express");
const {
  createUser,
  loginUser,
  updatePassword,
  userDetails,
} = require("../../controller/user");
const { caughtError } = require("../../config/caughtError");
const { authHandler } = require("../../config/auth-strategy");
const router = express.Router();

router.post("/signup", caughtError(createUser));
router.post("/login", caughtError(loginUser));
router.post("/update", caughtError(updatePassword));
router.get("/me", authHandler, caughtError(userDetails));

// create
//update
// delete soft
//get
// login
// change password --- current password ,new password
// reset password  ----

module.exports = router;

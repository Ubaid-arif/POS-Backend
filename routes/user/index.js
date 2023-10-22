const express = require("express");
const { createUser, loginUser , updatePassword, userDetails } = require("../../controller/User");
const { caughtError } = require("../../config/caughtError");
const router = express.Router();

router.post("/signup", caughtError(createUser));
router.post("/login", caughtError(loginUser));
router.post("/update", caughtError(updatePassword));
router.post("/me", caughtError(userDetails));



// create
//update
// delete soft
//get
// login
// change password --- current password ,new password
// reset password  ----

module.exports = router;

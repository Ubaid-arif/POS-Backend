const express = require("express");
const { createUser } = require("../../controller/User");
const { caughtError } = require("../../config/caughtError");
const router = express.Router();

router.post("/signup", caughtError(createUser));

// create
//update
// delete soft
//get
// login
// change password --- current password ,new password
// reset password  ----

module.exports = router;

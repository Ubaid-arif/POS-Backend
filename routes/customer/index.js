const express = require("express");

const { caughtError } = require("../../config/caughtError");
// const { authHandler } = require("../../config/auth-strategy");
const { createCustomer, deleteCustomer } = require("../../controller/customer");
const router = express.Router();

router.post("/create", caughtError(createCustomer));
router.delete("/delete", caughtError(deleteCustomer));

module.exports = router;

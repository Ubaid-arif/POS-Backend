const express = require("express");
const router = express.Router();

router.use("/user", require("../routes/user/index"));
router.use("/customer", require("../routes/customer/index"));
router.get("/", (req, res) => {
  res.send("welcome to POS");
});

module.exports = router;

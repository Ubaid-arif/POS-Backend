const router = require("express").Router();
const {
  create_sales,
  get_sales,
  update_sales,
} = require("../../controller/sales");

router.get("/", get_sales);
router.post("/", create_sales);
router.put("/", update_sales);

module.exports = router;

const { createSales, getAllSale, updateSale } = require("../service/sales");

const create_sales = async (req, res) => {
  const result = await createSales(req.data);
  return res.status(200).json({ result });
};

const get_sales = async (req, res) => {
  const result = await getAllSale(req.query);
  return res.status(200).json({ result });
};

const update_sales = async (req, res) => {
  const result = await updateSale(req.data);
  return res.status(200).json({ result });
};

module.exports = {
  create_sales,
  get_sales,
  update_sales,
};

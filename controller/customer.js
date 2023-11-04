const { createCustomerService , deletCustomerService } = require("../service/customer");

const createCustomer = async (req, res) => {
  const data = req.body.data;
  const result = await createCustomerService(data);
  res.status(200).json({ result });
};

const deleteCustomer = async (req, res) => {
  const data = req.body.data;
  const result = await deletCustomerService(data);
  res.status(200).json({ result });
};

module.exports = {
  createCustomer,
  deleteCustomer,
};

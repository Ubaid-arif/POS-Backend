const { PrismaClient } = require("@prisma/client");
const { pagination_constructor } = require("../utils/common/constant");
const { InternalServerError, NotFoundError } = require("../config/exceptions");

const prisma = new PrismaClient();

const createSales = async ({
  quantity,
  price,
  paymentType,
  customerId,
  paid,
}) => {
  try {
    const getCustomer = prisma.customer.findFirst({
      where: {
        id: customerId,
        deleted: false,
      },
    });
    if (!getCustomer) {
      throw new NotFoundError("customer not found");
    }

    const quantity = Number(quantity);
    const price = Number(quantity);
    const paymentType =
      paymentType?.toLowerCase() == "cash" ? "CASH" : "CREDIT";
    const result = await prisma.sales.create({
      data: {
        customerId,
        quantity,
        price,
        total: quantity * price,
      },
    });
    return {
      message: "successfully create ",
      result,
    };
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

const getAllSale = async ({ paid, customerId, offset = 0, limit = 10 }) => {
  try {
    const pagination = pagination_constructor(offset, limit);
    const query = {
      where: {
        paid: paid || undefined,
        customerId: customerId || undefined,
      },
      ...pagination,
    };
    const getSales = await prisma.sales.findMany(query);
    const getCount = await prisma.sales.count(query);
    return {
      message: "sucessfully fetch",
      data: getSales,
      metaData: {
        total: getCount,
        limit,
        offset,
      },
    };
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

const updateSale = async ({ id, ...rest }) => {
  try {
    const getSale = await prisma.sales.findFirst({ where: { id } });
    if (!getSale) throw new NotFoundError();
    const quantity = +rest?.quantity || getSale.quantity;
    const price = Number(rest?.price) || getSale.price;
    const total = quantity * price;
    const data = {
      total,
      quantity,
      price,
      paymentType,
      customerId,
    };
    if (rest?.paid) {
      data.paid = paid && paid.toLowerCase() == "cash" ? "CASH" : "CREDIT";
    }
    const update = await prisma.sales.update({ data, where: { id } });
    return {
      message: "update successfully",
      data: update,
    };
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

module.exports = {
  createSales,
  getAllSale,
  updateSale,
};

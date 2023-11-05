const { PrismaClient } = require("@prisma/client");
const {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} = require("../config/exceptions");

const prisma = new PrismaClient();

exports.createCustomerService = async ({
  name,
  code,
  address,
  phoneNumber,
}) => {
  try {
    const ExitCustomer = await prisma.customer.findFirst({
      where: {
        code: code,
        deleted: false,
      },
    });

    if (ExitCustomer) {
      throw new BadRequestError(
        "Customer is already exist please try another Customer Code"
      );
    } else {
      const newCustomer = await prisma.customer.create({
        data: {
          name,
          code,
          address,
          phoneNumber,
        },
      });

      return newCustomer;
    }
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

// delet Customer

exports.deletCustomerService = async ({ id }) => {
  try {
    const ExitCustomer = await prisma.customer.findFirst({
      where: {
        id: id,
        deleted: false,
      },
    });

    if (!ExitCustomer) {
      throw new BadRequestError("customer is not exit");
    }
    const result = await prisma.customer.update({
      where: {
        id,
      },
      data: {
        deleted: true,
      },
    });
    return {
      message: "user is deleted",
    };
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

// update Customer
exports.updateCustomer = async ({ id, code, ...rest }) => {
  try {
    const getCustomer = await prisma.customer.findFirst({ where: { id } });

    if (!getCustomer) throw new NotFoundError();

    const CheckCode = await prisma.customer.findFirst({ where: { code } });
    if (CheckCode) {
      throw new BadRequestError(
        "This Code is already exit Please try a new Code "
      );
    }
    const data = {
      code,
      ...rest,
    };
    const update = await prisma.customer.update({ data, where: { id } });
    return {
      message: "update successfully",
      data: update,
    };
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

// naming,
// exports,
// js // constant

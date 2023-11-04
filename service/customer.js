const { PrismaClient } = require("@prisma/client");
const {
  BadRequestError,
  InternalServerError,
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

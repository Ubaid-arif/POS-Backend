const { PrismaClient } = require("@prisma/client");
const {
  BadRequestError,
  InternalServerError,
} = require("../config/exceptions");
const prisma = new PrismaClient();
exports.signupUser = async ({ name, email, password, number }) => {
  try {
    const ExitUser = await prisma.users.findFirst({
      where: {
        name: name,
        email: email,
        deleted: false,
      },
    });
    if (ExitUser) {
      throw new BadRequestError(
        "user already exist please try with another email or phoneNumber"
      );
    } else {
      const result = await prisma.users.create({
        data: {
          email,
          name,
          number,
          password,
        },
      });
      return result;
    }
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

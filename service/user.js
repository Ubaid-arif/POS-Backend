const { PrismaClient } = require("@prisma/client");
const errorLogger = require("../config/error.logger");
const prisma = new PrismaClient();
const signupUser = async ({ name, email, password, phoneNumber }) => {
  try {
    const result = await prisma.user.create({
      data: {
        name,
        email,
        password,
        phoneNumber,
      },
    });
    return result;
  } catch (error) {
    errorLogger.error(error, "An error occurred");
  }
};

module.exports = {
  signupUser,
};

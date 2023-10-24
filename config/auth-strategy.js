// middleware for checking req

const { PrismaClient } = require("@prisma/client");
const { UnauthorizedError, BadRequestError } = require("./exceptions");
const { tokenVerify } = require("./jwt-strategy");

const prisma = new PrismaClient();

exports.authHandler = async (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];
  if (!token) {
    throw new UnauthorizedError("token is required");
  }

  const isVerify = tokenVerify(token);
  console.log("🚀 ~ file: auth-strategy.js:13 ~ isVerify:", isVerify);

  if (!isVerify) {
    throw new UnauthorizedError("invalid token");
  }
  const user = await prisma.users.findFirst({
    where: {
      id: isVerify?.id,
      deleted: false,
    },
  });

  if(!user) {
    throw new BadRequestError("User not found")
  }

  delete user.password 
  req.user = user

  next();
};

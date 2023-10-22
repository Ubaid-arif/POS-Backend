const { PrismaClient } = require("@prisma/client");
const {
  BadRequestError,
  InternalServerError,
} = require("../config/exceptions");
const { hashing, compareHashing } = require("../config/bcrypt");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

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
      const hash = await hashing(password);
      const result = await prisma.users.create({
        data: {
          email,
          name,
          number,
          password: hash,
        },
      });
      return result;
    }
  } catch (error) {
    throw new InternalServerError(error.message);
  }
};

exports.signInUser = async ({ email, password }) => {
  const getUser = await prisma.users.findFirst({
    where: {
      email,
      deleted: false,
    },
  });
  if (!getUser) {
    throw new BadRequestError("User Not Found");
  } else {
    const IsMatch = compareHashing(password, getUser.password);
    if (!IsMatch) {
      throw new BadRequestError("Invalid Credentials");
    } else {
      return "sucessfully login";
    }
  }
};

exports.update_password = async ({ email, password }) => {
  const getUser = await prisma.users.findFirst({
    where: {
      email,
      deleted: false,
    },
  });
  if (!getUser) {
    throw new BadRequestError("User Not Found");
  } else {
    const IsMatch = await compareHashing(password, getUser.password);
    if (IsMatch) {
      throw new BadRequestError("Please Create a new password");
    } else {
      const hash = await hashing(password);
      const result = await prisma.users.update({
        where: {
          id: getUser.id,
        },
        data: {
          password: hash,
        },
      });
      delete result.password;
      return { message: "successfully updated", result };
    }
  }
};

exports.fetchUserDetail = async (token) => {
  var decoded = await jwt.verify(token, "raazkibthain");
  console.log("decoded-------->", decoded);
  if (decoded.email) {
    let email = decoded?.email;
    const getUser = await prisma.users.findFirst({
      where: {
        email,
        deleted: false,
      },
    });
    return { message: "use mil gaya hain", getUser };
  } else {
    return { message: "token sahi hain hain Bhai" };
  }
};

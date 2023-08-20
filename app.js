const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { PrismaClient } = require("@prisma/client");
const errorLogger = require("./config/error.logger");
const {
  logError,
  returnError,
  isOperationalError,
  requestCaught,
} = require("./config/caughtError");

const prisma = new PrismaClient();
dotenv.config();
const port = process.env.PORT || 3001;

app.listen(port, async () => {
  console.log(`app is runnig on port ${port}`);
  await prisma.$connect().then(console.log("db connect"));
});
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));
app.use(requestCaught);
app.use("/", require("./routes"));
app.use(returnError);

//uncaught exceptions handler
process.on("uncaughtException", (error, req, res, next) => {
  errorLogger.err(error || "Uncaught exception");
  if (!isOperationalError(error)) {
    process.exit(1);
  }
});

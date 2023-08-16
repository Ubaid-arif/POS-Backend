const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const { PrismaClient } = require("@prisma/client");
const errorLogger = require("./config/error.logger");

const prisma = new PrismaClient();
dotenv.config();
const port = process.env.PORT || 3001;

app.use((err, req, res, next) => {
  errorLogger.error(err, "An error occurred");
  res.status(500).send("Internal Server Error");
});

app.listen(port, async () => {
  console.log(`app is runnig on port ${port}`);
  await prisma.$connect().then(console.log("db connect"));
});
app.use(cors({ origin: "*" }));
app.use(helmet());
app.use(express.json());
app.use("/", require("./routes"));

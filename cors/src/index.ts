import express from "express";
import axios from "axios";
import proxy from "./handlers/proxy";
import dotenv from "dotenv";
import { InstanceInitiatedShutdownBehavior } from "aws-cdk-lib/aws-ec2";
import initDb from "./db/initDb";

const PORT = process.env.PORT || 3000;

const main = async () => {
  dotenv.config();
  const app = express();

  await initDb();

  app.get("/", (req, res) => {
    res.send("Send requests to /proxy");
  });

  app.get("/proxy", proxy);

  app.set("port", PORT);

  app.listen(app.get("port"), function () {
    console.log(`server listening on port ${app.get("port")}`);
  });
};
main();

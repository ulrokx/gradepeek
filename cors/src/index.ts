import express from "express";
import proxy from "./handlers/proxy";
import dotenv from "dotenv";
import initDb from "./db/initDb";
import cors from "cors"

const PORT = process.env.PORT || 3000;

const main = async () => {
  dotenv.config();
  const app = express();
  app.use(cors())

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

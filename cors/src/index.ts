import express from "express";
import proxy from "./handlers/proxy";
import contact from "./handlers/contact"
import dotenv from "dotenv";
import initDb from "./db/initDb";
import cors from "cors"
import bodyParser from "body-parser";

const PORT = process.env.PORT || 3000;

const main = async () => {
  dotenv.config();
  const app = express();
  app.use(cors())
  app.use(bodyParser.urlencoded())

  await initDb();

  
  app.get("/api/version", (req, res) => {
    res.send(process.env.VERSION || "unknown");
  })

  app.get("/proxy", proxy);
  app.post("/api/contact", contact)
  
  app.set("port", PORT);

  app.use(express.static("src/website/build", {extensions: ["html"]}));

  
  app.listen(app.get("port"), function () {
    console.log(`server listening on port ${app.get("port")}`);
  });
};
main();

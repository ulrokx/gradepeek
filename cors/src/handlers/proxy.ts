import { RequestHandler } from "express";
import axios from "axios";
import getPool from "../db/getClient";

const handler: RequestHandler = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  if (req.method === "OPTIONS") {
    res.send();
  } else {
    const targetURL =
      (req.header("Target-URL") as string) ||
      (req.query.targetURL as string);
    if (!targetURL) {
      res
        .status(500)
        .send(
          "Target-URL header or targetURL query parameter is required"
        );
    }
    const pool = getPool();
    try {
      await pool.query(
        `INSERT INTO "requests" VALUES (DEFAULT, current_timestamp, $1, $2)`,
        [targetURL, req.header("Version")]
      );
    } catch (err) {
      console.error(err);
    }
    axios({
      url: targetURL,
      method: req.method,
      data: req.body,
      headers: { Authorization: req.header("Authorization") },
      responseType: "stream",
    }).then(({ data }) => {
      data.pipe(res);
    });
  }
};
export default handler;

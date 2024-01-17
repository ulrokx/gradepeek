import { RequestHandler } from "express";
import getPool from "../db/getClient";

const handler: RequestHandler = async (req, res) => {
    const { name, email, message } = req.body;
    const db = getPool();
    try {
        await db.query(`INSERT INTO "contact" VALUES (DEFAULT, $1, $2, $3)`, [name, email, message]);
        res.send("Message sent successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Something went wrong");
    }
}

export default handler;
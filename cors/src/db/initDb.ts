import getPool from "./getClient";

const initDb = async () => {
  const pool = getPool();
  await pool.query(`CREATE TABLE IF NOT EXISTS "requests" (
        "id" SERIAL,
        "created_at" TIMESTAMP,
        "target_url" VARCHAR(250),
        "version" VARCHAR(20),
        PRIMARY KEY ("id")
    )`);
  await pool.query(`CREATE TABLE IF NOT EXISTS "contact" (
      "id" SERIAL,
      "name" VARCHAR(250),
      "email" VARCHAR(250),
      "message" VARCHAR(250)
  )`)
};
export default initDb;

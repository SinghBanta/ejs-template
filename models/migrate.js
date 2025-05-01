const fs = require("fs");
const path = require("path");
const pool = require("../config/db");

const migrate = async () => {
  const sql = fs.readFileSync(path.join(__dirname, "init.sql")).toString();
  try {
    await pool.query(sql);
    console.log("Migration applied successfully ✅");
  } catch (err) {
    console.error("Migration failed ❌", err);
  } finally {
    pool.end();
  }
};

migrate();

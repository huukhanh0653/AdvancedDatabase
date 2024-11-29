const { sql, poolPromise } = require("../model/dbConfig");

async function queryDB(query) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(query);

    if (!result) {
      return null;
    }

    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = queryDB;

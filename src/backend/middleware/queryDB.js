const {sql, poolPromise} = require("../model/dbConfig");

async function queryDB(query) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(query);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function queryDBWithParam(query, param) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input("param", param).query(query);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function executeProcedure(procedure, params) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().input("param", params).execute(procedure);
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = { queryDB, queryDBWithParam, executeProcedure };
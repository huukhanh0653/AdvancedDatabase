const { sql, poolPromise } = require("../model/dbConfig");

async function query_paginating(tableName, primaryKey, pageSize, pageNumber) {
  let query = `SELECT * FROM ${tableName} 
  ORDER BY ${primaryKey}
  OFFSET ${pageSize * (pageNumber - 1)} ROWS
  FETCH NEXT ${pageSize} ROWS ONLY`;
  const pool = await poolPromise;
  const result = await pool.request().query(query);
  return result;
}

module.exports = {
  query_paginating,
};

const { sql, poolPromise } = require("./dbConfig");

async function query_paginating(tableName, primaryKey, pageSize, pageNumber) {
  let query = `SELECT * FROM ${tableName} 
  ORDER BY ${primaryKey}
  OFFSET ${pageSize * (pageNumber - 1)} ROWS
  FETCH NEXT ${pageSize} ROWS ONLY`;
  const pool = await poolPromise;
  const result = await pool.request().query(query);
  return result;
}

async function getAllTable(MaCN){
  let query = `SELECT * FROM NHANVIEN WHERE MaCN = ${MaCN}`;
  const pool = await poolPromise;
  const result = await pool.request().query(query);
  return result;
}

module.exports = {
  query_paginating,
};

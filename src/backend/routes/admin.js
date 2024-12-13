var express = require("express");
const passport = require("../middleware/passport");
const { isEmployee } = require("../middleware/auth");
var router = express.Router();
const { sql, poolPromise } = require("../model/dbConfig");
const { executeProcedure } = require("../middleware/queryDB");
require("../model/query");

router.get("/get-all-bophan", async function (req, res, next) {
  let query = `SELECT * FROM BOPHAN`;
  const pool = await poolPromise;
  const result = await pool.request().query(query);
  if (!result) {
    return res.status(500).json({ message: "Internal server error" });
  }
  console.log(result.recordset);
  return res.status(200).json(result.recordset);
});

router.get("/get-all-nhanvien", async function (req, res, next) {
  console.log(req.query);

  // let query = `SELECT * FROM NHANVIEN
  // ORDER BY MaNV
  // OFFSET ${req.query.PageSize * (req.query.PageNumber - 1)} ROWS
  // FETCH NEXT ${req.query.PageSize} ROWS ONLY`;

  let query = `SELECT * FROM NHANVIEN`;

  const pool = await poolPromise;
  const result = await pool.request().query(query);
  if (!result) {
    return res.status(500).json({ message: "Internal server error" });
  }
  console.log(result.recordset);
  return res.status(200).json(result.recordset);
});

module.exports = router;
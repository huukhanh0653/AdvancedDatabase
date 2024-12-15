var express = require("express");
const passport = require("../middleware/passport");
const {
  isEmployee,
  isManager,
  isAdministrator,
} = require("../middleware/auth");
var router = express.Router();
const { sql, poolPromise } = require("../model/dbConfig");
const { executeProcedure, query_paginating } = require("../model/queryDB");
const queryDB = require("../model/query");
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

  let pageSize = req.query.PageSize ? parseInt(req.query.PageSize, 10) : 25;
  let pageNumber = req.query.PageNumber
    ? parseInt(req.query.PageNumber, 10)
    : 1;

  const result = await query_paginating(
    "NHANVIEN",
    "MaNV",
    pageSize,
    pageNumber
  );
  if (!result) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result.recordset);
});

router.get("/get-all-khachhang", async function (req, res, next) {
  console.log(req.query);

  let pageSize = req.query.PageSize ? parseInt(req.query.PageSize, 10) : 25;
  let pageNumber = req.query.PageNumber
    ? parseInt(req.query.PageNumber, 10)
    : 1;

  const result = await query_paginating(
    "KHACHHANG",
    "MaKH",
    pageSize,
    pageNumber
  );
  if (!result) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result.recordset);
});

router.get("/get-all-hoadon", async function (req, res, next) {
  console.log(req.query);

  let pageSize = req.query.PageSize ? parseInt(req.query.PageSize, 10) : 25;
  let pageNumber = req.query.PageNumber
    ? parseInt(req.query.PageNumber, 10)
    : 1;

  const result = await query_paginating("HOADON", "MaHD", pageSize, pageNumber);
  if (!result) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result.recordset);
});

// Lay thong tin cac ban an trong mot chi nhanh bat ky
router.get("/tables", isEmployee, async function (req, res, next) {
  let result = false;
  let MaCN = false;

  if (isAdministrator(req.user)) MaCN = req.query.id;
  else MaCN = req.user.CN_HienTai;

  // Lấy thông tin các bàn hiện tại của chi nhánh
  let tables = await queryDB.getAllTable(MaCN);

  

  if (!result)
    return res.status(500).json({ message: "Internal server error" });
  else return res.status(200).json(result.recordset);
});

module.exports = router;

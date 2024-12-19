var express = require("express");
const passport = require("../middleware/passport");
const {
  isEmployee,
  isAdministrator,
} = require("../middleware/auth");
var router = express.Router();
const { sql, poolPromise } = require("../model/dbConfig");
const {
  getTableInfo,
  queryPaginating,
  getTableDetail,
  getReservations,
} = require("../model/queryDB");
const { formatAsSQLDate } = require("../middleware/utils");

router.get("/get-all-bophan", async function (req, res, next) {
  let query = `SELECT * FROM BOPHAN`;
  const pool = await poolPromise;
  const result = await pool.request().query(query);
  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

router.get("/get-all-nhanvien", async function (req, res, next) {
  console.log(req.query);

  let pageSize = req.query.PageSize ? parseInt(req.query.PageSize, 10) : 25;
  let pageNumber = req.query.PageNumber
    ? parseInt(req.query.PageNumber, 10)
    : 1;

  const result = await queryPaginating(
    "NHANVIEN",
    "MaNV",
    pageSize,
    pageNumber
  );
  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

router.get("/customers", async function (req, res, next) {
  console.log(req.query);

  let pageSize = req.query.PageSize ? parseInt(req.query.PageSize, 10) : 25;
  let pageNumber = req.query.CurrentPage
    ? parseInt(req.query.CurrentPage, 10)
    : 1;

  const result = await queryPaginating(
    "KHACHHANG",
    "MaKH",
    pageSize,
    pageNumber
  );

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

// Lay thong tin cac ban an trong mot chi nhanh bat ky
router.get("/info", async function (req, res, next) {
  let result = false;
  let MaCN = false;

  // if (isAdministrator(req.body.user)) MaCN = req.query.id;
  // else MaCN = req.body.user.CN_HienTai;
  if(req.query.id != null) {
    MaCN = req.query.id;
  }
  else {
    // MaCN = req.body.user.CN_HienTai;
  }

  // Lấy thông tin các bàn hiện tại của chi nhánh
  result = await getTableInfo(MaCN);

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

// Lay thong tin chi tiet cua mot ban an
router.get("/table", async function (req, res, next) {
  let result = false;
  let MaBan = req.query.id;

  // Lấy thông tin các bàn hiện tại của chi nhánh
  result = await getTableDetail(MaBan);

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

// Lay toan bo phieu dat ban trong mot ngay cu the tai mot chi nhanh
router.get("/reservations", async function (req, res, next) {
  let result = false;
  // Nếu là admin thì dùng id truyền vào, còn không thì lấy chi nhánh hiện tại
  let MaCN = false;
  if(req.query.id != null) {
    MaCN = req.query.id;
  }
  else {
    // MaCN = req.body.user.CN_HienTai;
  }
  let Date = req.query.date
    ? formatAsSQLDate(req.query.date)
    : formatAsSQLDate(Date.now());

  result = await getReservations(MaCN, Date);

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

router.get("/bill", async function (req, res, next) {
  let result = false;
  let PageNumber = req.query.CurrentPage ? req.query.CurrentPage : 1;
  let PageSize = req.query.PageSize ? req.query.PageSize : 25;

  result = await queryPaginating("HOADON", "MAHD", PageSize, PageNumber);

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);

});

////////////////////////////////////////////////////////////////////////////////////////
//Testing
router.get("/testing", async function (req, res, next) {
  let result = false;
  let PageNumber = req.query.CurrentPage ? req.query.CurrentPage : 1;
  let PageSize = req.query.PageSize ? req.query.PageSize : 25;

  // result = await queryPaginating("HOADON", "MaHD", PageSize, PageNumber);
  result = await queryPaginating("HOADON", "MAHD", PageSize, PageNumber);

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

module.exports = router;

var express = require("express");
const passport = require("../middleware/passport");

const { isEmployee, _isAdministrator } = require("../middleware/auth");

var router = express.Router();
const { sql, poolPromise } = require("../model/dbConfig");
const {
  getTableInfo,
  queryPaginating,
  getTableDetail,
  getReservations,
  callFunction,
  getBillDetail,
  getCustomer,
  getDishes,
  getStatistic,
  getMember,
  getRegionalDishes,
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

  const result = await getCustomer(pageSize, pageNumber);

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

// Lay thong tin cac ban an trong mot chi nhanh bat ky
router.get("/info", async function (req, res, next) {
  let result = false;
  let MaCN = req.query.id;

  // if (_isAdministrator(req.user)) MaCN = req.query.id;
  // else MaCN = req.user.CN_HienTai;

  // Lấy thông tin các bàn hiện tại của chi nhánh
  result = await getTableInfo(MaCN);
  console.log(result);

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
  let MaCN = isAdministrator(req.user) ? req.query.id : req.user.CN_HienTai;
  let formattedDate = req.query.date
    ? formatAsSQLDate(req.query.date)
    : formatAsSQLDate(Date.now());

  result = await getReservations(MaCN, Date);

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

// Lay toan bo hoa don trong mot ngay cu the tai mot chi nhanh
router.get("/bill", async function (req, res, next) {
  let result = false;
  let PageNumber = req.query.CurrentPage ? req.query.CurrentPage : 1;
  let PageSize = req.query.PageSize ? req.query.PageSize : 25;
  // Phan quyen theo chi nhanh va cong ty
  let MaCN = req.query.CurBranch;

  result = await queryPaginating(
    `SELECT * FROM HOADON WHERE MACN = ${MaCN}`,
    PageSize,
    PageNumber
  );

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

router.get("/bill-detail", async function (req, res, next) {
  let result = false;
  let MaHD = req.query.id;
  result = await getBillDetail(MaHD);
  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

router.get("/dishes", async function (req, res, next) {
  let result = false;

  let PageNumber = req.query.CurrentPage ? req.query.CurrentPage : 1;
  let PageSize = req.query.PageSize ? req.query.PageSize : 25;
  let Category  = req.query.Category ? req.query.Category : "%";
  let MaCN = req.query.CurBranch? req.query.CurBranch : 1;

  result = await getDishes(MaCN, Category, PageSize, PageNumber);

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

router.get("/regional-dishes", async function (req, res, next) {
  let result = false;

  let PageNumber = req.query.CurrentPage ? req.query.CurrentPage : 1;
  let PageSize = req.query.PageSize ? req.query.PageSize : 25;
  let Category  = req.query.Category ? req.query.Category : "%";
  let MaKV = req.query.Region? req.query.Region : null;
  
  if (!MaKV) {
    return res.status(400).json({ message: "Invalid Region ID" });
  }

  result = await getRegionalDishes(MaKV, Category, PageSize, PageNumber);

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

router.get("/employees", async function (req, res, next) {
  let result = false;

  let PageNumber = req.query.CurrentPage ? req.query.CurrentPage : 1;
  let PageSize = req.query.PageSize ? req.query.PageSize : 25;
  let MaCN = req.query.CurBranch? req.query.CurBranch : null;

  result = await queryPaginating(
    `SELECT * FROM NHANVIEN` + (MaCN ? ` WHERE CN_HienTai = ${MaCN}` : ""),
    PageSize,
    PageNumber
  );

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

router.get("/member", async function (req, res, next) {
  let result = false;

  let MaKH = req.query.CustomerID? req.query.CustomerID : null;

  if (!MaKH) {
    return res.status(400).json({ message: "Invalid Customer ID" });
  }

  result = await getMember(MaKH);

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});



////////////////////////////////////////////////////////////////////////////////////////
//Testing
router.get("/testing", async function (req, res, next) {
  let result = false;
  let MaHD = 100;

  result = await getBillDetail(MaHD);

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

module.exports = router;

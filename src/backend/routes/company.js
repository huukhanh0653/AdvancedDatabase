var express = require("express");
const passport = require("../middleware/passport");

const { isEmployee, _isAdministrator } = require("../middleware/auth");

var router = express.Router();
const { sql, poolPromise } = require("../model/dbConfig");
const {
  queryPaginating,
  getCompanyDishes,
  queryDB,
} = require("../model/queryDB");

const { formatAsSQLDate } = require("../middleware/utils");

router.get("/menu-info", async function (req, res, next) {
  let result = false;

  result = await queryDB(
    `SELECT PhanLoai, COUNT(*) AS TotalDish FROM MONAN GROUP BY PhanLoai` 
  )

  let data = {};
  let totalDish = 0;
  result.forEach((row) => {
    data[row.PhanLoai] = row.TotalDish;
    totalDish += row.TotalDish;
  });

  result = {"totalDish": totalDish, "data": data};

  console.log(result);
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

  result = await getCompanyDishes(Category, PageSize, PageNumber);
  console.log(result);

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});


router.get("/total-employee", async function (req, res, next) {
  let result = false;


  result = await queryDB(
    `SELECT COUNT(*) AS TotalEmployee FROM NHANVIEN`
  )
  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result[0]);
});

router.get("/employees", async function (req, res, next) {
  let result = false;

  let PageNumber = req.query.CurrentPage ? req.query.CurrentPage : 1;
  let PageSize = req.query.PageSize ? req.query.PageSize : 25;


  result = await queryPaginating(
    'SELECT * FROM NHANVIEN',
    PageSize,
    PageNumber
  );

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

router.get("/work-history", async function (req, res, next) {
  let result = false;

  result = await queryDB(
    `SELECT * FROM DOICN WHERE MaNV = ${req.query.employeeID}`
  );

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

module.exports = router;
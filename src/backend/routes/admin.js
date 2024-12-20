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
  queryDB,
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
  let MaCN = false;

  // if (isAdministrator(req.body.user)) MaCN = req.query.id;
  // else MaCN = req.body.user.CN_HienTai;
  if(req.query.CurBranch != null) {
    MaCN = req.query.CurBranch;
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
    `SELECT * FROM HOADON WHERE MaCN = ${MaCN}`,
    PageSize,
    PageNumber
  );


  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

// Lay toan bo hoa don trong mot ngay cu the tai mot chi nhanh
router.get("/total-bill", async function (req, res, next) {
  let result = false;
  // Phan quyen theo chi nhanh va cong ty
  let MaCN = req.query.CurBranch;

  result = await queryDB(
    `SELECT COUNT(*) AS TotalBill FROM HOADON WHERE MaCN = ${MaCN}`
  )
  console.log(result[0]);

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result[0]);
});

router.get("/bill-detail", async function (req, res, next) {
  let result = false;
  let MaHD = req.query.billID;
  result = await getBillDetail(MaHD);
  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

router.get("/total-dish", async function (req, res, next) {
  let result = false;
  // Phan quyen theo chi nhanh va cong ty
  let MaCN = req.query.CurBranch;
  let Category = req.query.Category;

  result = await queryDB(
    `SELECT COUNT(*) AS TotalDish
    FROM MONAN JOIN PHUCVU ON MONAN.MaMon = PHUCVU.MaMon
    WHERE PHUCVU.MaCN = ${MaCN} AND MONAN.phanLoai='${Category}'`
  )


  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result[0]);
});

router.get("/dish-per-category", async function (req, res, next) {
  let result = false;
  let MaCN = req.query.CurBranch;

  result = await queryDB(
    `SELECT PhanLoai, COUNT(*) AS TotalDish FROM MONAN JOIN PHUCVU ON MONAN.MaMon = PHUCVU.MaMon WHERE PHUCVU.MaCN = ${MaCN} GROUP BY PhanLoai` 
  )

  let data = {};
  result.forEach((row) => {
    data[row.PhanLoai] = row.TotalDish;
  });

  result = data;

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
  
  let MaCN = req.query.CurBranch? req.query.CurBranch : null;

  let MaKV = await queryDB(
    `SELECT MaKV FROM CHINHANH WHERE MaCN = ${MaCN}`
  );
  MaKV = MaKV[0].MaKV;
  console.log(MaKV);

  if (!MaKV) {
    return res.status(400).json({ message: "Cannot find region" });
  }

  result = await getRegionalDishes(MaKV, Category, PageSize, PageNumber);

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});


router.get("/regional-dish-info", async function (req, res, next) {
  let result = false;
  let MaCN = req.query.CurBranch;
  const MaKV = await queryDB(
    `SELECT MaKV FROM CHINHANH WHERE MaCN = ${MaCN}`
  );


  result = await queryDB(
    `SELECT MONAN.PhanLoai, COUNT(*) AS TotalDish 
    FROM MONAN 
    JOIN THUCDON ON MONAN.MaMon = THUCDON.MaMon 
    WHERE THUCDON.MaKV = '${MaKV[0].MaKV}'
    GROUP BY MONAN.PhanLoai`
  )
  console.log(result);

  let data = {};
  let total = 0;
  result.forEach((row) => {
    data[row.PhanLoai] = row.TotalDish;
    total += row.TotalDish;
  });

  result = {"data": data, "total": total};

  console.log(result);
  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

router.get("/total-employee", async function (req, res, next) {
  let result = false;
  // Phan quyen theo chi nhanh va cong ty
  let MaCN = req.query.CurBranch;

  result = await queryDB(
    `SELECT COUNT(*) AS TotalEmployee FROM NHANVIEN WHERE CN_HienTai = ${MaCN}`
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
  let MaCN = req.query.CurBranch? req.query.CurBranch : null;

  result = await queryPaginating(
    `SELECT * FROM NHANVIEN` + (MaCN ? ` WHERE CN_Hientai = ${MaCN}` : ""),
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

router.get("/total-customer", async function (req, res, next) {
  let result = false;


  result = await queryDB(
    'SELECT COUNT(*) AS TotalCustomer FROM KHACHHANG'
  )

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result[0]);
});

router.get("/customers", async function (req, res, next) {
  let result = false;

  let PageNumber = req.query.CurrentPage ? req.query.CurrentPage : 1;
  let PageSize = req.query.PageSize ? req.query.PageSize : 25;

  result = await queryPaginating(
    `SELECT * FROM KHACHHANG`,
    PageSize,
    PageNumber
  );

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

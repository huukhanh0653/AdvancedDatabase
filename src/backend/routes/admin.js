const express = require("express");
const router = express.Router();
const multer = require("multer");
const passport = require("../middleware/passport");
const upload = multer();

const { isEmployee, _isAdministrator } = require("../middleware/auth");

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
  executeProcedure,
  queryDB,
} = require("../model/queryDB");

const { formatAsSQLDate } = require("../middleware/utils");

const {
  createNewDish,
  createNewCustomer,
  createNewEmployee,
  createNewStaffTransfer,
  createNewMember,
  addDishToBranch,
  createNewOrder,
  deleteOrder,
  createNewOrderDetail,
  deleteCustomer,
  deleteDish,
} = require("../model/query_post");

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
  // let MaCN = isAdministrator(req.user) ? req.query.id : req.user.CN_HienTai;
  let MaCN = req.query.CurBranch;
  let formattedDate = req.query.Date
    ? formatAsSQLDate(req.query.Date)
    : formatAsSQLDate(Date.now());

  result = await getReservations(MaCN, formattedDate);

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
  let Category = req.query.Category ? req.query.Category : "%";
  let MaCN = req.query.CurBranch ? req.query.CurBranch : 1;

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
  let Category = req.query.Category ? req.query.Category : "%";
  let MaKV = req.query.Region ? req.query.Region : null;

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
  let MaCN = req.query.CurBranch ? req.query.CurBranch : null;

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

  let MaKH = req.query.CustomerID ? req.query.CustomerID : null;

  if (!MaKH) {
    return res.status(400).json({ message: "Invalid Customer ID" });
  }

  result = await getMember(MaKH);

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

//! Chưa fix được lỗi
router.get("/statistic", async function (req, res, next) {
  let result = false;
  let MaCN = req.query.CurBranch ? req.query.CurBranch : 1;
  let fromDate = req.query.FromDate
    ? formatAsSQLDate(req.query.FromDate)
    : null;
  let toDate = req.query.ToDate
    ? formatAsSQLDate(req.query.ToDate)
    : formatAsSQLDate(Date.now());

  if (!MaCN || !fromDate || !toDate)
    return res.status(400).json({ message: "Invalid Branch ID or Date" });

  result = await getStatistic(MaCN, fromDate, toDate);

  if (!result || result.length === 0)
    return res
      .status(500)
      .json({ message: "Internal server error or empty data" });

  return res.status(200).json(result);
});

////////////////////////////////////////////////////////////////////////////////////////
//* Test rồi
router.post("/new_dish", upload.none(), async function (req, res, next) {
  const dish = req.body;

  //& Sẽ bổ sung phần xác thực phân quyền cho chức năng này
  //& (admin mới có quyền thêm món trên toàn hệ thống)
  const result = await createNewDish(dish);

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

//* Test rồi
router.post("/new_customer", upload.none(), async function (req, res, next) {
  let customer = req.body;

  if (customer["gender"] && customer["gender"].toUpperCase() === "MALE") {
    customer["isMale"] = 1;
  } else {
    customer["isMale"] = 0;
  }

  const result = await createNewCustomer(customer);

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

//* Test rồi
router.post("/new_employee", upload.none(), async function (req, res, next) {
  let employee = req.body;
  //& Sẽ bổ sung phần xác thực phân quyền cho chức năng này
  employee.curBranch = req.query.CurBranch ? req.query.CurBranch : 1;

  const result = await createNewEmployee(employee);

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

//* Test rồi
router.post(
  "/new_staff_transfer",
  upload.none(),
  async function (req, res, next) {
    let staffTransfer = req.body;

    //& Sẽ bổ sung phần xác thực phân quyền cho chức năng này
    staffTransfer.EmployeeID = req.query.EmployeeID ? req.query.EmployeeID : 1;

    const result = await createNewStaffTransfer(staffTransfer);

    if (!result || result.length === 0) {
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json(result);
  }
);

//! proc ở sql chạy được nhưng mà lên đây nó load mãi không ra -> chưa fix kịp
router.post("/new_membership", upload.none(), async function (req, res, next) {
  console.log(req.query);
  let customerID = req.query.CustomerID ? req.query.CustomerID : null;
  console.log(customerID);
  let MaThe = await queryDB(
    `SELECT TOP 1 MaThe FROM THETHANHVIEN ORDER BY MaThe DESC`
  );
  MaThe = parseInt(MaThe[0][""]) + 1;
  MaThe = MaThe.toString();

  let MaNV = req.query.EmployeeID ? req.query.EmployeeID : 1;

  let member = { mathe: MaThe, manv: MaNV, makh: customerID };

  if (!customerID)
    return res.status(400).json({ message: "Invalid Customer ID" });

  let result = await createNewMember(member);

  if (!result || result.length === 0)
    return res.status(500).json({ message: "Internal server error" });
});

//! Test chưa kỹ
router.post(
  "/add_dish_to_branch",
  upload.none(),
  async function (req, res, next) {
    let dishBranch = req.body;

    //& Sẽ bổ sung phần xác thực phân quyền cho chức năng này
    dishBranch.curBranch = req.query.CurBranch ? req.query.CurBranch : 1;

    const result = await addDishToBranch(dishBranch);

    if (!result || result.length === 0)
      return res.status(500).json({ message: "Internal server error" });

    return res.status(200).json(result);
  }
);

router.post("/new_order", upload.none(), async function (req, res, next) {
  let order = req.body;
  //! Procedure route này đang bị lỗi, chưa thể sử dụng
  return res.status(500).json({ message: "Internal server error" });
  //& Sẽ bổ sung phần xác thực phân quyền cho chức năng này
  order.tableID = req.query.tableID ? req.query.tableIDh : 1;
  order.isEatIn = req.query.isEatIn ? req.query.isEatIn : 1;

  const result = await createNewOrder(order);

  if (!result || result.length === 0)
    return res.status(500).json({ message: "Internal server error" });

  return res.status(200).json(result);
});

//! Buồn ngủ quá -> Chưa test
router.delete("/delete_order", async function (req, res, next) {
  let MaHD = req.query.id;

  const result = await deleteOrder(MaHD);

  if (!result || result.length === 0)
    return res.status(500).json({ message: "Internal server error" });

  return res.status(200).json(result);
});

//! Buồn ngủ quá -> Chưa test
router.delete("/delete_customer", async function (req, res, next) {
  let MaKH = req.query.id;

  const result = await deleteCustomer(MaKH);

  if (!result || result.length === 0)
    return res.status(500).json({ message: "Internal server error" });

  return res.status(200).json(result);
});


//! Buồn ngủ quá -> Chưa test
router.delete("/delete_dish", async function (req, res, next) {
  let MaMon = req.query.id;

  const result = await deleteDish(MaMon);

  if (!result || result.length === 0)
    return res.status(500).json({ message: "Internal server error" });

  return res.status(200).json(result);
});

////////////////////////////////////////////////////////////////////////////////////////
//^ Route dùng để test các chức năng mới
router.get("/testing", async function (req, res, next) {
  let result = false;
  let MaHD = 100;

  result = await executeProcedure("SP_DRAFT");

  if (!result || result.length === 0) {
    return res.status(500).json({ message: "Internal server error" });
  }
  return res.status(200).json(result);
});

module.exports = router;

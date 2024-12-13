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

router.post("/register", async function (req, res, next) {
  const { username, password, name, phone, email, cccd, gender } = req.query;

  if (!username || !password || !name || !phone || !email || !cccd || !gender)
    return res.status(400).json({ message: "Missing required information" });

  if (
    !queryDB(
      `INSERT INTO TaiKhoan (Username, Password, isActive) VALUES ('${username}, '${password}', 1)`
    )
  )
    return res.status(500).json({ message: "Internal server error" });

  let MaKH = queryDB("SELECT * FROM KHACHHANG").recordset.length;
  if (!MaKH) MaKH = 1;

  if (
    !queryDB(
      `INSERT INTO KhachHang (MaKH, Username, HoTen, Email, SDT, CCCD, GioiTinh) VALUES ('${MaKH}, ${username}', N'${name}', '${email}', '${phone}', '${cccd}, ${gender}')`
    )
  )
    return res.status(500).json({ message: "Internal server error" });

  return res.status(200).json({ message: "Registered successfully" });
});

router.post("/create-new-card", async function (req, res, next) {
  const { username, password } = req.user;
  const { LoaiThe } = req.query;
  // TODO: tao the thanh vien moi
  let MaThe = queryDB("SELECT * FROM THETHANHVIEN").recordset.length;
  if (!MaThe) MaThe = 1;
  
  if (!executeProcedure("CREATE_THE_THANH_VIEN", [MaThe, LoaiThe, username]))
    return res.status(500).json({ message: "Internal server error" });

  return res.status(200).json({ message: "Registered successfully" });

});
// router.post("/register-customer", isEmployee, function (req, res, next) {
//   const { username, password } = req.user;
//   const { NgayLap, LoaiThe, MaKH } = req.body;

//   let findEmp = queryDB(
//     `SELECT * FROM NHANVIEN WHERE Username = '${username}'`
//   );

//   if (!findEmp) {
//     return res.status(401).json({ message: "Unauthorized" });
//   } else {
//     findEmp = findEmp.recordset[0];
//   }

//   if (!name || !phone || !email || !address) {
//     return res.status(400).json({ message: "Missing required information" });
//   }

//   let query = `INSERT INTO TheThanhVien (MaThe, NgayLap, LoaiThe, MaNV, isActive, MaKH) VALUES ('${username}', '${password}', N'${name}', '${phone}', '${email}', N'${address}', 1)`;

//   poolPromise
//     .then((pool) => {
//       return pool.request().query(query);
//     })
//     .then((result) => {
//       console.log(result);
//       return res.status(200).json({ message: "Registered successfully" });
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.status(500).json({ message: "Internal server error" });
//     });
// });

// router.post("/create-order-dish", isEmployee, function (req, res, next) {});

// router.post("/create-bophan", function (req, res, next) {
//   const { MaBP, TenBoPhan, Luong } = req.query;

//   console.log(req.query);
//   let query = `INSERT INTO BoPhan (MaBP, TenBoPhan, Luong) VALUES ('${MaBP}', N'${TenBoPhan}', '${Luong}')`;
//   poolPromise
//     .then((pool) => {
//       return pool.request().query(query);
//     })
//     .then((result) => {
//       console.log(result);
//       return res.status(200).json({ message: "Registered successfully" });
//     })
//     .catch((err) => {
//       console.log(err);
//       return res.status(500).json({ message: "Internal server error" });
//     });
// });

module.exports = router;

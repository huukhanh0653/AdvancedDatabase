const { sql, poolPromise } = require("../model/dbConfig");

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
}

function isEmployee(req, res, next) {
  if (!req.isAuthenticated())
    return res.status(401).json({ message: "Unauthorized" });

  let pool = poolPromise;
  let NhanVien = pool
    .request()
    .input("username", req.user.Username)
    .query("SELECT * FROM NHANVIEN WHERE Username = @username");
  
  if (NhanVien.recordset.length > 0) {
    req.user = NhanVien.recordset[0];
    return next();}

  return res.status(401).json({ message: "Unauthorized" });
}

function isManager(req, res, next) {
  if (!req.isAuthenticated())
    return res.status(401).json({ message: "Unauthorized" });

  let pool = poolPromise;
  let QuanLy = pool
    .request()
    .input("username", req.user.Username)
    .query("SELECT * FROM NHANVIEN WHERE Username = @username AND MABOPHAN = 1 ");
  
  if (QuanLy.recordset.length > 0) {
    req.user = QuanLy.recordset[0];
    return next();}

  return res.status(401).json({ message: "Unauthorized" });
}

module.exports = { isAuthenticated, isEmployee, isManager };

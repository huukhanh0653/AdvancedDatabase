const { sql, poolPromise } = require("./dbConfig");
const {
  formatCurrency,
  formatAsSQLDate,
  formatAsSQLDatetime,
  formatAsVietnameseDate,
} = require("../middleware/utils");
const e = require("express");

async function queryDB(query) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(query);

    if (!result) {
      return null;
    }

    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function queryPaginating(tableName, orderBy, pageSize, pageNumber) {
  try {
    const pool = await poolPromise;
    const query = `SELECT * FROM ${tableName} 
                   ORDER BY ${orderBy} ASC
                   OFFSET ${pageSize * (pageNumber - 1)} ROWS
                   FETCH NEXT ${pageSize} ROWS ONLY`;
    const result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.error("Error executing paginated query:", err);
    return [];
  }
}

async function getTableInfo(MaCN) {
  try {
    // Get the amount of tables in the restaurant
    let tableAmount = await queryDB(
      `SELECT MABAN FROM BAN WHERE MaCN = ${MaCN}`
    );
    if (!tableAmount) {
      return [];
    }
    tableAmount = tableAmount.recordset;

    // Get the amount of tables that are currently occupied
    let query = `SELECT BAN.*, PHIEUDATMON.NgayLap, PHIEUDATMON.MaPhieu, 
                NHANVIEN.HOTEN
                FROM BAN
                JOIN HOADON ON BAN.MaHD = HOADON.MaHD
                JOIN PHIEUDATMON ON BAN.MaBan = PHIEUDATMON.MaBan
                JOIN NHANVIEN ON NHANVIEN.MaNV = PHIEUDATMON.MaNV
                WHERE BAN.MaCN = ${MaCN}
                ORDER BY BAN.MABAN ASC`;

    let table = await queryDB(query);
    if (!table) {
      return [];
    }

    // Get the amount of tables that have been paid
    query = `SELECT MAHD FROM DATBAN WHERE CHINHANH = ${MaCN}`;
    let datban = await queryDB(query);
    if (!datban) {
      return [];
    }

    let result = [];

    const tableMap = new Map(table.recordset.map((item) => [item.MaBan, item]));
    const datbanSet = new Set(datban.recordset.map((item) => item.MAHD));

    for (let i = 0; i < tableAmount.length; i++) {
      let item = {};
      item["tableID"] = tableAmount[i].MABAN;

      let temp = tableMap.get(item["tableID"]);

      if (temp) {
        item["billID"] = temp.MaHD;
        item["date"] = temp.NgayLap.toISOString().split("T")[0];
        item["time"] = temp.NgayLap.toISOString().split("T")[1].split(".")[0];
        item["createdBy"] = temp.HOTEN;
        item["isPending"] = true;
        item["isPaid"] = datbanSet.has(temp.MaHD);
      } else {
        item["billID"] = null;
        item["date"] = null;
        item["createdBy"] = null;
        item["isPending"] = false;
        item["isPaid"] = null;
      }
      result.push(item);
    }

    return result;
  } catch (err) {
    console.error("Error executing getTableInfo:", err);
    return [];
  }
}

async function getReservations(MaCN, Date) {
  let date = formatAsSQLDate(Date);
  try {
    let query = `SELECT * FROM DATBAN WHERE CHINHANH = ${MaCN} AND 
                CONVERT(DATE,NgayGioDat) = CONVERT(DATE,'${date}')`;
    let result = await queryDB(query);
    if (!result) {
      return [];
    }
    result = result.recordset;
    result.forEach((element) => {
      element["reservationID"] = element["MaDatBan"];
      delete element["MaDatBan"];
      element["fullName"] = element["HoTen"];
      delete element["HoTen"];
      element["phone_number"] = element["SDT"] ? element["SDT"] : null;
      delete element["SDT"];
      element["billID"] = element["MaHD"] ? element["MaHD"] : null;
      delete element["MaHD"];
      element["numberOfPeople"] = element["SoLuong"];
      delete element["SoLuong"];
      element["note"] = element["GhiChu"] ? element["GhiChu"] : null;
      delete element["GhiChu"];
    });
    return result;
  } catch (err) {
    console.error("Error executing getReservations:", err);
    return [];
  }
}

async function getTableDetail(MaBan) {
  try {
    let query = `SELECT BAN.MABAN, PHIEUDATMON.MaPhieu, 
                PHIEUDATMON.NgayLap, NHANVIEN.HOTEN, PHIEUDATMON.TongTien
                FROM BAN
                JOIN PHIEUDATMON ON BAN.MaHD = PHIEUDATMON.MaHD
                JOIN NHANVIEN ON NHANVIEN.MaNV = PHIEUDATMON.MaNV
                WHERE BAN.MaBan = ${MaBan}`;

    let PhieuDatMon = await queryDB(query);
    if (!PhieuDatMon) {
      return [];
    }
    PhieuDatMon = PhieuDatMon.recordset;
    let result = [];

    for (let i = 0; i < PhieuDatMon.length; i++) {
      let item = {};
      item["orderID"] = PhieuDatMon[i].MaPhieu;
      item["date"] = PhieuDatMon[i].NgayLap.toISOString().split("T")[0];
      item["time"] = PhieuDatMon[i].NgayLap.toISOString()
        .split("T")[1]
        .split(".")[0];
      query = `SELECT MONAN.TenMon, MONAN.GiaTien, CHONMON.SoLuong
              FROM CHONMON JOIN MONAN ON CHONMON.MaMon = MONAN.MaMon
              WHERE CHONMON.MaPhieu =  ${item["orderID"]}`;

      let MonAn = await queryDB(query);
      if (MonAn) {
        item["data"] = MonAn.recordset;
        item["data"].forEach((element) => {
          element["GiaTien"] = formatCurrency(element["GiaTien"].toFixed(0));
          element["price"] = element["GiaTien"];
          delete element["GiaTien"];

          element["quantity"] = element["SoLuong"];
          delete element["SoLuong"];

          element["dishName"] = element["TenMon"];
          delete element["TenMon"];
        });
      } else item["data"] = [];

      item["createdBy"] = PhieuDatMon[i].HOTEN;
      item["subTotal"] = formatCurrency(PhieuDatMon[i].TongTien);

      result.push(item);
    }

    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function getBillDetail(MaHD) {
  try {
    let query = `SELECT MAPHIEU FROM PHIEUDAT MON WHERE MAHD = ${MaHD}`;
    let PhieuDatMon = await queryDB(query);
    if (!PhieuDatMon) {
      return [];
    }
    PhieuDatMon = PhieuDatMon.recordset;
    let result = [];
  } catch (err) {
    console.log(err);
    return [];
  }
}

module.exports = {
  queryPaginating,
  getTableInfo,
  getTableDetail,
  queryDB,
  getReservations,
};

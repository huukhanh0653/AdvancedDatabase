const { sql, poolPromise } = require("./dbConfig");
const {
  formatCurrency,
  formatAsSQLDate,
  formatAsSQLDatetime,
  formatAsVietnameseDate,
} = require("../middleware/utils");
const e = require("express");
const { get } = require("../routes");

async function executeProcedure(procedureName, params) {
  try {
    const pool = await poolPromise;
    const request = pool.request();

    if (params) {
      params.forEach((param) => {
        request.input(param.name, param.type, param.value);
      });
    }

    const result = await request.execute(procedureName);
    return result.recordset ? result.recordset : result;
  } catch (err) {
    console.error("Error executing procedure:", err);
    return null;
  }
}

async function callFunction(functionName, params) {
  try {
    const pool = await poolPromise;
    const request = pool.request();

    if (params) {
      params.forEach((param) => {
        request.input(param.name, param.type, param.value);
      });
    }

    const result = await request.query(
      `SELECT dbo.${functionName}(${params
        .map((param) => param.name)
        .join(",")})`
    );
    return result.recordset ? result.recordset : result;
  } catch (err) {
    console.error("Error executing function:", err);
    return null;
  }
}

async function queryDB(query) {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(query);

    if (!result) {
      return null;
    }

    return result.recordset ? result.recordset : result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function queryPaginating(query, pageSize, pageNumber) {
  try {
    const result = await executeProcedure("SP_QUERY_PAGE", [
      { name: "Query", type: sql.NVarChar, value: query },
      { name: "PageSize", type: sql.Int, value: pageSize },
      { name: "Page", type: sql.Int, value: pageNumber },
    ]);

    console.log(result);

    if (!result) {
      return [];
    }

    return result.recordset ? result.recordset : result;
  } catch (err) {
    console.error("Error executing paginated query:", err);
    return [];
  }
}

async function getTableInfo(MaCN) {
  try {
    let result = await executeProcedure("ADMIN_GET_INFO", [
      { name: "MaCN", type: sql.Int, value: MaCN },
    ]);

    if (!result) {
      return [];
    }

    result = result.recordset;
    result.forEach((element) => {
      element["time"] = element["time"]
        ? element["time"].toISOString().split("T")[1].split(".")[0]
        : null;
    });

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
    let query = `SELECT PHIEUDATMON.*, NHANVIEN.HOTEN FROM PHIEUDATMON
                JOIN NHANVIEN ON NHANVIEN.MaNV = PHIEUDATMON.MaNV 
                WHERE MAHD = ${MaHD}`;
    let PhieuDatMon = await queryDB(query);
    if (!PhieuDatMon) {
      return [];
    }
    PhieuDatMon = PhieuDatMon.recordset;
    let result = [];

    for (let i = 0; i < PhieuDatMon.length; i++) {
      let item = {};
      item["orderID"] = PhieuDatMon[i].MaPhieu;
      item["createdBy"] = PhieuDatMon[i].HOTEN;
      item["date"] = PhieuDatMon[i].NgayLap.toISOString().split("T")[0];
      item["time"] = PhieuDatMon[i].NgayLap.toISOString()
        .split("T")[1]
        .split(".")[0];

      query = `SELECT MONAN.TenMon, MONAN.GiaTien, CHONMON.SoLuong
              FROM CHONMON JOIN MONAN ON CHONMON.MaMon = MONAN.MaMon
              WHERE CHONMON.MaPhieu = ${item["orderID"]}`;

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

      result.push(item);
    }

    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function getStatistic(MaCN, fromDate, toDate) {}

async function getCustomer(pageSize, pageNumber) {
  try {
    let query = `SELECT * FROM KHACHHANG`;

    const result = await queryPaginating(query, pageSize, pageNumber);

    if (!result) return [];

    result.forEach((element) => {
      element["username"] = element["Username"];
      delete element["Username"];
      element["customerID"] = element["MaKH"];
      delete element["MaKH"];
      element["fullName"] = element["HoTen"];
      delete element["HoTen"];
      element["phoneNumber"] = element["SDT"];
      delete element["SDT"];
      element["email"] = element["Email"];
      delete element["Email"];
      element["address"] = element["DiaChi"];
      delete element["DiaChi"];
      element["ssn"] = element["cccd"];
      delete element["cccd"];
      element["gender"] = element["GioiTinh"];
      delete element["GioiTinh"];
    });

    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getDishes(MACN, Category, pageSize, pageNumber) {
  try {
    let result = await executeProcedure("SP_GETDISHES", [
      { name: "MACN", type: sql.NVarChar, value: MACN },
      { name: "CATEGORY", type: sql.NVarChar, value: Category },
      { name: "PageSize", type: sql.Int, value: pageSize },
      { name: "Page", type: sql.Int, value: pageNumber },
    ]);

    if (!result) return [];

    result.forEach((element) => {
      element["dishID"] = element["MaMon"];
      delete element["MaMon"];
      element["dishName"] = element["TenMon"];
      delete element["TenMon"];
      element["price"] = formatCurrency(element["GiaTien"].toFixed(0));
      delete element["GiaTien"];
      element["image"] = element["HinhAnh"];
      delete element["HinhAnh"];
      element["delivable"] = element["GiaoHang"];
      delete element["GiaoHang"];
      element["category"] = element["PhanLoai"];
      delete element["PhanLoai"];
      element["avalability"] = element["isServed"];
      delete element["isServed"];

      element["avalability"] =
        element["avalability"] === 1 ? "Đang phục vụ" : "Ngừng phục vụ";

      element["delivable"] = element["delivable"] === 1 ? "Có" : "Không";
    });

    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getRegionalDishes(MAKV, Category, pageSize, pageNumber) {
  try {
    let query = `SELECT MONAN.* FROM THUCDON JOIN MONAN 
                ON THUCDON.MaMon = MONAN.MaMon 
                WHERE THUCDON.MaKV = '${MAKV}' AND PhanLoai LIKE '${Category}'`;
    let result = await queryPaginating(query, pageSize, pageNumber);

    if (!result) return [];

        result.forEach((element) => {
          element["dishID"] = element["MaMon"];
          delete element["MaMon"];
          element["dishName"] = element["TenMon"];
          delete element["TenMon"];
          element["price"] = formatCurrency(element["GiaTien"].toFixed(0));
          delete element["GiaTien"];
          element["image"] = element["HinhAnh"];
          delete element["HinhAnh"];
          element["delivable"] = element["GiaoHang"];
          delete element["GiaoHang"];
          element["category"] = element["PhanLoai"];
          delete element["PhanLoai"];

          element["delivable"] = element["delivable"] === 1 ? "Có" : "Không";
        });

    return result;

  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getMember(MaKH) {
  try {
    let query = `SELECT * FROM TheThanhVien WHERE MaKH = ${MaKH}`;

    let result = await queryDB(query);

    if (!result) return null;

    return result.recordset ? result.recordset : result;

  } catch (err) {
    console.log(err);
    return null;
  }
}
  

module.exports = {
  queryPaginating,
  getTableInfo,
  getTableDetail,
  getBillDetail,
  queryDB,
  getReservations,
  executeProcedure,
  callFunction,
  getCustomer,
  getStatistic,
  getDishes,
  getMember,
  getRegionalDishes,
};

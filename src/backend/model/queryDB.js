const { sql, poolPromise } = require("./dbConfig");
const {
  formatCurrency,
  formatAsSQLDate,
  formatAsSQLDatetime,
  formatAsVietnameseDate,
} = require("../middleware/utils");
const e = require("express");
const { get } = require("../routes");
const { pool } = require("mssql");

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
    let result = await executeProcedure("SP_ADMIN_GET_ALL_TABLE", [
      { name: "MACN", type: sql.Int, value: MaCN },
    ]);
    console.log(result);


    if (!result) {
      return [];
    };



    return result;
  } catch (err) {
    console.error("Error executing getTableInfo:", err);
    return [];
  }
}

async function getReservations(MaCN, Date) {
  let date = Date;
  let result = null;
  try {
    let query = `SELECT * FROM DATBAN WHERE ChiNhanh = ${MaCN} AND 
                CONVERT(DATE,NgayGioDat) = CONVERT(DATE,'${date}')`;

    result = await queryDB(query);

    if (result === null) {
      return [];
    }

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
        item["data"] = MonAn;
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
    let query = `SELECT PHIEUDATMON.*, NHANVIEN.HoTen FROM PHIEUDATMON
                JOIN NHANVIEN ON NHANVIEN.MaNV = PHIEUDATMON.MaNV 
                WHERE PHIEUDATMON.MaHD = ${MaHD}`;
    let PhieuDatMon = await queryDB(query);
    if (!PhieuDatMon) {
      return [];
    }
    let result = [];


    for (let i = 0; i < PhieuDatMon.length; i++) {
      let item = {};
      item["orderID"] = PhieuDatMon[i].MaPhieu;
      item["createdBy"] = PhieuDatMon[i].HoTen;
      item["date"] = PhieuDatMon[i].NgayLap.toISOString().split("T")[0];
      item["time"] = PhieuDatMon[i].NgayLap.toISOString()
        .split("T")[1]
        .split(".")[0];

      query = `SELECT MONAN.TenMon, MONAN.GiaTien, CHONMON.SoLuong
              FROM CHONMON JOIN MONAN ON CHONMON.MaMon = MONAN.MaMon
              WHERE CHONMON.MaPhieu = ${item["orderID"]}`;

      let MonAn = await queryDB(query);
      item["subTotal"] = 0;
      if (MonAn) {
        item["data"] = MonAn;
        item["data"].forEach((element) => {
          item["subTotal"] += element["GiaTien"].toFixed(0) * element["SoLuong"];

          element["GiaTien"] = formatCurrency(element["GiaTien"].toFixed(0));
          element["price"] = element["GiaTien"];
          delete element["GiaTien"];

          element["quantity"] = element["SoLuong"];
          delete element["SoLuong"];

          element["dishName"] = element["TenMon"];
          delete element["TenMon"];


        });
      } else item["data"] = [];
      item["subTotal"] = formatCurrency(item["subTotal"].toFixed(0));

      result.push(item);
    }


    return result;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function getStatistic(MaCN, fromDate, toDate) {
  //! Còn lỗi, đang chờ fix
  try {
    const pool = await poolPromise;
    const request = pool.request();

    let totalBills;
    let totalRevenue;
    let totalNewMember;

    request.input("MaCN", sql.Int, MaCN);
    request.input("StartDate", sql.Date, fromDate);
    request.input("EndDate", sql.Date, toDate);

    const result = await request.execute("sp_GetTotalRevenue");

    //! Lỗi không lấy được giá trị output từ stored procedure
    // totalRevenue = request.parameters.TotalRevenue.value;
    // totalNewMember = request.parameters.TotalNewMember.value;
    // totalBills = request.parameters.TotalBills.value;


    totalRevenue = await queryDB(
      `SELECT COUNT(MaHD) FROM hoadon WHERE (NgayLap BETWEEN ${fromDate} AND ${toDate}) AND HOADON.MaCN = ${MaCN}`
    );
    totalNewMember = await queryDB(`SELECT COUNT(MaThe) FROM thethanhvien
                    WHERE (NgayLap BETWEEN ${fromDate} AND ${toDate})
                    AND (THETHANHVIEN.MaKH NOT IN ( SELECT makh FROM THETHANHVIEN tv1 WHERE tv1.NgayLap BETWEEN '1970-01-01' AND DateAdd(Day, -1, ${fromDate})))
                    AND THETHANHVIEN.MaNV IN (SELECT MANV FROM DOICN WHERE DOICN.MaCN = ${MaCN} AND THETHANHVIEN.NgayLap 
                    BETWEEN NgayBatDau AND (CASE WHEN NgayKetThuc IS NULL THEN GETDATE() ELSE NgayKetThuc END))`);

    totalBills = await queryDB(
      `SELECT COUNT(MaHD)
      FROM hoadon
      WHERE (NgayLap BETWEEN ${fromDate} AND ${toDate}) AND HOADON.MaCN = ${MaCN}`
    );

    //! Ba biến này vẫn đang bị null
    console.log(totalRevenue, totalNewMember, totalBills);

    return {
      totalRevenue: totalRevenue
        ? formatCurrency(totalRevenue.toFixed(0))
        : "0",
      totalNewMember: totalNewMember || 0,
      totalBills: totalBills || 0,
      recentSales: result.recordset ? result.recordset : result,
    };
  } catch (err) {
    console.error("Error executing getStatistic:", err);
    return [];
  }
}

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
      element["deliverable"] = element["GiaoHang"];
      delete element["GiaoHang"];
      element["category"] = element["PhanLoai"];
      delete element["PhanLoai"];
      element["availability"] = element["isServed"];
      delete element["isServed"];


    });
    return result;
  } catch (err) {
    console.log(err);
    return null;
  }
}


async function getCompanyDishes(Category, pageSize, pageNumber) {
  try {
    let result = await queryPaginating(
      `SELECT MONAN.*, KV.MT, KV.MN, KV.MB
       FROM (SELECT MONAN1.MaMon,
            MAX(CASE WHEN THUCDON.MaKV = 'MB' THEN 1 ELSE 0 END) AS MB,
            MAX(CASE WHEN THUCDON.MaKV = 'MT' THEN 1 ELSE 0 END) AS MT, 
            MAX(CASE WHEN THUCDON.MaKV = 'MN' THEN 1 ELSE 0 END) AS MN
            FROM MONAN MONAN1 LEFT JOIN THUCDON ON MONAN1.MaMon = THUCDON.MaMon 
            WHERE MONAN1.PhanLoai = '${Category}'
			GROUP BY MONAN1.MaMon) AS KV
      JOIN MONAN ON KV.MaMon = MONAN.MaMon`,
      pageSize,
      pageNumber
    )

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
      element["deliverable"] = element["GiaoHang"];
      delete element["GiaoHang"];
      element["category"] = element["PhanLoai"];
      delete element["PhanLoai"];
      element["availability"] = element["isServed"];
      delete element["isServed"];


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
      element["deliverable"] = element["GiaoHang"];
      delete element["GiaoHang"];
      element["category"] = element["PhanLoai"];
      delete element["PhanLoai"];

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
  getCompanyDishes,
};

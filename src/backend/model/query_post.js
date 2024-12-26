const { sql, poolPromise } = require("./dbConfig");

async function createNewDish(dish) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("name", sql.NVarChar(255), dish.dishName)
      .input("category", sql.NVarChar(255), dish.category)
      .input("price", sql.Int, dish.price)
      .input("image", sql.NVarChar(200), dish.image)
      .execute("SP_CREATE_DISH");
    return result.recordset ? result.recordset : result;
  } catch (error) {
    console.error("Error creating new dish:", error);
    throw error;
  }
}

async function createNewCustomer(customer) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("HOTEN", sql.NVarChar(255), customer.fullName)
      .input("SDT", sql.NVarChar(255), customer.phoneNumber)
      .input("CCCD", sql.NVarChar(255), customer.ssn)
      .input("ISMALE", sql.Bit, customer.isMale)
      .input("EMAIL", sql.NVarChar(255), customer.email)
      .execute("SP_CREATE_CUSTOMER");
    return result.recordset ? result.recordset : result;
  } catch (error) {
    console.error("Error creating new customer:", error);
    throw error;
  }
}

async function createNewEmployee(employee) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("HOTEN", sql.NVarChar(255), employee.fullName)
      .input("NGAYSINH", sql.Date, employee.dob)
      .input("NGAYVAOLAM", sql.Date, employee.startDate)
      .input("CN_HIENTAI", sql.NVarChar(2), employee.curBranch)
      .input("MABP", sql.Int, employee.dept)
      .execute("SP_CREATE_EMPLOYEE");
    return result.recordset ? result.recordset : result;
  } catch (error) {
    console.error("Error creating new employee:", error);
    throw error;
  }
}

async function createNewStaffTransfer(staffTransfer) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("MANV", sql.Int, staffTransfer.id)
      .input("TO_CN", sql.NVarChar(2), staffTransfer.newBranch)
      .execute("SP_CREATE_STAFF_TRANSFER");
    return result.recordset ? result.recordset : result;
  } catch (error) {
    console.error("Error creating new staff transfer:", error);
    // throw error;
    return error;
  }
}

async function createNewMember(member) {
  try {
    if (!member.mathe || !member.manv || !member.makh) {
      throw new Error("Missing required member properties");
    }
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("MATHE", sql.Char(6), member.mathe)
      .input("MANV", sql.Int, member.manv)
      .input("MAKH", sql.Int, member.makh)
      .execute("SP_CREATE_MEMBER");
    return result.recordset ? result.recordset : result;
  } catch (error) {
    console.error("Error creating new member:", error);
    throw error;
  }
}

async function addDishToBranch(dishBranch) {
  try {
    console.log(dishBranch);
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("MAMON", sql.Int, dishBranch.DishID)
      .input("MACN", sql.NVarChar(2), dishBranch.CurBranch)
      .execute("SP_ADD_DISH_TO_BRANCH");
    return result.recordset ? result.recordset : result;
  } catch (error) {
    console.error("Error adding dish to branch:", error);
    throw error;
  }
}

async function createNewOrder(order) {
  try {
    const pool = await poolPromise;
    // const result = await pool
    //   .request()
    //   .input("MANV", sql.Int, order.createdBy)
    //   .input("MABAN", sql.Int, order.tableID)
    //   .input("ISEATIN", sql.Bit, order.isEatIn)
    //   .execute("SP_CREATE_ORDER");

    let MaHD = query("(SELECT ISNULL(MAX(MAHD), 0) + 1 FROM HOADON)");
    MaHD = MaHD.recordset[0][""];

    let query = `SET IDENTITY_INSERT HOADON ON; 
    INSERT INTO HOADON (MAHD, MANV, MABAN, ISEATIN) 
    VALUES (${MaHD}, ${order.createdBy}, ${order.tableID}, ${order.isEatIn}); 
    SET IDENTITY_INSERT HOADON OFF;`;

    return result;
  } catch (error) {
    console.error("Error creating new order:", error);
    throw error;
  }
}

async function createNewOrderDetail(orderDetail) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("MAPHIEU", sql.Int, orderDetail.mapheu)
      .input("MAMON", sql.Int, orderDetail.mamon)
      .input("SL", sql.Int, orderDetail.soluong)
      .execute("SP_CREATE_CHONMON");
    return result;
  } catch (error) {
    console.error("Error creating new order detail:", error);
    throw error;
  }
}

async function deleteOrder(MaPhieu) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("MAHD", sql.Int, MaPhieu)
      .execute("SP_DELETE_ORDER");
    return result;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
}

async function deleteCustomer(MaKH) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("MAKH", sql.Int, MaKH)
      .execute("SP_DELETE_CUSTOMER");
    return result;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw error;
  }
}

async function deleteDish(mamon) {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("MAMON", sql.Int, mamon)
      .execute("SP_DELETE_DISH");
    return result;
  } catch (error) {
    console.error("Error deleting dish:", error);
    throw error;
  }
}

module.exports = {
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
};

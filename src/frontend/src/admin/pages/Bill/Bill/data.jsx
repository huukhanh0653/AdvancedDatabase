export const bills = [
  {
    MaHD: "HD001",
    GiamGia: 5,
    TongHoaDon: 200000,
    MaThe: "MT001",
    NgayLap: "01-11-2024",
    isEatIn: true,
  },
  {
    MaHD: "HD002",
    GiamGia: 10,
    TongHoaDon: 500000,
    MaThe: "MT002",
    NgayLap: "02-11-2024",
    isEatIn: false,
  },
  {
    MaHD: "HD003",
    GiamGia: 0,
    TongHoaDon: 150000,
    MaThe: "MT003",
    NgayLap: "03-11-2024",
    isEatIn: true,
  },
  {
    MaHD: "HD004",
    GiamGia: 15,
    TongHoaDon: 1000000,
    MaThe: "MT004",
    NgayLap: "04-11-2024",
    isEatIn: false,
  },
  {
    MaHD: "HD005",
    GiamGia: 20,
    TongHoaDon: 250000,
    MaThe: "MT005",
    NgayLap: "05-11-2024",
    isEatIn: true,
  },
  {
    MaHD: "HD006",
    GiamGia: 10,
    TongHoaDon: 400000,
    MaThe: "MT006",
    NgayLap: "06-11-2024",
    isEatIn: false,
  },
  {
    MaHD: "HD007",
    GiamGia: 5,
    TongHoaDon: 300000,
    MaThe: "MT007",
    NgayLap: "07-11-2024",
    isEatIn: true,
  },
  {
    MaHD: "HD008",
    GiamGia: 0,
    TongHoaDon: 600000,
    MaThe: "MT008",
    NgayLap: "08-11-2024",
    isEatIn: false,
  },
  {
    MaHD: "HD009",
    GiamGia: 25,
    TongHoaDon: 1200000,
    MaThe: "MT009",
    NgayLap: "09-11-2024",
    isEatIn: true,
  },
  {
    MaHD: "HD010",
    GiamGia: 5,
    TongHoaDon: 100000,
    MaThe: "MT010",
    NgayLap: "10-11-2024",
    isEatIn: false,
  },
  {
    MaHD: "HD011",
    GiamGia: 15,
    TongHoaDon: 800000,
    MaThe: "MT011",
    NgayLap: "11-11-2024",
    isEatIn: true,
  },
  {
    MaHD: "HD012",
    GiamGia: 10,
    TongHoaDon: 700000,
    MaThe: "MT012",
    NgayLap: "12-11-2024",
    isEatIn: false,
  },
  {
    MaHD: "HD013",
    GiamGia: 20,
    TongHoaDon: 1500000,
    MaThe: "MT013",
    NgayLap: "13-11-2024",
    isEatIn: true,
  },
  {
    MaHD: "HD014",
    GiamGia: 0,
    TongHoaDon: 450000,
    MaThe: "MT014",
    NgayLap: "14-11-2024",
    isEatIn: false,
  },
  {
    MaHD: "HD015",
    GiamGia: 10,
    TongHoaDon: 900000,
    MaThe: "MT015",
    NgayLap: "15-11-2024",
    isEatIn: true,
  },
];


export const Orders = [
  {
    orderID: 1,
    date: "28/11/2024",
    time: "12:30 PM",
    data: [
      { SoLuong: 2, MonAn: "Burger", GiaTien: 20 },
      { SoLuong: 1, MonAn: "Fries", GiaTien: 5 }
    ],
    subTotal: 25,
    createdBy: "Alice",
    tableID: 101,
    isPending: false
  },
  {
    orderID: 2,
    date: "28/11/2024",
    time: "1:00 PM",
    data: [
      { SoLuong: 1, MonAn: "Pizza", GiaTien: 15 },
      { SoLuong: 3, MonAn: "Soda", GiaTien: 9 }
    ],
    subTotal: 24,
    createdBy: "Bob",
    tableID: 102,
    isPending: false
  },
  {
    orderID: 3,
    date: "28/11/2024",
    time: "2:15 PM",
    data: [
      { SoLuong: 1, MonAn: "Pasta", GiaTien: 12 },
      { SoLuong: 2, MonAn: "Garlic Bread", GiaTien: 8 }
    ],
    subTotal: 20,
    createdBy: "Charlie",
    tableID: 103,
    isPending: false
  },
  {
    orderID: 4,
    date: "28/11/2024",
    time: "3:45 PM",
    data: [
      { SoLuong: 1, MonAn: "Steak", GiaTien: 25 },
      { SoLuong: 1, MonAn: "Salad", GiaTien: 10 }
    ],
    subTotal: 35,
    createdBy: "Diana",
    tableID: 104,
    isPending: false
  },
  {
    orderID: 5,
    date: "28/11/2024",
    time: "5:00 PM",
    data: [
      { SoLuong: 2, MonAn: "Sandwich", GiaTien: 12 },
      { SoLuong: 1, MonAn: "Coffee", GiaTien: 3 }
    ],
    subTotal: 15,
    createdBy: "Eve",
    tableID: 105,
    isPending: false
  },
  {
    orderID: 6,
    date: "28/11/2024",
    time: "6:30 PM",
    data: [
      { SoLuong: 3, MonAn: "Chicken Wings", GiaTien: 21 },
      { SoLuong: 2, MonAn: "Beer", GiaTien: 10 }
    ],
    subTotal: 31,
    createdBy: "Frank",
    tableID: 106,
    isPending: false
  },
  {
    orderID: 7,
    date: "28/11/2024",
    time: "7:45 PM",
    data: [
      { SoLuong: 1, MonAn: "Soup", GiaTien: 7 },
      { SoLuong: 2, MonAn: "Breadsticks", GiaTien: 6 }
    ],
    subTotal: 13,
    createdBy: "Grace",
    tableID: 107,
    isPending: false
  },
  {
    orderID: 8,
    date: "28/11/2024",
    time: "8:15 PM",
    data: [
      { SoLuong: 1, MonAn: "Ramen", GiaTien: 14 },
      { SoLuong: 2, MonAn: "Tea", GiaTien: 4 },
      { SoLuong: 2, MonAn: "Tea", GiaTien: 4 },
      { SoLuong: 2, MonAn: "Tea", GiaTien: 4 },
      { SoLuong: 2, MonAn: "Tea", GiaTien: 4 },
      { SoLuong: 2, MonAn: "Tea", GiaTien: 4 },
      { SoLuong: 2, MonAn: "Tea", GiaTien: 4 },
      { SoLuong: 2, MonAn: "Tea", GiaTien: 4 }
    ],
    subTotal: 18,
    createdBy: "Henry",
    tableID: 108,
    isPending: false
  }
];

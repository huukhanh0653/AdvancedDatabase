

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
      isPending: true
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
      isPending: true
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
      isPending: true
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


// TH1: bill ID null, isPending true => da dat truoc va thanh toan
// TH2: bill ID null, isPending false => ban trong
// TH3: bill ID not null, isPending true => tao hoa don tai quan va chua thanh toan

export const tableInfo = [
    {
      tableID: 1,
      billID: 101,
      date: "28/11/24",
      time: "10:30 AM",
      createdBy: "Alice",
      isPending: true,
      isPaid: false
    },
    {
      tableID: 2,
      billID: 102,
      date: "28/11/24",
      time: "11:45 AM",
      createdBy: "Bob",
      isPending: true,
      isPaid: false
    },
    {
      tableID: 3, 
      date: null,
      time: null,
      createdBy: null,
      billID: null,
      isPending: false,
      isPaid: false
    },
    {
      tableID: 4,
      billID: 104,
      date: "28/11/24",
      time: "1:00 PM",
      createdBy: "Diana",
      isPending: true,
      isPaid: false
    },
    {
      tableID: 5,
      date: "28/11/24",
      time: "2:30 PM",
      createdBy: "Eve",
      billID: 105,
      isPending: true,
      isPaid: true
    },
    {
      tableID: 6,   
      date: null,
      time: null,
      createdBy: null,
      billID: null,
      isPending: false, 
      isPaid: false
    },
    {
      tableID: 7,  
      billID: 107,
      date: "28/11/24",
      time: "4:15 PM",
      createdBy: "Grace",
      isPending: true,
      isPaid: false
    },
    {
      tableID: 8,  
      billID: 108,
      date: "28/11/24",
      time: "5:00 PM",
      createdBy: "Henry",
      isPending: true, 
      isPaid: false
    }
  ];
  
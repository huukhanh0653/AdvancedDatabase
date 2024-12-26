import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Pencil } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PopupModal } from "@/components/ui/modal"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { formattedDate } from "@/lib/utils"
import { sub } from "date-fns"



function fetchBillSummary() {
  const data = 
    {
      tableID: 1,
      employeeName: "Nguyễn Văn A",
      orderItems : Array(9).fill(null).map((_, i) => ({
        title: "Roasted Chicken",
        price: 55.00,
        quantity: 1,
      }))
    }

  return data
}


function convertToBillSummary(data) {
  const billSummary = [];
  let total = 0;
  data.forEach((order) => {
    order.data.forEach((dish) => {
      // Check if the dish already exists in the billSummary
      const existingDish = billSummary.find((item) => item.title === dish.dishName);
      
      if (existingDish) {
        // If it exists, update the quantity
        existingDish.quantity += dish.quantity;
      } else {
        // Otherwise, add a new entry
        billSummary.push({
          title: dish.dishName,
          price: dish.price,
          quantity: dish.quantity,
        });
      }
    });
  });

  return billSummary;
}

function calcSubtotal(data) {
  let subtotal = 0;
  data.forEach((dish) => {
    // convert vietnamsese currency string to int 
    const price = parseInt(dish.price.replace(/[^0-9]/g, ''));
    subtotal += price * parseInt(dish.quantity);
  });
  return subtotal;
}

      


export function TableCard({ tableID, billID, date, isPending}) {
  const navigate = useNavigate()
  const [payOpen, setPayOpen] = useState(false);
  const [openTable, setOpenTable] = useState(false);
  

  return (
    <Card className="w-[390px] bg-zinc-900 text-zinc-100">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-300 text-rose-900">
            {tableID}
          </div>
          <div className="space-y-0">
            <h3 className="font-medium text-lg pt-0">#{billID}</h3>
          </div>
          <Badge variant="secondary" className={`ml-auto ${
              !isPending 
                ? !billID ? 
                  "bg-emerald-500/10 text-emerald-500"
                  : "bg-yellow-500/10 text-yellow-500" 
                : "bg-rose-500/10 text-rose-500"
            }`}>
            {!isPending ?
                !billID ? "Đã thanh toán" : "Chưa thanh toán"
              : "Bàn trống"
            }
          </Badge>
        </div>
        <div className="text-sm text-zinc-400">
          { date ? formattedDate(date) : "" }
        </div>
      </CardHeader>
      <CardFooter className="flex gap-2 pt-4 justify-between">
        {!isPending && !billID && <Button onClick={() => navigate(`/table/${tableID}`)} variant="outline" size="icon" className="h-10 w-10 rounded-lg border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100">
          <Pencil className="h-4 w-4 " />
        </Button>}
        {!isPending && billID && <Button onClick={() => navigate(`/table/${tableID}/order`)} variant="outline" size="icon" className="h-10 w-10 rounded-lg border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100">
          <Pencil className="h-4 w-4 " />
        </Button>}
        {!isPending && billID && <PopupModal open={payOpen} setOpen={setPayOpen} formComponent={BillSummary} props={{title: "", description: ""}} className="bg-zinc-900 border-transparent"  billID= {billID} tableID= {tableID}>
          <Button className="ml-auto flex-1 rounded-lg bg-rose-200 text-rose-900 hover:bg-rose-300">
            Thanh toán
          </Button>
        </PopupModal>}
        {!isPending && !billID && 
          <Button className="ml-auto flex-1 rounded-lg bg-rose-200 text-rose-900 hover:bg-rose-300">
            Đã thanh toán
          </Button>
        }
        {isPending && <PopupModal open= {openTable} setOpen = {setOpenTable} formComponent={TableOpen} props={{title: "Trạng thái bàn", description: ""}} tableID = {tableID}>
            <Button 
              className="ml-auto flex-1 rounded-lg bg-rose-200 text-rose-900 hover:bg-rose-300"
              onClick={() => setOpenTable(true)}
            >
              Mở bàn
            </Button>
          </PopupModal>}
      </CardFooter>
    </Card>
  )
}


function TableOpen({ setOpen, tableID }) {
  const navigate = useNavigate()
  const [hasReservation , setHasReservation] = useState(false);
  const [tableInfoOpen, setTableInfoOpen] = useState(false);
  const openTableForPreorder = async () => {
    const response = await fetch(`http://localhost:5000/admin/open_table_for_preorder?TableID=${tableID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      console.log("Mở bàn thành công");
    }
    else {
      alert("Mở bàn không thành công")
    }
  }

  return (
    <div className = "flex items-center justify-center gap-3">
        <Button 
          onClick={openTableForPreorder}
          className="ml-auto flex-1 rounded-lg bg-rose-200 text-rose-900 hover:bg-rose-300"
        >
          Đã đặt trước
        </Button>
      <Button 
        onClick={() => 
          {
            setHasReservation(false)
            setOpen(false)
            navigate(`/table/${tableID}/order`)
          }
        } 
        className="ml-auto flex-1 rounded-lg bg-rose-200 text-rose-900 hover:bg-rose-300">
        Chưa đặt trước
      </Button>
    </div>
  )
}

function getTableInfo({tableID}) {
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submit")
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input id="tableID" label="Mã hóa đơn" placeholder="Mã hóa đơn..." />
      <Button type="submit" className="w-full bg-pink-300 text-zinc-900 hover:bg-pink-400">
        Xác nhận
      </Button>
    </form>
  )
}



function BillSummary({ setOpen, billID, tableID }) {
  function handleClose() {
    setOpen(false)
  }
  const [data, setData] = useState([]);
  // const [billInfo, setBillInfo] = useState({subtotal: 0, tax: 0, discount: 0, total: 0});
  const [member, setMember] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);
  

  // const handlePay = async () => {
  //   const response = await fetch(`http://localhost:5000/admin/pay_bill?BillID=${billID}&Member=${member}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   if (response.ok) {
  //     console.log("Thanh toán thành công");
  //   }
  //   else {
  //     alert("Thanh toán không thành công")
  //   }
  // }

  const fetchData = async () => {
    const api = `http://localhost:5000/admin/bill-detail?billID=${billID}`;

    try {
      const response = await fetch(api, {
        method: "GET", 
        headers: {
          "Content-Type": "application/json"
      }});

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const billDetail = await response.json();
      const billSummary = convertToBillSummary(billDetail);
      const subTotalDish = calcSubtotal(billSummary);
      setSubtotal(subTotalDish);
      setTax(subTotalDish * 0.1);
      setDiscount(subTotalDish * 0.05);
      setTotal(subTotalDish - discount + tax);
      setData(billSummary);
      console.log(billSummary);
    } catch (error) {
      console.error(error);
    }
  };
  


  useEffect(() => {
    fetchData();
    // calculateBill();
    }, []);

  return (
    <Card className="bg-zinc-900 flex flex-col h-[600px] border-transparent">
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <h2 className="text-white text-lg font-medium">Bàn {tableID}</h2>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex justify-between text-sm">
            <div className="flex gap-3">
            <div className="text-pink-300">SL</div>
            <div className="text-white">Món ăn</div>
            </div>
            <div className="text-white">Đơn giá</div>
        </div>
      </div>
      <ScrollArea
        className="flex-1 p-4 "
        style={{ height: '100px', overflowY: 'auto', display: 'block' }}
      >
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <div className="flex gap-2">
                <div className="text-pink-300">{item.quantity} ×</div>
                <div className="text-white">{item.title}</div>
              </div>
              <div className="text-white">{item.price}</div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-zinc-800">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Tổng tiền món ăn (VNĐ)</span>
            <span className="text-white">{subtotal}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Giảm giá</span>
            <span className="text-white">{discount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Thuế VAT</span>
            <span className="text-white">{tax}</span>
          </div>
          <div className="flex justify-between text-sm font-medium">
            <span className="text-zinc-400">Tổng cộng (VNĐ)</span>
            <span className="text-white">{total}</span>
          </div>
        </div>
        <Input 
          className="mt-2 mb-4"
          id="tableID" 
          label="Mã thành viên" 
          placeholder="Mã thành viên..." 
          onChange= {(e) => setMember(e.target.value)}/>
        <div className="space-y-2">
          <Button className="w-full bg-pink-300 text-zinc-900 hover:bg-pink-400">
            Thanh toán
          </Button>
          <Button onClick={handleClose} className="w-full bg-zinc-600 text-zinc-900 hover:bg-zinc-300">
            Hủy
          </Button>
        </div>
      </div>
    </Card>
  )
}



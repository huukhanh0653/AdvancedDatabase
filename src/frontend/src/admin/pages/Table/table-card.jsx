import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
import { Pencil } from 'lucide-react'
import { useNavigate } from "react-router-dom"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PopupModal } from "@/components/ui/modal"
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"



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


export function TableCard({ tableID, billID, date, time, createdBy, isPending, isPaid }) {
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
            <h3 className="font-medium text-lg pt-0">{createdBy}</h3>
            <p className="text-sm text-zinc-400">#{billID}</p>
          </div>
          <Badge variant="secondary" className={`ml-auto ${
              isPending 
                ? isPaid ? 
                  "bg-emerald-500/10 text-emerald-500"
                  : "bg-yellow-500/10 text-yellow-500" 
                : "bg-rose-500/10 text-rose-500"
            }`}>
            {isPending ?
                isPaid ? "Đã thanh toán" : "Chưa thanh toán"
              : "Bàn trống"
            }
          </Badge>
        </div>
        <div className="text-sm text-zinc-400">
          { date }
          <span className="float-right">{time}</span>
        </div>
      </CardHeader>
      <CardFooter className="flex gap-2 pt-4 justify-between">
        {isPending && !isPaid && <Button onClick={() => navigate(`/table/${tableID}`)} variant="outline" size="icon" className="h-10 w-10 rounded-lg border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100">
          <Pencil className="h-4 w-4 " />
        </Button>}
        {isPending && isPaid && <Button onClick={() => navigate(`/table/${tableID}/order`)} variant="outline" size="icon" className="h-10 w-10 rounded-lg border-zinc-800 bg-transparent text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100">
          <Pencil className="h-4 w-4 " />
        </Button>}
        {isPending && !isPaid && <PopupModal open={payOpen} setOpen={setPayOpen} formComponent={BillSummary} props={{title: "", description: ""}} className="bg-zinc-900 border-transparent" isPaid = {isPaid} billID= {billID}>
          <Button className="ml-auto flex-1 rounded-lg bg-rose-200 text-rose-900 hover:bg-rose-300">
            Thanh toán
          </Button>
        </PopupModal>}
        {isPending && isPaid && <PopupModal open={payOpen} setOpen={setPayOpen} formComponent={BillSummary} props={{title: "", description: ""}} className="bg-zinc-900 border-transparent" isPaid = {isPaid} billID= {billID}>
          <Button className="ml-auto flex-1 rounded-lg bg-rose-200 text-rose-900 hover:bg-rose-300">
            Đã thanh toán
          </Button>
        </PopupModal>}
        {!isPending && <PopupModal open= {openTable} setOpen = {setOpenTable} formComponent={TableOpen} props={{title: "Trạng thái bàn", description: ""}} tableID = {tableID}>
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


  return (
    <div className = "flex items-center justify-center gap-3">
      <PopupModal open= {tableInfoOpen} setOpen={setTableInfoOpen} formComponent={getTableInfo} props={{title: "Nhập mã hóa đơn", description: "Nhập mã hóa đơn của khách hàng đã thanh toán trước"}} tableID= {tableID}>
        <Button 
          onClick={() => {
            setHasReservation(true)
            setTableInfoOpen(true)
          }}
          className="ml-auto flex-1 rounded-lg bg-rose-200 text-rose-900 hover:bg-rose-300"
        >
          Đã đặt trước
        </Button>
      </PopupModal>
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



function BillSummary({ setOpen, isPaid, billID }) {
  function handleClose() {
    setOpen(false)
  }
  const [data, setData] = useState(fetchBillSummary());
  const subtotal = data.orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const tax = subtotal * 0.05
  const discount = 10
  const total = subtotal + tax * (discount/ 100)

  useEffect(() => {
    setData(fetchBillSummary());
    }, []);

  return (
    <Card className="bg-zinc-900 flex flex-col h-[600px] border-transparent">
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <h2 className="text-white text-lg font-medium">Bàn {data.tableID}</h2>
          <p className="text-zinc-400 text-sm">NV: {data.employeeName}</p>
        </div>
      </div>
      <ScrollArea
        className="flex-1 p-4 "
        style={{ height: '100px', overflowY: 'auto', display: 'block' }}
      >
        <div className="space-y-4">
          {data.orderItems.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <div className="flex gap-2">
                <div className="text-pink-300">{item.quantity} ×</div>
                <div className="text-white">{item.title}</div>
              </div>
              <div className="text-white">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-zinc-800">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Tổng tiền món ăn (VNĐ)</span>
            <span className="text-white">{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Giảm giá (%)</span>
            <span className="text-white">{discount.toFixed(2)} %</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Thuế VAT (%)</span>
            <span className="text-white">{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm font-medium">
            <span className="text-zinc-400">Tổng cộng (VNĐ)</span>
            <span className="text-white">{total.toFixed(2)}</span>
          </div>
        </div>
        {!isPaid && <div className="space-y-4">
          <Button className="w-full bg-pink-300 text-zinc-900 hover:bg-pink-400">
            Thanh toán
          </Button>
          <Button onClick={handleClose} className="w-full bg-zinc-600 text-zinc-900 hover:bg-zinc-300">
            Hủy
          </Button>
        </div>}
      </div>
    </Card>
  )
}



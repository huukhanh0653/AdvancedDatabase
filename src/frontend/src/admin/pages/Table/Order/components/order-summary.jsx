'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useOrder } from '../context/OrderContext'
import { Separator } from "@/components/ui/separator"



export function OrderSummary({ tableNumber, employeeName, onCancel }) {
  const { orderItems } = useOrder()
  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <Card className="bg-zinc-900 h-full flex flex-col border-transparent p-2">
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <h2 className="text-white text-lg font-medium">Bàn {tableNumber < 10 ? `0${tableNumber}` : tableNumber}</h2>
          <p className="text-zinc-400 text-sm">{employeeName}</p>
        </div>
        <p className="text-zinc-400 text-sm">{new Date().toLocaleDateString()}</p>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex justify-between text-sm">
            <div className="flex gap-3">
            <div className="text-pink-300">SL</div>
            <div className="text-white">Món ăn</div>
            </div>
            <div className="text-white">Giá tiền (VNĐ)</div>
        </div>
      </div>
      <Separator className="bg-zinc-600 w-11/12 items-center mx-auto"/>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {orderItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <div className="flex gap-3">
                <div className="text-pink-300">{item.quantity}</div>
                <div className="text-white">{item.title}</div>
              </div>
              <div className="text-white">{(item.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t border-zinc-800">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Tổng cộng (VNĐ): </span>
            <span className="text-white">{subtotal.toFixed(2)}</span>
          </div>
        </div>
        <div className="space-y-4 mt-7">
          <Button onClick={onCancel} className="w-full bg-zinc-600 text-zinc-900 hover:bg-white">
            Hủy bỏ
          </Button>
          <Button className="w-full bg-pink-300 text-zinc-900 hover:bg-pink-400">
            Đặt món
          </Button>
        </div>
      </div>
    </Card>
  )
}


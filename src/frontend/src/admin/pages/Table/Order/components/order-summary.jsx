'use client'

import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useOrder } from '../context/OrderContext'
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"

function calcSubtotal(orderItems) {
  let subtotal = 0
  orderItems.forEach(element => {
    const price = parseInt(element.price.replace(/[^0-9]/g, ''))
    const quantity = parseInt(element.quantity)
    subtotal += price * quantity
  });
  return subtotal
}

export function OrderSummary({ tableNumber, onCancel }) {
  const { orderItems } = useOrder()
  const subtotal = calcSubtotal(orderItems)
  const [employee, setEmployee] = useState('')
  const [note, setNote] = useState('')

  // const handleOrder = async () => {
  //   try {
  //     const response = await fetch('http://localhost:5000/admin/order', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         tableNumber,
  //         employee,
  //         note,
  //         orderItems
  //       })
  //     })
  //     if (response.ok) {
  //       console.log('Order placed successfully')
  //     } else {
  //       console.error('Failed to place order')
  //     }
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  return (
    <Card className="bg-zinc-900 h-full flex flex-col border-transparent p-2">
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <div>
          <h2 className="text-white text-lg font-medium">Bàn {tableNumber < 10 ? `0${tableNumber}` : tableNumber}</h2>
          <Input 
            className="text-zinc-400" 
            placeholder="Nhập mã nhân viên" 
            onChange= {(e) => setEmployee(e.target.value)} />
        </div>
        <p className="text-zinc-400 text-sm">{new Date().toLocaleDateString()}</p>
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
      <Separator className="bg-zinc-600 w-11/12 items-center mx-auto"/>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {orderItems.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <div className="flex gap-3">
                <div className="text-pink-300">{item.quantity}</div>
                <div className="text-white">{item.dishName}</div>
              </div>
              <div className="text-white">{item.price}</div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="flex items-center p-2"><Textarea className="p-4 text-white border-zinc-600" placeholder="Ghi chú..." onChange={(e) => setNote(e.target.value)}/></div>
      <div className="p-4 border-t border-zinc-800">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-400">Tổng cộng (VNĐ): </span>
            <span className="text-white">{subtotal.toFixed(0)}</span>
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


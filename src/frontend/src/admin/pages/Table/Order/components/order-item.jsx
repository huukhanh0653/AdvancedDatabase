'use client'

import { Minus, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useOrder } from '../context/OrderContext'

export function OrderItem({ id, title, price }) {
  const { addItem, removeItem, orderItems } = useOrder()
  const item = orderItems.find((item) => item.id === id)
  const quantity = item ? item.quantity : 0

  return (
    <Card className="bg-zinc-900 p-4 border-transparent">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-white font-medium">{title}</div>
          <div className="text-zinc-400">VNĐ {price.toFixed(2)}</div>
        </div>
        <div className="flex items-center gap-2">
            <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-zinc-700 border-zinc-700 rounded-full"
            onClick={() => removeItem(id)}
            >
            <Minus className="h-4 w-4" />
            </Button>
            <span className="text-white min-w-[20px] text-center">{quantity}</span>
            <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 bg-zinc-700 border-zinc-700 rounded-full hover:bg-rose-300"
            onClick={() => addItem({ id, title, price, quantity: 1 })}
            >
            <Plus className="h-4 w-4" />
            </Button>
        </div>
      </div>
    </Card>
  )
}


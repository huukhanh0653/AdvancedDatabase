"use client"

import { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ReservationCard({reservationID, reservationDate, reservationTime, paxNumber, fullName, phoneNumber, note = "Không có"}) {
  return (
    <Card className="w-[300px] bg-zinc-900 text-zinc-100">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-rose-200 text-rose-900">
            {paxNumber}
          </div>
          <div className="space-y-1">
            <h3 className="font-medium">{fullName}</h3>
            <p className="text-sm text-zinc-400">{phoneNumber}</p>
          </div>
          <Badge 
            variant="secondary" 
            className="ml-auto bg-emerald-500/10 text-emerald-500"
          >
            #{reservationID}
          </Badge>
        </div>
        <div className="text-sm text-zinc-400">
          {reservationDate}
          <span className="float-right">{reservationTime}</span>
        </div>
      </CardHeader>
      <CardContent className="border-y border-zinc-800 p-0">
        <div className="space-y-2 px-6 pt-4">
          <Label htmlFor="note" className="text-sm font-medium text-zinc-400">
            Ghi chú
          </Label>
          <ScrollArea className="h-[100px]">
            <Textarea
              id="note"
              value={note}
              onChange = {() => none}
              className="min-h-[280px] resize-none border-0 bg-transparent p-0 text-sm text-zinc-100 focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="Add your notes here..."
            />
          </ScrollArea>
        </div>
      </CardContent>
      <CardFooter className="flex items-center pt-4">
        <Button onClick= {() => onCreateBill(reservationID)} className="ml-auto flex-1 rounded-lg bg-rose-200 text-rose-900 hover:bg-rose-300">
            Tạo hóa đơn
        </Button>
      </CardFooter>
    </Card>
  )
}

function onCreateBill(reservationID) {
    console.log("Create bill with reservation ID: ", reservationID)
}





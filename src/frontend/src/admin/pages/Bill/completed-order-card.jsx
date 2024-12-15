import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function CompletedOrderCard({data , orderID, date, time, subTotal, createdBy}) {
  return (
    <Card className="w-[390px] bg-zinc-900 text-zinc-100">
      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-start gap-3">
          <div className="space-y-0">
            <h3 className="font-medium text-lg">{createdBy}</h3>
            <p className="text-sm text-rose-300">#{orderID}</p>
          </div>
          <Badge variant="secondary" className="ml-auto bg-emerald-500/10 text-emerald-500">
            Đã xong
          </Badge>
        </div>
        <div className="text-sm text-zinc-400">
          { date }
          <span className="float-right">{time}</span>
        </div>
      </CardHeader>
      <CardContent className="border-y border-zinc-800 p-0">
        <div className="px-6 py-2">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 text-sm">
            <div className="font-medium">SL</div>
            <div className="font-medium">Món ăn</div>
            <div className="font-medium">Giá tiền (VNĐ)</div>
          </div>
        </div>
        <ScrollArea className="h-[200px] px-6">
          <div className="space-y-3 py-2">
            {data.map((row, i) => (
              <div key={i} className="grid grid-cols-[auto_2.5fr_auto] items-center gap-5 text-sm">
                <div className="text-zinc-400">{row.SoLuong}</div>
                <div>        {row.MonAn}</div>
                <div>{row.GiaTien * 10000}</div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex items-center justify-between border-t border-zinc-800 px-6 py-4 text-sm font-medium">
          <div>Tổng cộng</div>
          <div>{subTotal}</div>
        </div>
      </CardContent>
    </Card>
  )
}


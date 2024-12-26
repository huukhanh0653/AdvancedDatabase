import React, { useEffect, useState, useMemo } from "react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { use } from "react"
  function fetchDishSales() {
    return [
        {
          "name": "AKAGAI SASHIMI",
          "category": "Sashimi",
          "image": "https://sushiworld.com.vn/wp-content/uploads/2022/06/akagai-1-300x300.jpg",
          "totalsales": 179000
        },
        {
          "name": "AKAGAI SUSHI",
          "category": "Sushi",
          "image": "https://sushiworld.com.vn/wp-content/uploads/2022/09/Artboard-19-copy-81@4x-100-300x300.jpg",
          "totalsales": 89000
        },
        {
          "name": "AYU SHIO YAKI",
          "category": "Yakimono",
          "image": "https://sushiworld.com.vn/wp-content/uploads/2022/11/Capture-28-300x300.png",
          "totalsales": 129000
        },
        {
          "name": "BEEF SALAD",
          "category": "Salad",
          "image": "https://sushiworld.com.vn/wp-content/uploads/2023/06/salad-bo-300x300.png",
          "totalsales": 149000
        },
        {
          "name": "BEEF STEAK SET",
          "category": "Set lunch",
          "image": "https://sushiworld.com.vn/wp-content/uploads/2022/11/Capture-52-300x300.png",
          "totalsales": 209000
        },
        {
          "name": "BURI KAMA SHIO YAKI",
          "category": "Yakimono",
          "image": "https://sushiworld.com.vn/wp-content/uploads/2022/11/Capture-25-300x300.png",
          "totalsales": 269000
        },
        {
          "name": "CALIFORNIA MAKI",
          "category": "Maki",
          "image": "https://sushiworld.com.vn/wp-content/uploads/2022/09/Capture-6-300x300.png",
          "totalsales": 119000
        },
        {
          "name": "CHIRASHI DON SET",
          "category": "Set lunch",
          "image": "https://sushiworld.com.vn/wp-content/uploads/2022/11/Capture-40-300x300.png",
          "totalsales": 169000
        },
        {
          "name": "CHUBUNE SASHIMI",
          "category": "Sashimi",
          "image": "https://sushiworld.com.vn/wp-content/uploads/2022/06/Artboard-19-copy-50@4x-100-300x300.jpg",
          "totalsales": 1000
        },
        {
          "name": "CHUSUSHI MORIAWASE",
          "category": "Sushi",
          "image": "https://sushiworld.com.vn/wp-content/uploads/2022/09/kosushi-300x300.png",
          "totalsales": 1000
        },
        {
          "name": "CHUTORO SASHIMI",
          "category": "Sashimi",
          "image": "https://sushiworld.com.vn/wp-content/uploads/2022/06/Artboard-19-copy-43@4x-100-300x300.jpg",
          "totalsales": 819000
        },
        {
          "name": "COMBO SASHIMI & SUSHI",
          "category": "Sushi",
          "image": "https://sushiworld.com.vn/wp-content/uploads/2022/09/a-300x300.png",
          "totalsales": 549000
        },
        {
          "name": "DELUXE A",
          "category": "Sushi",
          "image": "https://sushiworld.com.vn/wp-content/uploads/2022/09/dea-300x300.png",
          "totalsales": 659000
        }
      ]
  }      

  
  export function RecentSales({data, searchQuery}) {
    const [dishes, setDishes] = useState([])

    const filteredData = useMemo(() => {
        if (!searchQuery) {
            return data
        }
        return data.filter((dish) => dish.TenMon.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [data, searchQuery])

    useEffect(() => {
        setDishes(data ? data : [])
    }, [data])






    return (
      <div className="space-y-8">
            {filteredData.slice(0,5).map((dish, i) => (
                <React.Fragment key = {i}>
                    <div className="flex items-center">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={dish.HinhAnh} alt="Avatar" />
                            <AvatarFallback>OM</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{dish.TenMon}</p>
                        </div>
                        <div className="ml-20 space-y-1">
                            <p className="text-sm font-medium leading-none">{dish.SoLuong}</p>
                        </div>
                        <div className="ml-auto font-medium">{dish.DoanhThu.toLocaleString("vi-VN", {style: "currency", currency: "VND"})}</div>
                    </div>
                </React.Fragment>
            ))}
      </div>
    )
  }
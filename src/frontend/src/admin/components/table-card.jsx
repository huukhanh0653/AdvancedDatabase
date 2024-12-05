import React from "react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";

export function TableCard({ tableNumber, reservationCount, isSelected, onClick }) {
    return (
        <Card
        onClick={onClick}
        className={`w-[140px] h-[140px] flex flex-col items-center justify-center text-center shadow-md border-transparent
        ${
          isSelected
            ? "bg-rose-300 text-black cursor-pointer"
            : "bg-[#1C1C1C] text-rose-300 hover:bg-rose-300 hover:text-black cursor-pointer"
        }`}
      >
        <CardContent className="p-0">
          {/* Category Title */}
          <CardTitle className="text-lg font-semibold group-hover:text-black">
          Bàn {tableNumber < 10 ? `0${tableNumber}` : tableNumber}
          </CardTitle>
          {/* Item Count */}
          <CardDescription className="text-white text-sm group-hover:text-black">
            {reservationCount} lượt đặt bàn
          </CardDescription>
        </CardContent>
      </Card>
    );
  }
import { Input } from "@/components/ui/input"

export function Search({}) {
  return (
    <div>
      <Input
        type="search"
        placeholder="Tìm kiếm theo tên món ăn..."
        className="md:w-[100px] lg:w-[300px]"
        on
      />
    </div>
  )
}
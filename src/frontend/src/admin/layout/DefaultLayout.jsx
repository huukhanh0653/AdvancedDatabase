import { 
  HandPlatter,
  ConciergeBell,
  Receipt,
  ChartColumnIncreasing,
  CircleUserRound,
  Utensils,
  UtensilsCrossed,
  Contact,
  LifeBuoy,
  Send,

 } from "lucide-react"
import { AppSidebar } from "@/src/admin/components/sidebar"


const data = {
  user: {
    name: "shadcn",
    role: "Admin",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  branch: {
    name: "SuShiX",
    address: "Chi nhánh 1",
    url: "#",
  }
  ,
  navProfession: [
    {
      title: "Quản lí đặt món",
      url: "/table",
      icon: HandPlatter,
      isActive: true,
    },
    {
      title: "Quản lí đặt bàn",
      url: "/reservation",
      icon: ConciergeBell,
    },
    {
      title: "Quản lí hóa đơn",
      url: "/bill",
      icon: Receipt,
      isActive: false,
    },
  ],
  navManagement: [
    {
      title: "Thống kê",
      url: "/dashboard",
      icon: ChartColumnIncreasing,
    },
    {
      title: "Thông tin khách hàng",
      url: "/customer",
      icon: CircleUserRound,
    },
    {
      title: "Thực đơn",
      url: "/menu",
      icon: Utensils,
    },
    {
      title: "Thực đơn khu vực",
      url: "/regional-menu",
      icon: UtensilsCrossed,
    },
    {
      title: "Danh sách nhân viên",
      url: "/employee",
      icon: Contact,
    },
  ],
  navSecondary: [
    {
      title: "Hướng dẫn sử dụng",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Báo cáo lỗi",
      url: "#",
      icon: Send,
    },
  ],
}


export default function DefautLayout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <AppSidebar data={data}>
        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </AppSidebar>
    </div>
  )
}

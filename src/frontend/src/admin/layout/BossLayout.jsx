import {
  ChartColumnIncreasing,
  CircleUserRound,
  Utensils,
  Contact,
  LifeBuoy,
  Send,
  Building,
} from "lucide-react"
import { AppSidebar } from "@/src/admin/components/sidebar"


// const setBranch = (branch) => { 
//   localStorage.setItem("branch", branch);
// }



const data = {
  user: {
    name: "shadcn",
    role: "Boss",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  branch: {
    name: "SuShiX",
    address: "Công ty TNHH SuShiX",
    url: "/company-dashboard",
  }
  ,
  navProfession: [
  {
    title: "Chi nhánh",
    url: "#",
    icon: Building,
    isActive: true,
    // generate 15 items for each branch
    items: Array.from({ length: 15 }, (_, i) => ({
      title: `Chi nhánh ${i + 1}`,
      url: "/dashboard",
    })),
   }],
  navManagement: [
    {
      title: "Thống kê",
      url: "/company-dashboard",
      icon: ChartColumnIncreasing,
    },
    {
      title: "Thông tin khách hàng",
      url: "/company-customer",
      icon: CircleUserRound,
    },
    {
      title: "Thực đơn",
      url: "/company-menu",
      icon: Utensils,
    },
    {
      title: "Danh sách nhân viên",
      url: "/company-employee",
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


export default function BossLayout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <AppSidebar data={data} forBoss ={true}>
        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </AppSidebar>
    </div>
  )
}

"use client"

import * as React from "react"
import {
  ChartColumnIncreasing,
  CircleUserRound,
  Contact,
  HandPlatter,
  LifeBuoy,
  Receipt,
  Send,
  Utensils,
  UtensilsCrossed,
  ConciergeBell,
} from "lucide-react"

import { NavMain } from "@/src/admin/components/nav-main"
import { NavBranch } from "@/src/admin/components/nav-branch"
import { NavSecondary } from "@/src/admin/components/nav-secondary"
import { NavUser } from "@/src/admin/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"

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

export function AppSidebar({ props, children }) {
  return (
    <SidebarProvider>
      <Sidebar variant="inset" {...props}>
        <SidebarHeader>
          <NavBranch branch={data.branch}/>
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={data.navProfession} title={'Nghiệp vụ'}/>
          <NavMain items={data.navManagement } title= {'Quản lí'}/>
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          {children}
        </SidebarInset>
    </SidebarProvider>
  )
}

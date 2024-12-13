"use client"

import * as React from "react"


import { NavMain } from "@/src/admin/components/nav-main"
import { NavBranch } from "@/src/admin/components/nav-branch"
import { NavSecondary } from "@/src/admin/components/nav-secondary"
import { NavUser } from "@/src/admin/components/nav-user"
import { NavSelectBranch } from "@/src/admin/components/nav-select-branch"
import { NavCompany } from "@/src/admin/components/nav-company"
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



export function AppSidebar({ props, children, data, forBoss }) {
  return (
    <SidebarProvider>
      <Sidebar variant="inset" {...props}>
        <SidebarHeader>
          {!forBoss && <NavBranch/>}
          {forBoss && <NavCompany branch={data.branch}/>}
        </SidebarHeader>
        <SidebarContent>
          {!forBoss && <NavMain items={data.navProfession} title={'Nghiệp vụ'}/>}
          {forBoss && <NavSelectBranch items={data.navProfession} title={'Chi nhánh'}/>}
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

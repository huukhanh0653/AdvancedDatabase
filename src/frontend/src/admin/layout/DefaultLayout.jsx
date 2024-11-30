import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/src/admin/components/sidebar"
import { Sidebar } from "lucide-react"

export default function DefautLayout({ children }) {
  return (
    <div className="flex">
      {/* Sidebar */}
      <AppSidebar>
        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </AppSidebar>
    </div>
  )
}

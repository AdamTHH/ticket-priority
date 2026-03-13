import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar"
import { Navbar } from "@/components/navbar"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider className="flex-col h-svh">

      <Navbar />
      
      <div className="flex flex-1 min-h-0">
        <AppSidebar />
        <SidebarInset>
          {children}
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}

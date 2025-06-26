
import { SidebarProvider } from "@/components/ui/sidebar"
import { DashbordNavbar } from "@/modules/dashbord/ui/components/dashbord-navbar"
import { DashbordSidebar } from "@/modules/dashbord/ui/components/dashbord-sidebar"
interface Props {
    children: React.ReactNode
}


const layout = ({children}: Props) => {
    return (
        <div>
           <SidebarProvider>
            <DashbordSidebar />
            <main className="flex flex-col h-screen w-screen bg-muted">
                <DashbordNavbar />
                {children}
            </main>
              
           </SidebarProvider>
        </div>
    )
}

export default layout
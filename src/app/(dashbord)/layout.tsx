
import { SidebarProvider } from "@/components/ui/sidebar"
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
                {children}
            </main>
              
           </SidebarProvider>
        </div>
    )
}

export default layout
import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/modules/dashboard/ui/components/dashboard-side";

interface Props{
    children:React.ReactNode;
}
const Layout = ({children}: Props) => {
    return (  
        <SidebarProvider>
            <DashboardSidebar/>
            <main className="flex flex-col h-screen w-screen bg-yellow-200">
                {children}
            </main>
            
        </SidebarProvider>
    );
}
 
export default Layout;
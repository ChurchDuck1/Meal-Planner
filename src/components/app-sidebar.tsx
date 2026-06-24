import Link from "next/link"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <img src="/header.PNG" alt="header image"/>
      </SidebarHeader>
      <SidebarContent className="flex flex-col gap-10 p-4 items-center">
        <Link href="/" className="flex items-center gap-2">
            <img src="/home.PNG" alt="home" width="25" height="25"/>
            <strong>Home</strong>
        </Link>
        <Link href="/recipes" className="flex items-center gap-2">
            <img src="/recipe.PNG" alt="recipes" width="25" height="25"/>
            <strong>Recipes</strong>
        </Link>
        <Link href="/meal-planner" className="flex items-center gap-2">
            <img src="/meal-planner.PNG" alt="meal-planner" width="25" height="25"/>
            <strong>Meal Planner</strong>
        </Link>
        <Link href="/order-online" className="flex items-center gap-2">
            <img src="/order-online.PNG" alt="order-online" width="25" height="25"/>
            <strong>Order Online</strong>
        </Link>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenuButton asChild>
          <Link href="/settings">
            <img src="/cog.PNG" alt="settings" width="25" height="25"/>
            Settings
          </Link>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
}
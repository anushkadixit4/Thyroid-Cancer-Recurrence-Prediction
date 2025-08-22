"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Command,
  Film,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Search,
  Send,
  Settings2,
  Table,
  Terminal,
  Hospital,
  Wand2
} from "lucide-react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navMain: [
    {
      title: "Predict",
      url: "/predict",
      icon: Search,
      isActive: true,
      onClick: (router: any) => router.push('/predict')
    },
    {
      title: "Medical Report Analysis",
      url: "/report-analysis",
      icon: Table,
      isActive: true,
      onClick: (router: any) => router.push('/report-analysis')
    },
     {
      title: "Awareness",
      url: "/awareness",
      icon: Wand2,
      isActive: true,
      onClick: (router: any) => router.push('/awareness')
    },
  ]

}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter()
  const [user, setUser] = React.useState<any>(null)
  const supabase = createClientComponentClient()

  React.useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setUser({
          name: user.email?.split('@')[0] || 'User',
          email: user.email,
          avatar: user.user_metadata.avatar_url || null,
        })
      }
    }
    getUser()
  }, [supabase])

  return (
    <Sidebar variant="inset" {...props} className="border-r ">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a onClick={() => router.push('/dashboard')} style={{ cursor: 'pointer' }}>
                <div className="flex aspect-square size-8 items-center justify-center rounded bg-green-300 text-sidebar-primary-foreground">
                  <Hospital className="size-6" />
                </div>
                <div className="grid flex-1 text-left text-sm  leading-tight">
                  <span className="truncate font-semibold">ThyroCare</span>
                  <span className="truncate text-xs">Dashboard</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain.map(item => ({
          ...item,
          onClick: () => router.push(item.url)
        }))} />
      </SidebarContent>
      <SidebarFooter>
        {user && <NavUser user={user} />}
      </SidebarFooter>
    </Sidebar>
  )
}

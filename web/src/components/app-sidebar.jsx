"use client"
import { Home, Server, Cpu, ListChecks, Wallet, Settings, LogOut } from "lucide-react"
import { getUsername } from 'wasp/auth'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
} from "./ui/sidebar"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { ModeToggle } from "./mode-toggle"
import { Link } from "react-router-dom"

import { useLocation } from "react-router-dom"

export function AppSidebar() {
  const { pathname } = useLocation()

  const routes = [
    {
      title: "Dashboard",
      icon: Home,
      to: "/dashboard",
    },
    {
      title: "Host Resources",
      icon: Server,
      to: "/hosts",
    },
    {
      title: "Use Resources",
      icon: Cpu,
      to: "/clients",
    },
    {
      title: "Jobs",
      icon: ListChecks,
      to: "/jobs",
    },
    {
      title: "Credits",
      icon: Wallet,
      to: "/credit",
    },
    {
      title: "Settings",
      icon: Settings,
      to: "/settings",
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-col items-start px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary">
            <Cpu className="h-4 w-4 text-primary-foreground" />
          </div>
          <Link to={'/'} className="text-lg font-semibold">PeerCloud</Link>
        </div>
        <div className="mt-2 w-full">
          <SidebarTrigger className="ml-auto" />
        </div>
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.to}>
              <SidebarMenuButton asChild isActive={pathname === route.to} tooltip={route.title}>
                <Link to={route.to}>
                  <route.icon className="h-4 w-4" />
                  <span>{route.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
              <AvatarFallback>R</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Rushi</span>
              <span className="text-xs text-muted-foreground">Rushi@gmail.com</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <Button variant="ghost" size="icon">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}


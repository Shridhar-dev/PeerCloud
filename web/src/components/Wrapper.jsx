import React from 'react'
import { AppSidebar } from "./app-sidebar"
import { SidebarProvider } from "./ui/sidebar"
import { Toaster } from "./ui/toast"

const Wrapper = ({children}) => {
  return (
    <div> 
          <SidebarProvider>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <main className="flex-1 overflow-auto">{children}</main>
            </div>
            <Toaster />
          </SidebarProvider>
    </div>
  )
}

export default Wrapper
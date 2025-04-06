import React from 'react'
import { DashboardHeader } from "./components/dashboard/dashboard-header"
import { DashboardShell } from "./components/dashboard/dashboard-shell"
import { NgrokSettings } from "./components/settings/ngrok-settings"
import { ProfileSettings } from "./components/settings/profile-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tab"
import Wrapper from './components/Wrapper'
export const SettingsPage = () => {
  return (
    <Wrapper>

    
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your account settings and configure your Ngrok URLs." />

      <Tabs defaultValue="ngrok" className="mt-6">
        <TabsList>
          <TabsTrigger value="ngrok">Ngrok URLs</TabsTrigger>
          <TabsTrigger value="profile">Profile</TabsTrigger>
        </TabsList>
        <TabsContent value="ngrok" className="mt-4">
          <NgrokSettings />
        </TabsContent>
        <TabsContent value="profile" className="mt-4">
          <ProfileSettings />
        </TabsContent>
      </Tabs>
    </DashboardShell>
    </Wrapper>
  )
}

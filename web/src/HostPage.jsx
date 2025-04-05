import React from 'react'
import { DashboardHeader } from "./components/dashboard/dashboard-header"
import { DashboardShell } from "./components/dashboard/dashboard-shell"
import { HostResourceForm } from "./components/host/host-resource-form"
import { ActiveHostedResources } from "./components/host/active-hosted-resources"

export const HostPage = () => {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Host Resources"
        text="Share your idle compute resources with the network and earn credits."
      />
      <div className="grid gap-8">
        <HostResourceForm />
        <ActiveHostedResources />
      </div>
    </DashboardShell>
  )
}
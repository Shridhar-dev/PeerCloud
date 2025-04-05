import React from 'react'
import { DashboardHeader } from "./components/dashboard/dashboard-header"
import { DashboardShell } from "./components/dashboard/dashboard-shell"
import { JobsList } from "./components/jobs/jobs-list"
import { JobsFilter } from "./components/jobs/jobs-filter"

export const JobPage = () => {
  return (
    <DashboardShell>
    <DashboardHeader heading="Jobs" text="Track and manage your compute jobs across the network." />
    <JobsFilter />
    <JobsList />
  </DashboardShell>
  )
}

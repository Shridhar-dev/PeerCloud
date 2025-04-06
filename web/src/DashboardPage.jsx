import React, { useEffect } from 'react'
import { DashboardHeader } from "./components/dashboard/dashboard-header"
import { DashboardShell } from "./components/dashboard/dashboard-shell"
import { Overview } from "./components/dashboard/overview"
import { RecentActivity } from "./components/dashboard/recent-activity"
import { ResourceStats } from "./components/dashboard/resource-stats"
import { CreditBalance } from "./components/dashboard/credit-balance"
import Wrapper from './components/Wrapper'

export const DashboardPage = ({user}) => {
  useEffect(() => {
    console.log('user', user)
  }, []);
  return (
    // <div>{user.identities.username.id}</div>
    <Wrapper>

    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Monitor your compute sharing activity and credit balance." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <CreditBalance />
        <ResourceStats title="Shared Resources" value="12.5h" description="Total compute time shared" trend={+15} />
        <ResourceStats title="Used Resources" value="8.2h" description="Total compute time used" trend={-5} />
        <ResourceStats title="Active Nodes" value="3" description="Currently hosting" trend={0} />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Overview className="col-span-4" />
        <RecentActivity className="col-span-3" />
      </div>
    </DashboardShell>
    </Wrapper>
  )
}

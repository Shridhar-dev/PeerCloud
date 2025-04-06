import React from 'react'
import { DashboardHeader } from "./components/dashboard/dashboard-header"
import { DashboardShell } from "./components/dashboard/dashboard-shell"
import { CreditHistory } from "./components/credits/credit-history"
import { CreditSummary } from "./components/credits/credit-summary"
import Wrapper from './components/Wrapper'

export const CreditPage = () => {
  return (
    <Wrapper>

    <DashboardShell>
    <DashboardHeader heading="Credits" text="View your credit balance, transaction history, and performance score." />
    <div className="grid gap-8">
      <CreditSummary />
      <CreditHistory />
    </div>
  </DashboardShell>
    </Wrapper>
  )
}
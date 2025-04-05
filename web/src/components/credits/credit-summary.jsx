"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tab"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export function CreditSummary() {
  // Sample data - in a real app, this would come from an API
  const dailyData = [
    { date: "Apr 1", earned: 45, spent: 20, balance: 25 },
    { date: "Apr 2", earned: 30, spent: 15, balance: 40 },
    { date: "Apr 3", earned: 60, spent: 35, balance: 65 },
    { date: "Apr 4", earned: 40, spent: 25, balance: 80 },
    { date: "Apr 5", earned: 55, spent: 30, balance: 105 },
    { date: "Apr 6", earned: 75, spent: 40, balance: 140 },
    { date: "Apr 7", earned: 65, spent: 45, balance: 160 },
  ]

  const weeklyData = [
    { date: "Week 1", earned: 200, spent: 120, balance: 80 },
    { date: "Week 2", earned: 250, spent: 150, balance: 180 },
    { date: "Week 3", earned: 300, spent: 200, balance: 280 },
    { date: "Week 4", earned: 350, spent: 220, balance: 410 },
  ]

  const monthlyData = [
    { date: "Jan", earned: 800, spent: 500, balance: 300 },
    { date: "Feb", earned: 900, spent: 600, balance: 600 },
    { date: "Mar", earned: 1000, spent: 700, balance: 900 },
    { date: "Apr", earned: 1200, spent: 750, balance: 1350 },
  ]

  const stats = {
    totalEarned: 1350,
    totalSpent: 850,
    netBalance: 500,
    averageEarned: 45,
    averageSpent: 28,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Summary</CardTitle>
        <CardDescription>Overview of your credit earnings, spending, and balance over time.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-lg border p-4">
            <div className="text-sm text-muted-foreground">Total Earned</div>
            <div className="mt-1 text-2xl font-bold text-emerald-500">{stats.totalEarned}</div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="text-sm text-muted-foreground">Total Spent</div>
            <div className="mt-1 text-2xl font-bold text-rose-500">{stats.totalSpent}</div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="text-sm text-muted-foreground">Net Balance</div>
            <div className="mt-1 text-2xl font-bold">{stats.netBalance}</div>
          </div>
        </div>

        <Tabs defaultValue="daily">
          <TabsList className="mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="daily">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="earned" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="spent" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="weekly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={weeklyData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="earned" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="spent" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="monthly">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="earned" stroke="#10b981" strokeWidth={2} />
                  <Line type="monotone" dataKey="spent" stroke="#ef4444" strokeWidth={2} />
                  <Line type="monotone" dataKey="balance" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}


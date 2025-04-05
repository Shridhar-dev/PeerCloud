"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"

export function Overview({ className }) {
  // Sample data - in a real app, this would come from an API
  const data = [
    { name: "Mon", shared: 4, used: 2 },
    { name: "Tue", shared: 3, used: 5 },
    { name: "Wed", shared: 5, used: 3 },
    { name: "Thu", shared: 7, used: 4 },
    { name: "Fri", shared: 2, used: 6 },
    { name: "Sat", shared: 6, used: 2 },
    { name: "Sun", shared: 8, used: 1 },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Weekly Overview</CardTitle>
        <CardDescription>Your compute resource sharing and usage over the past week.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="shared" name="Shared (hours)" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            <Bar dataKey="used" name="Used (hours)" fill="#f97316" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}


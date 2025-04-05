"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Cpu, Server, Clock } from "lucide-react"

export function RecentActivity({ className }) {
  // Sample data - in a real app, this would come from an API
  const activities = [
    {
      id: 1,
      type: "host",
      description: "GPU Container started",
      time: "10 minutes ago",
      status: "active",
    },
    {
      id: 2,
      type: "client",
      description: "ML training job completed",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: 3,
      type: "client",
      description: "Web build job started",
      time: "3 hours ago",
      status: "active",
    },
    {
      id: 4,
      type: "host",
      description: "CPU Container stopped",
      time: "1 day ago",
      status: "inactive",
    },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest compute sharing and usage activities.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4 rounded-lg border p-3">
              <div className="rounded-full bg-muted p-2">
                {activity.type === "host" ? <Server className="h-4 w-4" /> : <Cpu className="h-4 w-4" />}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{activity.description}</p>
                  <Badge
                    variant={
                      activity.status === "active"
                        ? "default"
                        : activity.status === "completed"
                          ? "success"
                          : "secondary"
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {activity.time}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


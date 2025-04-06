"use client"
import { Card, CardContent } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tab"
import { Clock, Play, Square, CheckCircle, XCircle, AlertCircle, ExternalLink, FileText, Cpu } from "lucide-react"

export function JobsList() {
  // Sample data - in a real app, this would come from an API
  const jobs = [
    {
      id: "job-1",
      name: "ML Model Training",
      type: "Machine Learning",
      status: "running",
      startTime: "2023-04-05 14:30",
      duration: "1h 15m / ~2h",
      progress: 65,
      resourceId: "peer-1",
      resourceName: "High-Performance GPU",
      cost: 30,
    },
    {
      id: "job-2",
      name: "Web App Build",
      type: "Web",
      status: "completed",
      startTime: "2023-04-05 10:15",
      duration: "45m / 1h",
      progress: 100,
      resourceId: "peer-2",
      resourceName: "Web Build Server",
      cost: 8,
    },
    {
      id: "job-3",
      name: "Data Processing Pipeline",
      type: "Data Processing",
      status: "failed",
      startTime: "2023-04-04 16:20",
      duration: "20m / 1h",
      progress: 35,
      resourceId: "peer-3",
      resourceName: "Data Processing Cluster",
      cost: 5,
      error: "Out of memory error at step 3",
    },
    {
      id: "job-4",
      name: "Image Classification",
      type: "Machine Learning",
      status: "queued",
      startTime: "Pending",
      duration: "0m / ~3h",
      progress: 0,
      resourceId: "peer-1",
      resourceName: "High-Performance GPU",
      cost: 0,
    },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "running":
        return <Play className="h-4 w-4" />
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "failed":
        return <XCircle className="h-4 w-4" />
      case "queued":
        return <Clock className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "running":
        return "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
      case "completed":
        return "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
      case "failed":
        return "bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300"
      case "queued":
        return "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300"
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <Card className="mt-6">
      <CardContent className="p-6">
        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Jobs</TabsTrigger>
            <TabsTrigger value="running">Running</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="failed">Failed</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="rounded-lg border p-4">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-start gap-3">
                    <div className={`rounded-full p-2 ${getStatusColor(job.status)}`}>{getStatusIcon(job.status)}</div>
                    <div>
                      <h3 className="font-medium">{job.name}</h3>
                      <p className="text-sm text-muted-foreground">{job.type}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                  </Badge>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Start Time</p>
                      <p className="text-sm font-medium">{job.startTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-muted p-1">
                      <span className="text-xs font-medium">⏱️</span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Duration</p>
                      <p className="text-sm font-medium">{job.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-muted p-1">
                      <Cpu className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Resource</p>
                      <p className="text-sm font-medium">{job.resourceName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-emerald-100 p-1 text-emerald-600 dark:bg-opacity-20">
                      <span className="text-xs font-bold">₵</span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Cost</p>
                      <p className="text-sm font-medium">{job.cost} credits</p>
                    </div>
                  </div>
                </div>

                {job.status === "running" && (
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs font-medium">{job.progress}%</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-muted">
                      <div className="h-2 rounded-full bg-primary" style={{ width: `${job.progress}%` }} />
                    </div>
                  </div>
                )}

                {job.status === "failed" && (
                  <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                    <p className="font-medium">Error: {job.error}</p>
                  </div>
                )}

                <div className="mt-4 flex flex-wrap justify-end gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    View Logs
                  </Button>

                  {job.status === "running" && (
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Square className="h-4 w-4" />
                      Stop Job
                    </Button>
                  )}

                  {job.status === "completed" && (
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <ExternalLink className="h-4 w-4" />
                      View Results
                    </Button>
                  )}

                  {job.status === "failed" && (
                    <Button size="sm" className="flex items-center gap-1">
                      <Play className="h-4 w-4" />
                      Retry Job
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="running">
            <div className="rounded-lg border p-4 text-center">
              <p className="text-muted-foreground">View only running jobs.</p>
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="rounded-lg border p-4 text-center">
              <p className="text-muted-foreground">View only completed jobs.</p>
            </div>
          </TabsContent>

          <TabsContent value="failed">
            <div className="rounded-lg border p-4 text-center">
              <p className="text-muted-foreground">View only failed jobs.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}


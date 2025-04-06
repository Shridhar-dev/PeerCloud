"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tab"
import { Cpu, Clock, Activity, ExternalLink, StopCircle } from "lucide-react"
import { useToast } from "../ui/use-toast"

export function ActiveHostedResources() {
  const { toast } = useToast()

  // Sample data - in a real app, this would come from an API
  const resources = [
    {
      id: "node-1",
      name: "GPU-Node-1",
      type: "Machine Learning",
      status: "active",
      uptime: "2h 15m",
      usage: "75%",
      creditsEarned: 120,
      ngrokUrl: "https://abcd1234.ngrok.io",
      hasGpu: true,
    },
    {
      id: "node-2",
      name: "Web-Build-Node",
      type: "Web",
      status: "active",
      uptime: "5h 30m",
      usage: "45%",
      creditsEarned: 85,
      ngrokUrl: "https://efgh5678.ngrok.io",
      hasGpu: false,
    },
  ]

  const handleStopHosting = (id) => {
    toast({
      title: "Resource Stopped",
      description: `Resource ${id} has been stopped and is no longer available on the network.`,
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Hosted Resources</CardTitle>
        <CardDescription>Monitor and manage your currently hosted compute resources.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active">
          <TabsList className="mb-4">
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="all">All Resources</TabsTrigger>
          </TabsList>
          <TabsContent value="active" className="space-y-4">
            {resources.map((resource) => (
              <div key={resource.id} className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`rounded-full p-2 ${resource.hasGpu ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"} dark:bg-opacity-20`}
                    >
                      <Cpu className="h-4 w-4" />
                    </div>
                    <div>
                      <h3 className="font-medium">{resource.name}</h3>
                      <p className="text-sm text-muted-foreground">{resource.type}</p>
                    </div>
                  </div>
                  <Badge variant={resource.status === "active" ? "default" : "secondary"}>{resource.status}</Badge>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Uptime</p>
                      <p className="text-sm font-medium">{resource.uptime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Usage</p>
                      <p className="text-sm font-medium">{resource.usage}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-emerald-100 p-1 text-emerald-600 dark:bg-opacity-20">
                      <span className="text-xs font-bold">₵</span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Credits Earned</p>
                      <p className="text-sm font-medium">{resource.creditsEarned}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Ngrok URL</p>
                      <a
                        href={resource.ngrokUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        View URL
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                    onClick={() => handleStopHosting(resource.id)}
                  >
                    <StopCircle className="h-4 w-4" />
                    Stop Hosting
                  </Button>
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="all">
            <div className="rounded-lg border p-4 text-center">
              <p className="text-muted-foreground">View all your hosted resources, including inactive ones.</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}


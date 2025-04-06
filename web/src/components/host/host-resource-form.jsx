"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Slider } from "../ui/slider"
import { Switch } from "../ui/switch"
import { useToast } from "../ui/use-toast"

export function HostResourceForm() {
  const { toast } = useToast()
  const [resourceAllocation, setResourceAllocation] = useState(50)
  const [isGpuEnabled, setIsGpuEnabled] = useState(false)
  const [selectedNgrokUrl, setSelectedNgrokUrl] = useState("")

  // This would come from your database in a real app
  const ngrokUrls = [
    { id: 1, url: "https://abcd1234.ngrok.io" },
    { id: 2, url: "https://efgh5678.ngrok.io" },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!selectedNgrokUrl) {
      toast({
        title: "No Ngrok URL Selected",
        description: "Please select a Ngrok URL to host your resource.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Resource Hosting Started",
      description: "Your compute resources are now available on the network.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Host a Resource</CardTitle>
        <CardDescription>Configure and share your idle compute resources with the network.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="container-name">Container Name</Label>
              <Input id="container-name" placeholder="e.g., my-gpu-node" />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="ngrok-url">Ngrok URL</Label>
              <Select value={selectedNgrokUrl} onValueChange={setSelectedNgrokUrl}>
                <SelectTrigger id="ngrok-url">
                  <SelectValue placeholder="Select a Ngrok URL" />
                </SelectTrigger>
                <SelectContent>
                  {ngrokUrls.map((url) => (
                    <SelectItem key={url.id} value={url.url}>
                      {url.url}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Select the Ngrok URL that points to your compute resource.
                <a href="/settings" className="ml-1 text-primary underline">
                  Manage URLs
                </a>
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="container-type">Container Type</Label>
              <Select defaultValue="python">
                <SelectTrigger id="container-type">
                  <SelectValue placeholder="Select container type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="web">Web</SelectItem>
                  <SelectItem value="data">Data Processing</SelectItem>
                  <SelectItem value="ml">Machine Learning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="gpu-enabled">GPU Enabled</Label>
                <Switch id="gpu-enabled" checked={isGpuEnabled} onCheckedChange={setIsGpuEnabled} />
              </div>
              <p className="text-xs text-muted-foreground">Enable this to share your GPU resources with the network.</p>
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label>Resource Allocation</Label>
                <span className="text-sm">{resourceAllocation}%</span>
              </div>
              <Slider
                value={[resourceAllocation]}
                min={10}
                max={90}
                step={5}
                onValueChange={(value) => setResourceAllocation(value[0])}
              />
              <p className="text-xs text-muted-foreground">
                Percentage of your compute resources to share with the network.
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="max-duration">Maximum Job Duration (hours)</Label>
              <Select defaultValue="4">
                <SelectTrigger id="max-duration">
                  <SelectValue placeholder="Select maximum duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 hour</SelectItem>
                  <SelectItem value="2">2 hours</SelectItem>
                  <SelectItem value="4">4 hours</SelectItem>
                  <SelectItem value="8">8 hours</SelectItem>
                  <SelectItem value="24">24 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className="w-full" disabled={!selectedNgrokUrl}>
          Start Hosting
        </Button>
      </CardFooter>
    </Card>
  )
}


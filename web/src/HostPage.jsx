"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, RefreshCw, Cpu, HardDrive, MemoryStickIcon as Memory, Clock } from "lucide-react"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Slider } from "./components/ui/slider"
import { Label } from "./components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tab"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Ngrok } from "wasp/client/crud"

export const HostsPage = () => {
  const [isAllocating, setIsAllocating] = useState(false)
  const [containerConfig, setContainerConfig] = useState({
    memory: 512,
    memoryUnit: "MB",
    cpuLimit: 1,
    cpuReservation: 0.5,
    diskSpace: 1,
    diskSpaceUnit: "GB",
    restartPolicy: "no",
    timeoutSeconds: 60,
    advancedOptions: false,
  })

  const handleConfigChange = (key, value) => {
    setContainerConfig({
      ...containerConfig,
      [key]: value,
    })
  }

  const handleAllocate = async () => {
    setIsAllocating(true)
    try {
      // Convert memory to bytes for API
      window.open("peer://run", "_blank")
      const memoryInBytes =
        containerConfig.memory *
        (containerConfig.memoryUnit === "GB"
          ? 1024 * 1024 * 1024
          : containerConfig.memoryUnit === "MB"
            ? 1024 * 1024
            : 1024)

      // Convert disk space to bytes for API
      const diskInBytes =
        containerConfig.diskSpace *
        (containerConfig.diskSpaceUnit === "GB"
          ? 1024 * 1024 * 1024
          : containerConfig.diskSpaceUnit === "MB"
            ? 1024 * 1024
            : 1024)

      // Here you would call your API with the container configuration
      console.log("Allocating container with config:", {
        ...containerConfig,
        memoryInBytes,
        diskInBytes,
      })

      // Your allocation logic here
    } catch (error) {
      console.error("Error allocating container:", error)
    } finally {
      setIsAllocating(false)
    }
  }

  const createNgrok = Ngrok.create.useAction()

  return (
    <div className="flex h-screen flex-col py-12">
      <div className="mb-8 flex items-center justify-between">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-4xl font-extrabold text-gray-900">Host Dashboard</h1>
        <Button variant="outline" size="icon" className="hover:bg-gray-200">
          <RefreshCw className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-2 flex-1 px-10 items-start justify-center">
        <Card className="w-full relative h-full max-w-2xl p-5 shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Allocate New Container</CardTitle>
            <CardDescription className="text-center">
              Configure and allocate a new Docker container with custom resource constraints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="basic">Basic Configuration</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-6 mt-10">
                {/* Memory Configuration */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Memory className="h-4 w-4 text-gray-500" />
                      <Label htmlFor="memory">Memory Limit</Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">
                        {containerConfig.memory} {containerConfig.memoryUnit}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Slider
                        id="memory"
                        min={64}
                        max={containerConfig.memoryUnit === "GB" ? 16 : 4096}
                        step={containerConfig.memoryUnit === "GB" ? 1 : 64}
                        value={[containerConfig.memory]}
                        onValueChange={(value) => handleConfigChange("memory", value[0])}
                      />
                    </div>
                    <Select
                      value={containerConfig.memoryUnit}
                      onValueChange={(value) => handleConfigChange("memoryUnit", value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MB">MB</SelectItem>
                        <SelectItem value="GB">GB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* CPU Configuration */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-gray-500" />
                      <Label htmlFor="cpu">CPU Limit</Label>
                    </div>
                    <span className="text-sm font-medium">{containerConfig.cpuLimit} cores</span>
                  </div>
                  <Slider
                    id="cpu"
                    min={0.1}
                    max={8}
                    step={0.1}
                    value={[containerConfig.cpuLimit]}
                    onValueChange={(value) => handleConfigChange("cpuLimit", value[0])}
                  />
                </div>

                {/* Disk Space */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-gray-500" />
                      <Label htmlFor="disk">Disk Space</Label>
                    </div>
                    <span className="text-sm font-medium">
                      {containerConfig.diskSpace} {containerConfig.diskSpaceUnit}
                    </span>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Slider
                        id="disk"
                        min={1}
                        max={containerConfig.diskSpaceUnit === "GB" ? 100 : 10240}
                        step={containerConfig.diskSpaceUnit === "GB" ? 1 : 128}
                        value={[containerConfig.diskSpace]}
                        onValueChange={(value) => handleConfigChange("diskSpace", value[0])}
                      />
                    </div>
                    <Select
                      value={containerConfig.diskSpaceUnit}
                      onValueChange={(value) => handleConfigChange("diskSpaceUnit", value)}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MB">MB</SelectItem>
                        <SelectItem value="GB">GB</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                {/* CPU Reservation */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-gray-500" />
                      <Label htmlFor="cpu-reservation">CPU Reservation</Label>
                    </div>
                    <span className="text-sm font-medium">{containerConfig.cpuReservation} cores</span>
                  </div>
                  <Slider
                    id="cpu-reservation"
                    min={0.1}
                    max={4}
                    step={0.1}
                    value={[containerConfig.cpuReservation]}
                    onValueChange={(value) => handleConfigChange("cpuReservation", value[0])}
                  />
                </div>

                {/* Restart Policy */}
                <div className="space-y-2">
                  <Label htmlFor="restart-policy">Restart Policy</Label>
                  <Select
                    id="restart-policy"
                    value={containerConfig.restartPolicy}
                    onValueChange={(value) => handleConfigChange("restartPolicy", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select restart policy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="no">No restart</SelectItem>
                      <SelectItem value="always">Always restart</SelectItem>
                      <SelectItem value="on-failure">Restart on failure</SelectItem>
                      <SelectItem value="unless-stopped">Restart unless stopped</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Timeout */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <Label htmlFor="timeout">Operation Timeout</Label>
                    </div>
                    <span className="text-sm font-medium">{containerConfig.timeoutSeconds} seconds</span>
                  </div>
                  <Slider
                    id="timeout"
                    min={10}
                    max={300}
                    step={5}
                    value={[containerConfig.timeoutSeconds]}
                    onValueChange={(value) => handleConfigChange("timeoutSeconds", value[0])}
                  />
                </div>
              </TabsContent>
            </Tabs>
            <div className="absolute bottom-10 left-0 px-10 w-full">
              <Button onClick={handleAllocate} disabled={isAllocating} className="w-full bottom-10 py-5 border text-lg font-medium mt-6">
                {isAllocating ? "Allocating..." : "Allocate Container"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className=" w-full max-w-2xl">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Connect Container</CardTitle>
              <CardDescription>Enter the URL shown on the terminal to connect to your container</CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const url = e.target.elements["terminal-url"].value
                  console.log(url)
                  localStorage.setItem("terminal-url", url)
                  createNgrok({ url })
                }}
              >
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="terminal-url">Terminal URL</Label>
                    <Input type="text" id="terminal-url" name="terminal-url" placeholder="http://localhost:3000" />
                  </div>
                  <Button type="submit" className="w-full border py-5">
                    Submit URL
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


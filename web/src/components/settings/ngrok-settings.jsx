"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useToast } from "../ui/use-toast"
import { Trash2 } from "lucide-react"


export function NgrokSettings() {
  const { toast } = useToast()
  const [newUrl, setNewUrl] = useState("")

  // This would come from your database in a real app
  const [ngrokUrls, setNgrokUrls] = useState([
    { id: 1, url: "https://abcd1234.ngrok.io" },
    { id: 2, url: "https://efgh5678.ngrok.io" },
  ])

  const handleAddUrl = () => {
    if (!newUrl) return

    if (!newUrl.startsWith("https://") || !newUrl.includes("ngrok.io")) {
      toast({
        title: "Invalid Ngrok URL",
        description: "Please enter a valid Ngrok URL (https://xxx.ngrok.io)",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would be an API call to add the URL to the database
    const newId = Math.max(0, ...ngrokUrls.map((u) => u.id)) + 1
    setNgrokUrls([...ngrokUrls, { id: newId, url: newUrl }])
    setNewUrl("")

    toast({
      title: "Ngrok URL Added",
      description: "Your Ngrok URL has been added successfully.",
    })
  }

  const handleDeleteUrl = (id) => {
    // In a real app, this would be an API call to delete the URL from the database
    setNgrokUrls(ngrokUrls.filter((url) => url.id !== id))

    toast({
      title: "Ngrok URL Deleted",
      description: "Your Ngrok URL has been deleted successfully.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ngrok URLs</CardTitle>
        <CardDescription>
          Manage your Ngrok URLs for hosting compute resources. These URLs will be used to make your resources
          accessible to other users.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="new-url">Add New Ngrok URL</Label>
            <div className="flex gap-2">
              <Input
                id="new-url"
                placeholder="https://your-tunnel.ngrok.io"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
              />
              <Button onClick={handleAddUrl}>Add URL</Button>
            </div>
            <p className="text-xs text-muted-foreground">Enter the Ngrok URL that points to your compute resource.</p>
          </div>

          <div className="mt-6">
            <h3 className="mb-2 text-sm font-medium">Your Ngrok URLs</h3>
            {ngrokUrls.length > 0 ? (
              <div className="space-y-2">
                {ngrokUrls.map((url) => (
                  <div key={url.id} className="flex items-center justify-between rounded-md border p-3">
                    <span className="text-sm font-mono">{url.url}</span>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteUrl(url.id)}>
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-md border p-4 text-center text-muted-foreground">No Ngrok URLs added yet.</div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t px-6 py-4">
        <div className="text-sm text-muted-foreground">
          Need help setting up Ngrok?{" "}
          <a href="https://ngrok.com/docs" target="_blank" rel="noopener noreferrer" className="text-primary underline">
            View Ngrok documentation
          </a>
        </div>
      </CardFooter>
    </Card>
  )
}


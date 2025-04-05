import { ArrowLeft } from "lucide-react"

import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Link } from "react-router-dom"
import { Ngrok } from "wasp/client/crud"
// import { redirect } from "@/.wasp/out/sdk/wasp/dist/server/utils"



export const ClientsPage = () => {
  const { data } = Ngrok.getAll.useQuery()

  async function submitRequest(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
  
    const repoLink = formData.get("repoLink");
    const type = formData.get("type");
    const entrypoint = formData.get("entrypoint");
  
    // In a real application, you would save this to MongoDB
    console.log(data)
    const details = async () =>{
      console.log("Client request submitted:", { repoLink, type, entrypoint });
      
      const info = await fetch(`${data[data.length-1].url}/start/${[data.length-1]}`, {
        method: "POST",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          repository: "https://github.com/Rushikesh-24/node-server",
          type,
          entrypoint
        })
      })
      console.log(info)
    }
    details();
  }
  return (
    <div className="w-full h-screen flex justify-center items-center">

    <div className="container max-w-4xl py-12 ">
      <div className="mb-8">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Submit Container Request</CardTitle>
          <CardDescription>Provide your repository details to request a container allocation</CardDescription>
        </CardHeader>
        <form onSubmit={submitRequest}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="repoLink">Repository Link</Label>
              <Input id="repoLink" name="repoLink" placeholder="https://github.com/username/repo" required />
              <p className="text-sm text-muted-foreground">Provide the full URL to your Git repository</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Container Type</Label>
              <Select name="type" required defaultValue="web">
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select container type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="python">AI</SelectItem>
                  <SelectItem value="web">Web Application</SelectItem>
                  <SelectItem value="api">API Service</SelectItem>
                  <SelectItem value="worker">Background Worker</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground">Select the type of container you need</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="entrypoint">Entrypoint</Label>
              <Input id="entrypoint" name="entrypoint" placeholder="npm start" required />
              <p className="text-sm text-muted-foreground">
                The command to start your application inside the container
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Submit Request
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
    </div>
  )
}


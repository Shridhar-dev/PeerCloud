import { ArrowLeft } from "lucide-react"

import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Link } from "react-router-dom"
import { Ngrok } from "wasp/client/crud"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./components/ui/dialog"
import { Copy } from "lucide-react"
import { toast } from "sonner"




export const ClientsPage = () => {
  const [showModal, setShowModal] = useState(false);
const [serverUrl, setServerUrl] = useState("");
const [geminiData, setGeminiData] = useState(null);

  const { data } = Ngrok.getAll.useQuery()
  const updateAction = Ngrok.update.useAction()
  

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
      try{
      const info = await fetch(`${data[data.length-1].url}/start/${[data.length-1]*1090}`, {
        method: "POST",
        // mode: "no-cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          repository: repoLink||"https://github.com/Rushikesh-24/node-server",
          type,
          entrypoint
        })
      })
      const info2 = await info.json()
      console.log(info2.url)
      setServerUrl(info2.url);
      console.log(data[data.length-1].id)
      await updateAction({
        id: data[data.length - 1].id,
      });
    }
    catch(err){
      console.log(err)
    }
    const geminiRequestBody = {
      contents: [
        {
          parts: [
            {
              text: `Generate an output response with only container instructions for:\nRepository: ${repoLink}\nType: ${type}\nEntrypoint: ${entrypoint} just return text in paragraph form with less than 20-25 words`
            }
          ]
        }
      ]
    };

    const geminiResponse = await fetchGeminiData(geminiRequestBody);
    setGeminiData(geminiResponse);
    console.log("Gemini Response:", geminiResponse);
    setShowModal(true);
      // const newdata = 
    }
    details();
  }
  const fetchGeminiData = async (requestBody) => {
    try {
      const geminiApiKey =  "AIzaSyBxfm-pwcV_9bh5FO5FVvbQAHpur4IDeoQ";
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      const result = await response.json();
      // console.log("Result from Gemini:", result);

      // Extract and clean response text
      let responseText = result.candidates[0].content.parts[0].text;
      responseText = responseText
        .replace(/^```json\s*/, "")
        .replace(/```\s*$/, "");

      return responseText;
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

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
    <Dialog open={showModal} onOpenChange={setShowModal}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Server Deployed Successfully</DialogTitle>
    </DialogHeader>
    <div className="space-y-4">
      <div className="flex justify-between items-center bg-muted px-3 py-2 rounded-md">
        <code className="text-sm">{serverUrl}</code>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            navigator.clipboard.writeText(serverUrl);
            toast.success("URL copied!");
          }}
        >
          <Copy className="w-4 h-4" />
        </Button>
      </div>

      <div className="text-sm space-y-1">
        <p><strong>Available Endpoints:</strong></p>
        <ul className="ml-4 list-disc">
          <li><code>POST {serverUrl}/train</code> – Train a model</li>
          <li><code>GET {serverUrl}/checkbuild</code> – Check build status</li>
          <li>
            <code>POST {serverUrl}/predict</code> – Predict using model <br />
            <span className="text-muted-foreground ml-4 block">
              Body: {"{ input: [0.1, 0.5, 0.3, ..., 1.0] /* 10 digits between 0-1 */ }"}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </DialogContent>
</Dialog>
    {
      geminiData && (
        <div className="fixed bottom-20 right-20 bg-white w-fit text-sm space-y-2 border rounded-md p-4 shadow-lg">
          <p><strong>Gemini Suggestions:</strong></p>
          <pre className="bg-muted p-2 rounded-md overflow-auto whitespace-pre-wrap">{geminiData}</pre>
        </div>
      )
    }
    </div>
  )
}


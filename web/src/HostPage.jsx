"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { Button } from "./components/ui/button"
import { Ngrok } from "wasp/client/crud"


export  const HostsPage = () => {
  const [isAllocating, setIsAllocating] = useState(false)
  const handleAllocate = async () => {
    setIsAllocating(true)
    try {
      
    } catch (error) {
      console.error("Error allocating container:", error)
    } finally {
      setIsAllocating(false)
    }
  }

  const createNgrok = Ngrok.create.useAction();


  return (
    <div className="py-12 h-screen w-screen px-20">
      <div className="mb-8 w-full flex items-center justify-between">
        <Link to="/">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-4xl font-extrabold text-gray-900 -ml-20">Host Dashboard</h1>
        <Button variant="outline" size="icon" className="hover:bg-gray-200">
          <RefreshCw className="h-5 w-5" />
        </Button>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Allocate New Container
          </h2>
          <p className="text-base text-gray-600 text-center mb-8">
            Click the button below to allocate a new container. This process may take a few moments.
          </p>
          <Button
            onClick={handleAllocate}
            disabled={isAllocating}
            className="w-full py-3 text-lg font-medium"
          >
            <Link to="peer://run">{isAllocating ? "Allocating..." : "Allocate Container"}</Link>
          </Button>
        </div>
        <div className="mt-8 w-full max-w-lg">
          <form
            onSubmit={(e) => {
              e.preventDefault()
              const url = e.target.elements["terminal-url"].value
              console.log( url)
              
              createNgrok({url})
            }}
          >
            <label htmlFor="terminal-url" className="block text-sm font-semibold text-gray-700 mb-2">
              Enter the URL shown on the terminal
            </label>
            <input
              type="text"
              id="terminal-url"
              name="terminal-url"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-base px-4 py-2"
              placeholder="http://localhost:3000"
            />
            <Button type="submit" className="mt-4 w-full py-3 text-lg font-medium">
              Submit URL
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}


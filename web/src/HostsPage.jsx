"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { Button } from "./components/ui/button"
import { Ngrok } from "wasp/client/crud"
import Wrapper from "./components/Wrapper"


export  const HostsPage = ({}) => {
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
    <Wrapper>
      <div className="py-12 h-full flex justify-center items-center flex-col w-full px-6 sm:px-20">
        <div className="mb-8 w-full flex items-center justify-center">
          <h1 className="text-4xl font-extrabold text-gray-900 text-center">Host Dashboard</h1>
        </div>
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
              Allocate New Container
            </h2>
            <p className="text-base text-gray text-center mb-8">
              Click the button below to allocate a new container. This process may take a few moments.
            </p>
            <Button
              onClick={handleAllocate}
              disabled={isAllocating}
              className={`w-full py-3 text-lg font-medium ${
                isAllocating ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-black text-white"
              }`}
            >
              {isAllocating ? "Allocating..." : "Allocate Container"}
            </Button>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
            <form
              onSubmit={(e) => {
                e.preventDefault()
                const url = e.target.elements["terminal-url"].value
                console.log(url)
                createNgrok({ url })
              }}
            >
              <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                Submit Terminal URL
              </h2>
              <p className="text-sm text-gray text-center mb-6">
                Enter the URL shown on the terminal to proceed.
              </p>
              <label htmlFor="terminal-url" className="block text-sm font-semibold text-gray mb-2">
                Terminal URL
              </label>
              <input
                type="text"
                id="terminal-url"
                name="terminal-url"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-black-500 focus:ring-black-500 sm:text-base px-4 py-2"
                placeholder="http://localhost:3000"
              />
              <Button
                type="submit"
                className="mt-4 w-full py-3 text-lg font-medium bg-black hover:bg-black text-white"
              >
                Submit URL
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}


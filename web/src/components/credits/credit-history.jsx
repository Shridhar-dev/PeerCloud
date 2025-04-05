"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Badge } from "../ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { ArrowDown, ArrowUp, Server, Cpu } from "lucide-react"

export function CreditHistory() {
  // Sample data - in a real app, this would come from an API
  const transactions = [
    {
      id: "tx-1",
      date: "2023-04-05 14:30",
      type: "earned",
      amount: 25,
      description: "Hosting GPU resources",
      jobId: "job-5",
      resourceId: "node-1",
    },
    {
      id: "tx-2",
      date: "2023-04-05 10:15",
      type: "spent",
      amount: 15,
      description: "ML training job",
      jobId: "job-1",
      resourceId: "peer-1",
    },
    {
      id: "tx-3",
      date: "2023-04-04 16:20",
      type: "earned",
      amount: 10,
      description: "Hosting CPU resources",
      jobId: "job-6",
      resourceId: "node-2",
    },
    {
      id: "tx-4",
      date: "2023-04-04 12:45",
      type: "spent",
      amount: 8,
      description: "Web build job",
      jobId: "job-2",
      resourceId: "peer-2",
    },
    {
      id: "tx-5",
      date: "2023-04-03 09:30",
      type: "earned",
      amount: 30,
      description: "Hosting GPU resources",
      jobId: "job-7",
      resourceId: "node-1",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit History</CardTitle>
        <CardDescription>Your credit transactions from hosting and using compute resources.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.date}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {transaction.type === "earned" ? (
                      <Server className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Cpu className="h-4 w-4 text-muted-foreground" />
                    )}
                    {transaction.description}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={transaction.type === "earned" ? "success" : "default"}>
                    {transaction.type === "earned" ? "Earned" : "Spent"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    {transaction.type === "earned" ? (
                      <ArrowUp className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <ArrowDown className="h-4 w-4 text-rose-500" />
                    )}
                    <span className={transaction.type === "earned" ? "text-emerald-500" : "text-rose-500"}>
                      {transaction.type === "earned" ? "+" : "-"}
                      {transaction.amount}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}


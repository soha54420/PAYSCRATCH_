import { useState } from "react"
import { Search, ShieldAlert, CheckCircle2, Clock } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockTransactions } from "@/data/mockData"

// Mock alerts derived from high risk transactions
const mockAlerts = mockTransactions
  .filter(t => t.riskLevel === "high" || t.riskLevel === "fraud")
  .map(t => ({
    id: `ALR-${t.id.split("-")[1] || Math.floor(Math.random() * 10000)}`,
    transactionId: t.id,
    customer: t.customer,
    amount: t.amount,
    date: t.date,
    riskLevel: t.riskLevel,
    riskScore: t.riskScore,
    status: t.riskLevel === "fraud" ? "open" : "investigating",
  }))

export function Alerts() {
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "open" | "investigating" | "resolved">("all")

  const filteredAlerts = mockAlerts.filter((a) => {
    const matchesSearch = 
      a.id.toLowerCase().includes(search.toLowerCase()) ||
      a.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      a.customer.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === "all" || a.status === statusFilter
    
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground flex items-center gap-2">
          <ShieldAlert className="h-8 w-8 text-destructive" />
          Active Alerts
        </h1>
        <p className="text-muted-foreground mt-2">
          Review and investigate flagged high-risk transactions.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-start sm:items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search alerts, transactions, or customers..."
            className="pl-9 bg-surface"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 hide-scrollbar">
          <Button 
            variant={statusFilter === "all" ? "default" : "outline"} 
            size="sm"
            onClick={() => setStatusFilter("all")}
            className="whitespace-nowrap"
          >
            All Alerts
          </Button>
          <Button 
            variant={statusFilter === "open" ? "default" : "outline"} 
            size="sm"
            onClick={() => setStatusFilter("open")}
            className="whitespace-nowrap bg-destructive/10 text-destructive border-destructive/20 hover:bg-destructive hover:text-destructive-foreground"
          >
            Open
          </Button>
          <Button 
            variant={statusFilter === "investigating" ? "default" : "outline"} 
            size="sm"
            onClick={() => setStatusFilter("investigating")}
            className="whitespace-nowrap bg-amber-500/10 text-amber-600 border-amber-500/20 hover:bg-amber-500 hover:text-white"
          >
            Investigating
          </Button>
          <Button 
            variant={statusFilter === "resolved" ? "default" : "outline"} 
            size="sm"
            onClick={() => setStatusFilter("resolved")}
            className="whitespace-nowrap"
          >
            Resolved
          </Button>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-surface overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-surface-dim hover:bg-surface-dim">
              <TableHead className="w-[120px]">Alert ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead className="text-right">Risk Score</TableHead>
              <TableHead>Time Flagged</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAlerts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <CheckCircle2 className="h-12 w-12 mb-4 text-emerald-500/50" />
                    <p className="text-lg font-medium text-foreground">No active alerts found</p>
                    <p className="text-sm">Try adjusting your search or filters.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredAlerts.map((a) => (
                <TableRow key={a.id} className="group transition-colors">
                  <TableCell className="font-medium text-primary">{a.id}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{a.customer}</span>
                      <span className="text-xs text-muted-foreground">${a.amount.toFixed(2)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground font-mono text-xs">{a.transactionId}</TableCell>
                  <TableCell className="text-right">
                    <span className={`font-medium tnum ${a.riskScore > 85 ? 'text-destructive' : 'text-amber-500'}`}>
                      {a.riskScore}
                    </span>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    <div className="flex items-center gap-1.5 text-sm">
                      <Clock className="h-3 w-3" />
                      {new Date(a.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={
                        a.status === "open" ? "bg-destructive/10 text-destructive border-destructive/20" :
                        a.status === "investigating" ? "bg-amber-500/10 text-amber-600 border-amber-500/20" :
                        "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                      }
                    >
                      {a.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

import { useState } from "react"
import { Search, Filter, Download } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { mockTransactions, type Transaction } from "@/data/mockData"
import { TransactionDetails } from "@/components/TransactionDetails"

export function Transactions() {
  const [search, setSearch] = useState("")
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const filteredTransactions = mockTransactions.filter((t) =>
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.customer.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground mt-1">
            Real-time ledger of all processed payments and risk scores.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" /> Filters
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-4 bg-surface-lowest">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by ID or Customer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-[#F5F9FF]">
              <TableHead className="w-[120px]">Transaction ID</TableHead>
              <TableHead>Timestamp</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Merchant / Gateway</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Risk Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((t) => (
              <TableRow 
                key={t.id} 
                className="cursor-pointer group"
                onClick={() => setSelectedTransaction(t)}
              >
                <TableCell className="font-medium text-primary">{t.id}</TableCell>
                <TableCell className="text-muted-foreground">
                  {new Date(t.date).toLocaleString([], {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </TableCell>
                <TableCell>{t.customer}</TableCell>
                <TableCell className="text-muted-foreground">{t.merchant}</TableCell>
                <TableCell className="text-muted-foreground">{t.paymentMethod}</TableCell>
                <TableCell className="text-right font-medium">
                  ${t.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant={t.riskLevel as "default" | "low" | "medium" | "high" | "fraud"}>
                    {t.riskLevel.toUpperCase()}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredTransactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <TransactionDetails 
        transaction={selectedTransaction} 
        open={!!selectedTransaction} 
        onOpenChange={(open) => !open && setSelectedTransaction(null)} 
      />
    </div>
  )
}

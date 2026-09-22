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
  
  // ML Prediction Form State
  const [customerId, setCustomerId] = useState("")
  const [terminalId, setTerminalId] = useState("")
  const [txAmount, setTxAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const [predictionResult, setPredictionResult] = useState<{ status: string; fraud_probability: number; is_fraud: boolean; threshold_used: number; signals: string[] } | null>(null)
  const [error, setError] = useState<string | null>(null)

  const filteredTransactions = mockTransactions.filter((t) =>
    t.id.toLowerCase().includes(search.toLowerCase()) ||
    t.customer.toLowerCase().includes(search.toLowerCase())
  )

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setPredictionResult(null);

    const cid = parseInt(customerId);
    const tid = parseInt(terminalId);
    const amount = parseFloat(txAmount);

    if (isNaN(cid) || isNaN(tid) || isNaN(amount) || amount <= 0) {
      setError("Please enter valid numbers. Amount must be greater than 0.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_id: cid,
          terminal_id: tid,
          tx_amount: amount,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to analyze transaction");
      }

      const data = await response.json();
      setPredictionResult(data);
    } catch (err) {
      setError("Error connecting to the risk engine. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

      {/* ML Prediction Form */}
      <div className="bg-surface border border-border rounded-lg shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Live Transaction Analysis</h2>
        <form onSubmit={handleAnalyze} className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-1">Customer ID</label>
              <input
                type="number"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                placeholder="e.g. 1"
                required
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-1">Terminal ID</label>
              <input
                type="number"
                value={terminalId}
                onChange={(e) => setTerminalId(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                placeholder="e.g. 5"
                required
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-medium mb-1">Amount ($)</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={txAmount}
                onChange={(e) => setTxAmount(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring transition-colors"
                placeholder="e.g. 150.00"
                required
              />
            </div>
          </div>
          <div className="flex items-center gap-4 mt-2">
            <Button type="submit" disabled={loading} className="min-w-[150px]">
              {loading ? "Analyzing..." : "Analyze Transaction"}
            </Button>
            {error && <span className="text-destructive text-sm font-medium">{error}</span>}
          </div>
        </form>

        {predictionResult && (
          <div className="mt-6 p-4 rounded-md border border-border bg-surface-lowest">
            <h3 className="font-semibold text-sm text-muted-foreground mb-3">ANALYSIS RESULT</h3>
            <div className="flex items-center gap-4">
              <Badge variant={predictionResult.is_fraud ? "fraud" : "default"} className="text-sm px-3 py-1">
                {predictionResult.status}
              </Badge>
              <div className="flex flex-col text-sm">
                <span className="text-muted-foreground">Fraud Probability: <strong className="text-foreground">{(predictionResult.fraud_probability * 100).toFixed(1)}%</strong></span>
                <span className="text-muted-foreground">Threshold: <strong className="text-foreground">{predictionResult.threshold_used}</strong></span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <h4 className="font-semibold text-sm text-foreground mb-2">Risk Signals</h4>
              {predictionResult.signals && predictionResult.signals.length > 0 ? (
                <ul className="space-y-1">
                  {predictionResult.signals.map((signal, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-foreground">
                      <span className="text-muted-foreground">•</span>
                      <span>{signal}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground italic">No additional runtime risk signals detected.</p>
              )}
            </div>
          </div>
        )}
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

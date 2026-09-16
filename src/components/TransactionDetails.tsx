import { Copy, AlertCircle, ServerCrash, CreditCard, Laptop2, Globe2 } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import type { Transaction } from "@/data/mockData"

interface TransactionDetailsProps {
  transaction: Transaction | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TransactionDetails({ transaction, open, onOpenChange }: TransactionDetailsProps) {
  if (!transaction) return null

  const isHighRisk = transaction.riskLevel === "high" || transaction.riskLevel === "fraud"

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto w-full sm:max-w-xl p-0 flex flex-col">
        {/* Header Section */}
        <div className="bg-surface-lowest p-6 border-b border-border">
          <SheetHeader className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <SheetTitle className="text-2xl font-display flex items-center gap-2">
                  ${transaction.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  <Badge variant={transaction.riskLevel as any} className="ml-2">
                    {transaction.riskLevel.toUpperCase()} RISK
                  </Badge>
                </SheetTitle>
                <SheetDescription className="flex items-center gap-2 mt-1 tnum">
                  ID: {transaction.id}
                  <button className="text-muted-foreground hover:text-primary transition-colors">
                    <Copy className="h-3 w-3" />
                  </button>
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>
        </div>

        <div className="p-6 space-y-8 flex-1">
          {/* Why was this flagged? (Placeholder for ML Explanation) */}
          {isHighRisk && (
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-5">
              <h3 className="font-semibold text-destructive flex items-center gap-2 mb-3">
                <AlertCircle className="h-5 w-5" />
                Why was this flagged?
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex gap-2">
                  <span className="text-destructive font-bold">•</span>
                  <span><strong>Velocity Anomaly:</strong> 4th transaction attempt in 10 minutes from this device footprint.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-destructive font-bold">•</span>
                  <span><strong>Geo-Velocity:</strong> Impossible travel speed between IP location (Russia) and billing address (New York).</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-destructive font-bold">•</span>
                  <span><strong>Device Spoofing:</strong> Mismatch between user-agent OS and TCP fingerprint.</span>
                </li>
              </ul>
              <div className="mt-4 text-xs text-muted-foreground border-t border-destructive/10 pt-3">
                <ServerCrash className="h-3 w-3 inline mr-1" />
                ML Explanation Engine (Beta)
              </div>
            </div>
          )}

          {/* Customer Intelligence */}
          <div>
            <h3 className="font-display font-semibold text-lg border-b border-border pb-2 mb-4">Customer Intelligence</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium">{transaction.customer}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Account Age</p>
                <p className="font-medium tnum">14 Days</p>
              </div>
              <div>
                <p className="text-muted-foreground">Lifetime Value</p>
                <p className="font-medium tnum">$1,450.00</p>
              </div>
              <div>
                <p className="text-muted-foreground">Prior Chargebacks</p>
                <p className="font-medium text-destructive">2</p>
              </div>
            </div>
          </div>

          {/* Transaction Metadata */}
          <div>
            <h3 className="font-display font-semibold text-lg border-b border-border pb-2 mb-4">Transaction Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="col-span-2 sm:col-span-1">
                <p className="text-muted-foreground flex items-center gap-1.5"><CreditCard className="h-3.5 w-3.5"/> Payment Method</p>
                <p className="font-medium mt-1">{transaction.paymentMethod}</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-muted-foreground flex items-center gap-1.5"><Laptop2 className="h-3.5 w-3.5"/> Gateway / Merchant</p>
                <p className="font-medium mt-1">{transaction.merchant}</p>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground flex items-center gap-1.5"><Globe2 className="h-3.5 w-3.5"/> Timestamp</p>
                <p className="font-medium mt-1 tnum">
                  {new Date(transaction.date).toLocaleString([], { dateStyle: 'full', timeStyle: 'long' })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

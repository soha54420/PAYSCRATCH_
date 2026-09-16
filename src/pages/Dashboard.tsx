import { ArrowUpRight, ArrowDownRight, ShieldAlert } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockKPIs, mockTransactions } from "@/data/mockData"
import { Badge } from "@/components/ui/badge"

export function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Real-time transaction intelligence and fraud detection.
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {mockKPIs.map((kpi) => (
          <Card key={kpi.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {kpi.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-display tnum">
                {kpi.format === "currency" ? "$" : ""}
                {kpi.value}
                {kpi.format === "percentage" ? "%" : ""}
              </div>
              <p className="text-xs flex items-center mt-1">
                <span
                  className={`flex items-center font-medium ${
                    kpi.trend === "up" ? "text-emerald-600" : "text-rose-600"
                  }`}
                >
                  {kpi.trend === "up" ? (
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  )}
                  {kpi.change}%
                </span>
                <span className="text-muted-foreground ml-2">from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* High-Risk Flags */}
      <div className="space-y-4">
        <h2 className="text-lg font-display font-semibold flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-destructive" />
          Recent High-Risk Activity
        </h2>
        
        <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-surface-dim text-xs uppercase text-muted-foreground">
                <tr>
                  <th className="px-6 py-3 font-semibold">Transaction ID</th>
                  <th className="px-6 py-3 font-semibold">Time</th>
                  <th className="px-6 py-3 font-semibold">Customer</th>
                  <th className="px-6 py-3 font-semibold text-right">Amount</th>
                  <th className="px-6 py-3 font-semibold">Risk Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {mockTransactions
                  .filter((t) => t.riskLevel === "high" || t.riskLevel === "fraud")
                  .map((t) => (
                    <tr key={t.id} className="hover:bg-surface-dim/50 transition-colors">
                      <td className="px-6 py-4 font-medium tnum text-primary">{t.id}</td>
                      <td className="px-6 py-4 tnum text-muted-foreground">
                        {new Date(t.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="px-6 py-4">{t.customer}</td>
                      <td className="px-6 py-4 text-right tnum font-medium">
                        ${t.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={t.riskLevel === "fraud" ? "fraud" : "high"}>
                          {t.riskLevel.toUpperCase()}
                        </Badge>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

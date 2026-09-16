export interface KPI {
  id: string
  label: string
  value: string
  change: number
  trend: "up" | "down"
  format: "currency" | "number" | "percentage"
}

export interface Transaction {
  id: string
  date: string
  customer: string
  amount: number
  status: "completed" | "pending" | "failed"
  riskLevel: "low" | "medium" | "high" | "fraud"
  riskScore: number
  merchant: string
  paymentMethod: string
}

export const mockKPIs: KPI[] = [
  {
    id: "volume",
    label: "Total Processed Volume",
    value: "24.5M",
    change: 12.5,
    trend: "up",
    format: "currency",
  },
  {
    id: "fraud-rate",
    label: "Fraud Rate (30d)",
    value: "0.12",
    change: -0.04,
    trend: "down",
    format: "percentage",
  },
  {
    id: "active-alerts",
    label: "Active High-Risk Alerts",
    value: "14",
    change: 3,
    trend: "up",
    format: "number",
  },
  {
    id: "approval-rate",
    label: "Authorization Rate",
    value: "98.2",
    change: 0.1,
    trend: "up",
    format: "percentage",
  },
]

export const mockTransactions: Transaction[] = [
  {
    id: "TRX-893021",
    date: "2026-09-12T10:24:00Z",
    customer: "Acme Corp",
    amount: 14500.0,
    status: "completed",
    riskLevel: "low",
    riskScore: 12,
    merchant: "AWS Billing",
    paymentMethod: "•••• 4242",
  },
  {
    id: "TRX-893022",
    date: "2026-09-12T10:28:00Z",
    customer: "Stark Industries",
    amount: 850000.0,
    status: "pending",
    riskLevel: "high",
    riskScore: 89,
    merchant: "Unknown Entity",
    paymentMethod: "Wire Transfer",
  },
  {
    id: "TRX-893023",
    date: "2026-09-12T10:35:00Z",
    customer: "Wayne Enterprises",
    amount: 450.0,
    status: "completed",
    riskLevel: "low",
    riskScore: 8,
    merchant: "Office Supplies Inc",
    paymentMethod: "•••• 1234",
  },
  {
    id: "TRX-893024",
    date: "2026-09-12T11:02:00Z",
    customer: "Globex",
    amount: 25000.0,
    status: "failed",
    riskLevel: "fraud",
    riskScore: 98,
    merchant: "Crypto Exchange",
    paymentMethod: "•••• 5555",
  },
  {
    id: "TRX-893025",
    date: "2026-09-12T11:15:00Z",
    customer: "Umbrella Corp",
    amount: 3200.0,
    status: "completed",
    riskLevel: "medium",
    riskScore: 65,
    merchant: "BioTech Supplies",
    paymentMethod: "•••• 9876",
  },
]


import { User, Shield, SlidersHorizontal, Activity, Save } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Settings() {
  return (
    <div className="p-8 max-w-[1000px] mx-auto animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account and PayScratch workspace preferences.
        </p>
      </div>

      <div className="space-y-6">
        
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profile Information
            </CardTitle>
            <CardDescription>Update your personal account details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="Jane" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue="jane@payscratch.com" disabled />
              <p className="text-xs text-muted-foreground">Email changes require identity verification.</p>
            </div>
          </CardContent>
          <CardFooter className="border-t border-border pt-6 justify-end">
            <Button className="gap-2">
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </CardFooter>
        </Card>

        {/* Fraud Thresholds */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-primary" />
              Fraud Thresholds
            </CardTitle>
            <CardDescription>Configure auto-block and review criteria. (UI Preview)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label htmlFor="autoBlock" className="font-semibold text-base">Auto-Block Risk Score</Label>
                <span className="text-sm font-medium font-mono">85 - 100</span>
              </div>
              <p className="text-sm text-muted-foreground">Transactions scoring above this threshold will be immediately declined.</p>
              <input 
                id="autoBlock" 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="85" 
                className="w-full accent-destructive" 
              />
            </div>
            <div className="space-y-3 pt-4 border-t border-border">
              <div className="flex justify-between items-center">
                <Label htmlFor="manualReview" className="font-semibold text-base">Manual Review Risk Score</Label>
                <span className="text-sm font-medium font-mono">65 - 84</span>
              </div>
              <p className="text-sm text-muted-foreground">Transactions in this range are held for analyst review in the Alerts queue.</p>
              <input 
                id="manualReview" 
                type="range" 
                min="0" 
                max="100" 
                defaultValue="65" 
                className="w-full accent-amber-500" 
              />
            </div>
          </CardContent>
          <CardFooter className="border-t border-border pt-6 justify-end">
            <Button className="gap-2">
              <Save className="h-4 w-4" /> Save Thresholds
            </Button>
          </CardFooter>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Security Settings
            </CardTitle>
            <CardDescription>Manage your workspace security.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-surface-lowest">
              <div>
                <p className="font-medium text-foreground">Two-Factor Authentication (2FA)</p>
                <p className="text-sm text-muted-foreground mt-1">Requires an authenticator app for login.</p>
              </div>
              <Button variant="outline">Enable 2FA</Button>
            </div>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-surface-lowest">
              <div>
                <p className="font-medium text-foreground">Active Sessions</p>
                <p className="text-sm text-muted-foreground mt-1">Manage devices currently logged in.</p>
              </div>
              <Button variant="outline">View Sessions</Button>
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-500" />
              System Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-xs font-medium text-emerald-600 mb-1">API Status</p>
                <p className="text-lg font-bold text-emerald-700">Operational</p>
              </div>
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-xs font-medium text-emerald-600 mb-1">Model Inference</p>
                <p className="text-lg font-bold text-emerald-700">Operational</p>
              </div>
              <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <p className="text-xs font-medium text-emerald-600 mb-1">Database</p>
                <p className="text-lg font-bold text-emerald-700">Operational</p>
              </div>
              <div className="p-4 rounded-lg bg-surface-dim border border-border">
                <p className="text-xs font-medium text-muted-foreground mb-1">Version</p>
                <p className="text-lg font-bold text-foreground">v2.4.1 (Stable)</p>
              </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}

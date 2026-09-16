
import { Link, Outlet } from "react-router"
import { ShieldAlert } from "lucide-react"
import { Button } from "@/components/ui/button"

export function PublicLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/10">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-surface/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 text-primary transition-opacity hover:opacity-80">
            <ShieldAlert className="h-6 w-6" />
            <span className="font-display font-bold text-lg tracking-tight text-foreground">PayScratch</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Sign In
            </Link>
            <Button asChild size="sm">
              <Link to="/signup">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
    </div>
  )
}

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutGrid, List, Calendar, BarChart3, Bell, User } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="max-w-full mx-auto px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-bold text-xl text-foreground">
              FlowBoard
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" title="Notifications">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              Profile
            </Button>
          </div>
        </div>
        <nav className="flex gap-2 flex-wrap">
          <Link href="/board">
            <Button
              variant="ghost"
              className="gap-2"
              size="sm"
            >
              <LayoutGrid className="w-4 h-4" />
              Board
            </Button>
          </Link>
          <Link href="/list">
            <Button
              variant="ghost"
              className="gap-2"
              size="sm"
            >
              <List className="w-4 h-4" />
              List
            </Button>
          </Link>
          <Link href="/timeline">
            <Button
              variant="ghost"
              className="gap-2"
              size="sm"
            >
              <Calendar className="w-4 h-4" />
              Timeline
            </Button>
          </Link>
          <Link href="/rollup">
            <Button
              variant="ghost"
              className="gap-2"
              size="sm"
            >
              <BarChart3 className="w-4 h-4" />
              Rollup
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

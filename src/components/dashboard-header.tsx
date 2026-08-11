import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutGrid, List, Calendar } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="font-bold text-xl text-foreground">
            FlowBoard
          </Link>
          <div>
            <Button variant="ghost" size="sm">
              Profile
            </Button>
          </div>
        </div>
        <nav className="flex gap-2">
          <Link href="/(dashboard)/board">
            <Button
              variant="ghost"
              className="gap-2"
              size="sm"
            >
              <LayoutGrid className="w-4 h-4" />
              Board
            </Button>
          </Link>
          <Link href="/(dashboard)/list">
            <Button
              variant="ghost"
              className="gap-2"
              size="sm"
            >
              <List className="w-4 h-4" />
              List
            </Button>
          </Link>
          <Link href="/(dashboard)/timeline">
            <Button
              variant="ghost"
              className="gap-2"
              size="sm"
            >
              <Calendar className="w-4 h-4" />
              Timeline
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

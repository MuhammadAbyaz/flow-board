"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutGrid, List, Calendar, BarChart3 } from "lucide-react"

export function Sidebar() {
  const navItems = [
    { href: "/board", label: "Board", icon: LayoutGrid },
    { href: "/list", label: "List", icon: List },
    { href: "/timeline", label: "Timeline", icon: Calendar },
    { href: "/rollup", label: "Rollup", icon: BarChart3 },
  ]

  return (
    <aside className="w-64 bg-background border-r border-border h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="font-bold text-2xl text-foreground">FlowBoard</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3"
                size="lg"
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

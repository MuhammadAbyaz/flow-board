import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-foreground">
          FlowBoard
        </Link>
        <nav className="flex gap-4">
          <Link href="/(auth)/login">
            <Button variant="ghost">Log In</Button>
          </Link>
          <Link href="/(auth)/signup">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </div>
    </header>
  )
}

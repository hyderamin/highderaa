import Link from "next/link"
import { Train } from "lucide-react"

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Train className="h-6 w-6" />
            DB Delay Predictor
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/" className="hover:text-primary-foreground/80 transition-colors">
              Home
            </Link>
            <Link href="/about" className="hover:text-primary-foreground/80 transition-colors">
              About
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

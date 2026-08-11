import Link from "next/link"
import { LayoutGrid, Zap, PieChart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Header } from "@/components/header"

export default function Home() {
  const features = [
    {
      icon: LayoutGrid,
      title: "Multiple Views",
      description: "Track tasks across board, list, and timeline views to find the perfect perspective for your workflow.",
    },
    {
      icon: Zap,
      title: "Lightweight Automation",
      description: "Create custom workflows and auto-move tasks to keep your projects organized without the overhead.",
    },
    {
      icon: PieChart,
      title: "Manager Rollups",
      description: "Real-time rollup dashboards for cross-team project health and visibility across your organization.",
    },
  ]

  return (
    <>
      <Header />
      <main className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-24 md:py-32 lg:py-40">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-slate-800/20 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-slate-800/20 blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 text-white tracking-tight">
              FlowBoard
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-4 font-light">
              The lightweight alternative to heavyweight enterprise tools
            </p>
            <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
              Built for small-to-mid-size teams (10-200 people) to reduce status-update overhead and provide real-time project visibility.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/(auth)/signup">
                <Button size="lg" className="font-semibold px-8">
                  Get Started
                </Button>
              </Link>
              <Link href="/(auth)/login">
                <Button size="lg" variant="outline" className="font-semibold px-8">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Feature Highlights Section */}
        <section className="bg-slate-50 dark:bg-slate-900/50 px-4 py-24 md:py-32">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                Why Choose FlowBoard?
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Powerful features designed for modern teams
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <Card key={index} className="shadow-sm hover:shadow-md transition-shadow border-slate-200 dark:border-slate-800">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                          <IconComponent className="w-6 h-6 text-slate-900 dark:text-white" />
                        </div>
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-slate-600 dark:text-slate-400">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

import { MetricsDashboard } from '@/components/metrics-dashboard'

export default function RollupDashboard() {
  return (
    <div className="flex flex-col h-full">
      <div className="px-8 pt-8 pb-4">
        <h1 className="text-3xl font-bold mb-2">Project Metrics Dashboard</h1>
        <p className="text-muted-foreground">Real-time overview of project performance and task metrics</p>
      </div>
      <div className="flex-1 overflow-y-auto px-8 pb-8">
        <MetricsDashboard />
      </div>
    </div>
  )
}

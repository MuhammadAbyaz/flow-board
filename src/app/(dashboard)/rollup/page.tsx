import { MetricsDashboard } from '@/components/metrics-dashboard'

export default function RollupDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Project Metrics Dashboard</h1>
        <p className="text-gray-600 mt-2">Real-time overview of project performance and task metrics</p>
      </div>
      <MetricsDashboard />
    </div>
  )
}

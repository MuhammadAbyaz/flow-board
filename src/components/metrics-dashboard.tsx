'use client'

import { useEffect, useState } from 'react'
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/card'

interface SummaryMetrics {
  totalTasks: number
  completedTasks: number
  pendingTasks: number
  completionRate: number
}

interface StatusMetric {
  status: string
  count: number
}

interface PriorityMetric {
  priority: string
  count: number
}

interface AssigneeMetric {
  assignee: string
  count: number
}

interface TimelineMetric {
  date: string
  created: number
  completed: number
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

export function MetricsDashboard() {
  const [summary, setSummary] = useState<SummaryMetrics | null>(null)
  const [statusData, setStatusData] = useState<StatusMetric[]>([])
  const [priorityData, setPriorityData] = useState<PriorityMetric[]>([])
  const [assigneeData, setAssigneeData] = useState<AssigneeMetric[]>([])
  const [timelineData, setTimelineData] = useState<TimelineMetric[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchMetrics() {
      try {
        setLoading(true)
        const [summaryRes, statusRes, priorityRes, assigneeRes, timelineRes] = await Promise.all([
          fetch('/api/v1/metrics/summary'),
          fetch('/api/v1/metrics/by-status'),
          fetch('/api/v1/metrics/by-priority'),
          fetch('/api/v1/metrics/by-assignee'),
          fetch('/api/v1/metrics/timeline')
        ])

        if (!summaryRes.ok || !statusRes.ok || !priorityRes.ok || !assigneeRes.ok || !timelineRes.ok) {
          throw new Error('Failed to fetch metrics')
        }

        const [summaryData, statusDataArray, priorityDataArray, assigneeDataArray, timelineDataArray] = await Promise.all([
          summaryRes.json(),
          statusRes.json(),
          priorityRes.json(),
          assigneeRes.json(),
          timelineRes.json()
        ])

        setSummary(summaryData)
        setStatusData(statusDataArray)
        setPriorityData(priorityDataArray)
        setAssigneeData(assigneeDataArray)
        setTimelineData(timelineDataArray)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch metrics')
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [])

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading metrics...</div>
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">Error: {error}</div>
  }

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600">Total Tasks</div>
          <div className="text-3xl font-bold text-blue-600 mt-2">{summary?.totalTasks || 0}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600">Completed</div>
          <div className="text-3xl font-bold text-green-600 mt-2">{summary?.completedTasks || 0}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600">Pending</div>
          <div className="text-3xl font-bold text-orange-600 mt-2">{summary?.pendingTasks || 0}</div>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium text-gray-600">Completion Rate</div>
          <div className="text-3xl font-bold text-purple-600 mt-2">{summary?.completionRate || 0}%</div>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks by Status */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Tasks by Status</h3>
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="status" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-gray-400 py-8">No data available</div>
          )}
        </Card>

        {/* Tasks by Priority */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Tasks by Priority</h3>
          {priorityData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
                    const item = priorityData[index]
                    return `${item.priority}: ${item.count}`
                  }}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {priorityData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center text-gray-400 py-8">No data available</div>
          )}
        </Card>
      </div>

      {/* Tasks by Assignee */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Tasks by Assignee</h3>
        {assigneeData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={assigneeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="assignee" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-gray-400 py-8">No tasks assigned</div>
        )}
      </Card>

      {/* Task Creation Timeline */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Task Activity (Last 30 Days)</h3>
        {timelineData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timelineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="created"
                stroke="#3b82f6"
                name="Created"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#10b981"
                name="Completed"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-center text-gray-400 py-8">No activity data</div>
        )}
      </Card>
    </div>
  )
}

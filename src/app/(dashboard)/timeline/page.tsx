"use client"

import { useEffect, useState } from "react"
import { TaskForm } from "@/components/task-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2 } from "lucide-react"

interface Task {
  id: number
  title: string
  description?: string
  status: string
  priority: string
  dueDate?: string
  creator: { id: number; name?: string; email: string }
  assignedTo?: { id: number; name?: string; email: string } | null
}

export default function TimelineView() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [creatorId] = useState(1)

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/v1/tasks")
      if (response.ok) {
        const data = await response.json()
        setTasks(data.filter((t: Task) => t.dueDate))
      }
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleDelete = async (taskId: number) => {
    if (!confirm("Are you sure you want to delete this task?")) return

    try {
      const response = await fetch(`/api/v1/tasks/${taskId}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchTasks()
      }
    } catch (error) {
      console.error("Failed to delete task:", error)
    }
  }

  const sortedTasks = [...tasks].sort((a, b) => {
    if (!a.dueDate || !b.dueDate) return 0
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  })

  const groupedByDate = sortedTasks.reduce(
    (acc, task) => {
      if (!task.dueDate) return acc
      const date = new Date(task.dueDate).toLocaleDateString()
      if (!acc[date]) acc[date] = []
      acc[date].push(task)
      return acc
    },
    {} as Record<string, Task[]>
  )

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      todo: "border-gray-300 bg-gray-50",
      "in-progress": "border-blue-300 bg-blue-50",
      done: "border-green-300 bg-green-50",
      blocked: "border-red-300 bg-red-50",
    }
    return colors[status] || colors.todo
  }

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: "text-gray-600",
      medium: "text-yellow-600",
      high: "text-orange-600",
      urgent: "text-red-600",
    }
    return colors[priority] || colors.medium
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-8 pt-8 pb-4">
        <h1 className="text-3xl font-bold mb-2">Timeline View</h1>
        <p className="text-muted-foreground mb-6">Track tasks by their due dates</p>
      </div>

      <div className="px-8 pb-6">
        <TaskForm creatorId={creatorId} onTaskCreated={fetchTasks} />
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Loading tasks...</p>
          </div>
        ) : Object.keys(groupedByDate).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tasks with due dates. Create one to get started!</p>
          </div>
        ) : (
          <div className="space-y-8 max-w-4xl">
            {Object.entries(groupedByDate).map(([date, dateTasks]) => {
              const isPast = new Date(date) < new Date()
              const isToday =
                new Date(date).toLocaleDateString() === new Date().toLocaleDateString()

              return (
                <div key={date}>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className={`px-4 py-2 rounded-lg font-semibold text-sm ${
                        isPast && !isToday
                          ? "bg-muted text-muted-foreground"
                          : isToday
                            ? "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isToday ? "Today" : isPast ? "Past Due" : date}
                    </div>
                    <span className="text-sm text-muted-foreground">{dateTasks.length} task{dateTasks.length !== 1 ? 's' : ''}</span>
                  </div>

                  <div className="space-y-3">
                    {dateTasks.map((task) => (
                      <Card
                        key={task.id}
                        className="border-l-4 cursor-pointer hover:shadow-md transition-shadow"
                      >
                        <CardHeader className="pb-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <CardTitle className="text-base">{task.title}</CardTitle>
                              {task.description && (
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                  {task.description}
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => handleDelete(task.id)}
                              className="p-1 hover:bg-muted rounded"
                            >
                              <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                            </button>
                          </div>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-3">
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(task.status)}`}
                            >
                              {task.status}
                            </span>
                            <span className={`text-xs font-semibold ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                          {task.assignedTo && (
                            <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                              {task.assignedTo.name || task.assignedTo.email}
                            </span>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

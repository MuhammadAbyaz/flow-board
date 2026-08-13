"use client"

import { useEffect, useState } from "react"
import { TaskForm } from "@/components/task-form"
import { Button } from "@/components/ui/button"
import { Trash2, Edit2 } from "lucide-react"

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

const statusOptions = ["todo", "in-progress", "done", "blocked"]
const priorityOptions = ["low", "medium", "high", "urgent"]

export default function ListView() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [creatorId] = useState(1)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editStatus, setEditStatus] = useState("")

  const fetchTasks = async () => {
    try {
      const response = await fetch("/api/v1/tasks")
      if (response.ok) {
        const data = await response.json()
        setTasks(data)
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

  const handleStatusChange = async (taskId: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/v1/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        fetchTasks()
        setEditingId(null)
      }
    } catch (error) {
      console.error("Failed to update task:", error)
    }
  }

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

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      low: "text-gray-500",
      medium: "text-yellow-600",
      high: "text-orange-600",
      urgent: "text-red-600",
    }
    return colors[priority] || colors.medium
  }

  const getStatusBgColor = (status: string) => {
    const colors: Record<string, string> = {
      todo: "bg-gray-100 text-gray-800",
      "in-progress": "bg-blue-100 text-blue-800",
      done: "bg-green-100 text-green-800",
      blocked: "bg-red-100 text-red-800",
    }
    return colors[status] || colors.todo
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-8 pt-8 pb-4">
        <h1 className="text-3xl font-bold mb-2">List View</h1>
        <p className="text-muted-foreground mb-6">All your tasks in one place</p>
      </div>

      <div className="px-8 pb-6">
        <TaskForm creatorId={creatorId} onTaskCreated={fetchTasks} />
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tasks yet. Create one to get started!</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left font-semibold">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {tasks.map((task) => (
                  <tr key={task.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4 font-medium max-w-xs truncate">
                      {task.title}
                    </td>
                    <td className="px-6 py-4">
                      {editingId === task.id ? (
                        <select
                          value={editStatus}
                          onChange={(e) => handleStatusChange(task.id, e.target.value)}
                          className="px-2 py-1 border border-border rounded text-sm bg-background"
                        >
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBgColor(task.status)}`}>
                          {task.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-semibold ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {task.assignedTo ? task.assignedTo.name || task.assignedTo.email : "-"}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setEditingId(task.id)
                            setEditStatus(task.status)
                          }}
                          className="p-1 hover:bg-muted rounded"
                        >
                          <Edit2 className="w-4 h-4 text-muted-foreground" />
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          className="p-1 hover:bg-muted rounded"
                        >
                          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

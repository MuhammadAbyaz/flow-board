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
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-2">List View</h1>
      <p className="text-gray-600 mb-8">All your tasks in one place</p>

      <div className="mb-8">
        <TaskForm creatorId={creatorId} onTaskCreated={fetchTasks} />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">Loading tasks...</p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No tasks yet. Create one to get started!</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Assigned To
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {tasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium max-w-xs truncate">
                    {task.title}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {editingId === task.id ? (
                      <select
                        value={editStatus}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-sm"
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
                  <td className="px-6 py-4 text-sm">
                    <span className={`font-semibold ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {task.assignedTo ? task.assignedTo.name || task.assignedTo.email : "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingId(task.id)
                          setEditStatus(task.status)
                        }}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Edit2 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(task.id)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-gray-600 hover:text-red-600" />
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
  )
}

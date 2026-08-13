"use client"

import { useEffect, useState } from "react"
import { TaskCard } from "@/components/task-card"
import { TaskForm } from "@/components/task-form"

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

const columns = [
  { id: "todo", label: "To Do", color: "bg-gray-50" },
  { id: "in-progress", label: "In Progress", color: "bg-blue-50" },
  { id: "done", label: "Done", color: "bg-green-50" },
  { id: "blocked", label: "Blocked", color: "bg-red-50" },
]

export default function BoardView() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [creatorId] = useState(1)

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
      }
    } catch (error) {
      console.error("Failed to update task:", error)
    }
  }

  const handleDelete = () => {
    fetchTasks()
  }

  const getTasksByStatus = (status: string) => tasks.filter((task) => task.status === status)

  return (
    <div className="flex flex-col h-full">
      <div className="px-8 pt-8 pb-4">
        <h1 className="text-3xl font-bold mb-2">Kanban Board</h1>
        <p className="text-muted-foreground mb-6">Manage your tasks across different statuses</p>
      </div>

      <div className="px-8 pb-6">
        <TaskForm creatorId={creatorId} onTaskCreated={fetchTasks} />
      </div>

      <div className="flex-1 overflow-y-auto px-8 pb-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Loading tasks...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-max">
            {columns.map((column) => (
              <div key={column.id} className="flex flex-col">
                <div className="bg-muted rounded-lg p-4 mb-4">
                  <h2 className="font-semibold text-base">
                    {column.label} <span className="text-muted-foreground">({getTasksByStatus(column.id).length})</span>
                  </h2>
                </div>
                <div className="space-y-3">
                  {getTasksByStatus(column.id).map((task) => (
                    <div key={task.id} onClick={() => handleStatusChange(task.id, column.id)}>
                      <TaskCard
                        task={task}
                        onDelete={handleDelete}
                        onStatusChange={() => handleStatusChange(task.id, column.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

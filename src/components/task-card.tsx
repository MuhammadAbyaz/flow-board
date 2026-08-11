"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
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

interface TaskCardProps {
  task: Task
  onAssignClick?: () => void
  onDelete?: () => void
  onStatusChange?: (newStatus: string) => void
}

const statusColors: Record<string, string> = {
  todo: "bg-gray-100 text-gray-800",
  "in-progress": "bg-blue-100 text-blue-800",
  done: "bg-green-100 text-green-800",
  blocked: "bg-red-100 text-red-800",
}

const priorityColors: Record<string, string> = {
  low: "text-gray-500",
  medium: "text-yellow-500",
  high: "text-orange-500",
  urgent: "text-red-500",
}

export function TaskCard({ task, onAssignClick, onDelete, onStatusChange }: TaskCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this task?")) return
    setIsDeleting(true)

    try {
      const response = await fetch(`/api/v1/tasks/${task.id}`, { method: "DELETE" })
      if (response.ok) {
        onDelete?.()
      }
    } catch (error) {
      console.error("Failed to delete task:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base line-clamp-2">{task.title}</CardTitle>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {task.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{task.description}</p>
        )}

        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs px-2 py-1 rounded-full ${statusColors[task.status] || statusColors.todo}`}>
            {task.status}
          </span>
          <span className={`text-xs font-semibold ${priorityColors[task.priority] || priorityColors.medium}`}>
            {task.priority}
          </span>
        </div>

        {task.dueDate && (
          <p className="text-xs text-gray-500">
            Due: {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}

        <div className="pt-2 border-t space-y-2">
          <p className="text-xs text-gray-600">
            Created by: {task.creator.name || task.creator.email}
          </p>
          {task.assignedTo ? (
            <p className="text-xs font-medium text-blue-600">
              Assigned to: {task.assignedTo.name || task.assignedTo.email}
            </p>
          ) : (
            <Button
              size="sm"
              variant="outline"
              className="w-full text-xs"
              onClick={onAssignClick}
            >
              Assign Task
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

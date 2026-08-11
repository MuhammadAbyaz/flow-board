interface Task {
  id: number;
  title: string;
  status: string;
  list_id: number;
  description: string;
  assignee_id: number | null;
  priority: string;
  created_at: Date;
  updated_at: Date;
}

export function autoMoveTask(task: Task, newStatus: string): Task {
  // Map status to list_id
  const statusToListMap: Record<string, number> = {
    pending: 1,
    in_progress: 2,
    completed: 3,
    archived: 4,
  };

  const newListId = statusToListMap[newStatus] || task.list_id;

  return {
    ...task,
    status: newStatus,
    list_id: newListId,
  };
}

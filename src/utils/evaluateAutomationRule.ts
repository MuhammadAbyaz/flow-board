interface Task {
  id: string;
  title: string;
  status: string;
  completedAt?: string | null;
  listId?: string;
  dueDate?: string | null;
  [key: string]: unknown;
}

interface AutomationRule {
  id: string;
  name: string;
  trigger: {
    type: 'status_change';
    fromStatus?: string;
    toStatus: string;
  };
  actions: Array<{
    type: 'set_completion_date' | 'move_to_list' | 'set_due_date';
    value?: string | Date;
  }>;
}

export function evaluateAutomationRule(task: Task, rule: AutomationRule): Task {
  if (rule.trigger.type !== 'status_change') {
    return task;
  }

  if (task.status !== rule.trigger.toStatus) {
    return task;
  }

  let updatedTask: Task = { ...task };

  for (const action of rule.actions) {
    switch (action.type) {
      case 'set_completion_date':
        updatedTask.completedAt = new Date().toISOString();
        break;

      case 'move_to_list':
        if (action.value) {
          updatedTask.listId = String(action.value);
        }
        break;

      case 'set_due_date':
        if (action.value) {
          updatedTask.dueDate = String(action.value);
        }
        break;
    }
  }

  return updatedTask;
}

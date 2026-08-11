import { describe, it, expect } from 'vitest';
import { evaluateAutomationRule } from '@/utils/evaluateAutomationRule';

interface Task {
  id: string;
  title: string;
  status: string;
  completedAt?: string | null;
  listId?: string;
  dueDate?: string | null;
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

describe('evaluateAutomationRule', () => {
  it('should set completion date when task status changes to Done', () => {
    const task: Task = {
      id: '1',
      title: 'Complete project',
      status: 'Done',
    };

    const rule: AutomationRule = {
      id: 'rule-1',
      name: 'Auto-complete on Done',
      trigger: {
        type: 'status_change',
        toStatus: 'Done',
      },
      actions: [
        {
          type: 'set_completion_date',
        },
      ],
    };

    const result = evaluateAutomationRule(task, rule);

    expect(result.status).toBe('Done');
    expect(result.completedAt).toBeTruthy();
    expect(typeof result.completedAt).toBe('string');
  });

  it('should move task to a new list when status changes', () => {
    const task: Task = {
      id: '2',
      title: 'Review changes',
      status: 'In Review',
      listId: 'list-1',
    };

    const rule: AutomationRule = {
      id: 'rule-2',
      name: 'Move to Done list',
      trigger: {
        type: 'status_change',
        toStatus: 'In Review',
      },
      actions: [
        {
          type: 'move_to_list',
          value: 'list-done',
        },
      ],
    };

    const result = evaluateAutomationRule(task, rule);

    expect(result.listId).toBe('list-done');
    expect(result.status).toBe('In Review');
  });

  it('should apply multiple actions in sequence', () => {
    const task: Task = {
      id: '3',
      title: 'Finish feature',
      status: 'Done',
    };

    const rule: AutomationRule = {
      id: 'rule-3',
      name: 'Complete and move to archive',
      trigger: {
        type: 'status_change',
        toStatus: 'Done',
      },
      actions: [
        {
          type: 'set_completion_date',
        },
        {
          type: 'move_to_list',
          value: 'list-archive',
        },
      ],
    };

    const result = evaluateAutomationRule(task, rule);

    expect(result.status).toBe('Done');
    expect(result.completedAt).toBeTruthy();
    expect(result.listId).toBe('list-archive');
  });

  it('should not modify task if trigger status does not match', () => {
    const task: Task = {
      id: '4',
      title: 'Pending task',
      status: 'Todo',
      listId: 'list-1',
    };

    const rule: AutomationRule = {
      id: 'rule-4',
      name: 'Only applies on Done',
      trigger: {
        type: 'status_change',
        toStatus: 'Done',
      },
      actions: [
        {
          type: 'set_completion_date',
        },
      ],
    };

    const result = evaluateAutomationRule(task, rule);

    expect(result.completedAt).toBeUndefined();
    expect(result.status).toBe('Todo');
    expect(result.listId).toBe('list-1');
  });

  it('should set due date if specified in action', () => {
    const task: Task = {
      id: '5',
      title: 'Urgent task',
      status: 'In Progress',
    };

    const dueDate = '2026-12-31';

    const rule: AutomationRule = {
      id: 'rule-5',
      name: 'Set deadline for in-progress tasks',
      trigger: {
        type: 'status_change',
        toStatus: 'In Progress',
      },
      actions: [
        {
          type: 'set_due_date',
          value: dueDate,
        },
      ],
    };

    const result = evaluateAutomationRule(task, rule);

    expect(result.dueDate).toBe(dueDate);
    expect(result.status).toBe('In Progress');
  });

  it('should return original task if no actions match', () => {
    const task: Task = {
      id: '6',
      title: 'Simple task',
      status: 'Todo',
    };

    const rule: AutomationRule = {
      id: 'rule-6',
      name: 'Empty actions',
      trigger: {
        type: 'status_change',
        toStatus: 'Todo',
      },
      actions: [],
    };

    const result = evaluateAutomationRule(task, rule);

    expect(result).toEqual(task);
  });
});

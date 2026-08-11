import { describe, it, expect } from 'vitest';
import { autoMoveTask } from './auto-move-task';

describe('autoMoveTask', () => {
  it('should move a task to the appropriate list based on status change', () => {
    const task = {
      id: 1,
      title: 'Test Task',
      status: 'pending',
      list_id: 1,
      description: '',
      assignee_id: null,
      priority: 'medium',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const newStatus = 'in_progress';
    const result = autoMoveTask(task, newStatus);

    expect(result.status).toBe('in_progress');
    expect(result.list_id).toBeDefined();
  });

  it('should handle task completion and move to done list', () => {
    const task = {
      id: 2,
      title: 'Complete Task',
      status: 'in_progress',
      list_id: 2,
      description: '',
      assignee_id: null,
      priority: 'high',
      created_at: new Date(),
      updated_at: new Date(),
    };

    const newStatus = 'completed';
    const result = autoMoveTask(task, newStatus);

    expect(result.status).toBe('completed');
    expect(result.list_id).toBeDefined();
    expect(result.list_id).not.toBe(task.list_id);
  });

  it('should preserve other task properties when moving', () => {
    const task = {
      id: 3,
      title: 'Preserve Props Task',
      status: 'pending',
      list_id: 1,
      description: 'Test description',
      assignee_id: 5,
      priority: 'low',
      created_at: new Date('2026-01-01'),
      updated_at: new Date('2026-01-01'),
    };

    const newStatus = 'in_progress';
    const result = autoMoveTask(task, newStatus);

    expect(result.title).toBe(task.title);
    expect(result.description).toBe(task.description);
    expect(result.assignee_id).toBe(task.assignee_id);
    expect(result.priority).toBe(task.priority);
  });
});

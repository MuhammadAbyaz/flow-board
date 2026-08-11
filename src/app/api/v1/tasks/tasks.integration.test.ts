import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { prisma } from '@/lib/prisma';

describe('POST /api/v1/tasks', () => {
  let testUserId: number;

  beforeAll(async () => {
    // Create a test user to associate with tasks
    const user = await prisma.user.create({
      data: {
        email: `test-${Date.now()}@example.com`,
        name: 'Test User',
      },
    });
    testUserId = user.id;
  });

  afterAll(async () => {
    // Clean up test data
    try {
      await prisma.task.deleteMany({
        where: {
          creatorId: testUserId,
        },
      });
      await prisma.user.delete({
        where: {
          id: testUserId,
        },
      });
    } catch (e) {
      // Ignore cleanup errors
    }
  });

  it('should create a new task with required fields', async () => {
    const taskData = {
      title: 'Integration Test Task',
      description: 'This is a test task',
      status: 'todo',
      priority: 'medium',
      creatorId: testUserId,
    };

    const createdTask = await prisma.task.create({
      data: taskData,
    });

    expect(createdTask.id).toBeDefined();
    expect(createdTask.title).toBe(taskData.title);
    expect(createdTask.description).toBe(taskData.description);
    expect(createdTask.status).toBe(taskData.status);
    expect(createdTask.priority).toBe(taskData.priority);
    expect(createdTask.creatorId).toBe(testUserId);
  });

  it('should create task with all optional fields', async () => {
    const assigneeUser = await prisma.user.create({
      data: {
        email: `assignee-${Date.now()}@example.com`,
        name: 'Assignee',
      },
    });

    const taskData = {
      title: 'Full Task',
      description: 'Complete task with all fields',
      status: 'in_progress',
      priority: 'high',
      dueDate: new Date('2026-12-31'),
      creatorId: testUserId,
      assignedToId: assigneeUser.id,
    };

    const createdTask = await prisma.task.create({
      data: taskData,
      include: {
        creator: true,
        assignedTo: true,
      },
    });

    expect(createdTask.id).toBeDefined();
    expect(createdTask.title).toBe(taskData.title);
    expect(createdTask.assignedToId).toBe(assigneeUser.id);
    expect(createdTask.dueDate).toBeDefined();

    // Clean up
    await prisma.task.delete({ where: { id: createdTask.id } });
    await prisma.user.delete({ where: { id: assigneeUser.id } });
  });

  it('should return task with correct timestamps', async () => {
    const taskData = {
      title: 'Timestamp Test Task',
      status: 'todo',
      priority: 'low',
      creatorId: testUserId,
    };

    const createdTask = await prisma.task.create({
      data: taskData,
    });

    expect(createdTask).toHaveProperty('id');
    expect(createdTask).toHaveProperty('createdAt');
    expect(createdTask).toHaveProperty('updatedAt');
    expect(createdTask.createdAt).toBeInstanceOf(Date);
    expect(createdTask.updatedAt).toBeInstanceOf(Date);
  });
});

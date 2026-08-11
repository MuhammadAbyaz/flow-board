import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const assignedTasks = await prisma.task.groupBy({
      by: ['assignedToId'],
      _count: true,
      orderBy: {
        _count: {
          id: 'desc'
        }
      }
    })

    const assigneeIds = assignedTasks
      .map(item => item.assignedToId)
      .filter((id) => id !== null) as number[]

    const users = assigneeIds.length > 0
      ? await prisma.user.findMany({
          where: { id: { in: assigneeIds } },
          select: { id: true, name: true, email: true }
        })
      : []

    const userMap = new Map(users.map(u => [u.id, u.name || u.email]))

    const data = assignedTasks
      .filter(item => item.assignedToId !== null)
      .map(item => ({
        assignee: userMap.get(item.assignedToId!) || 'Unknown',
        count: item._count
      }))

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch assignee metrics' }, { status: 500 })
  }
}

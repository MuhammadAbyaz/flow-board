import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Get tasks from the last 30 days
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const tasks = await prisma.task.findMany({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      },
      select: {
        createdAt: true,
        status: true
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    // Group by date
    const groupedByDate: Record<string, { created: number; completed: number }> = {}

    tasks.forEach(task => {
      const date = task.createdAt.toISOString().split('T')[0]
      if (!groupedByDate[date]) {
        groupedByDate[date] = { created: 0, completed: 0 }
      }
      groupedByDate[date].created += 1
      if (task.status === 'done') {
        groupedByDate[date].completed += 1
      }
    })

    const data = Object.entries(groupedByDate)
      .sort(([dateA], [dateB]) => dateA.localeCompare(dateB))
      .map(([date, metrics]) => ({
        date,
        ...metrics
      }))

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch timeline metrics' }, { status: 500 })
  }
}

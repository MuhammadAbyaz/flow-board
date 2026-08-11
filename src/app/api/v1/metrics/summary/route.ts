import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const totalTasks = await prisma.task.count()
    const completedTasks = await prisma.task.count({
      where: { status: 'done' }
    })

    const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100)

    return NextResponse.json({
      totalTasks,
      completedTasks,
      pendingTasks: totalTasks - completedTasks,
      completionRate
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch metrics' }, { status: 500 })
  }
}

import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const tasks = await prisma.task.groupBy({
      by: ['priority'],
      _count: true,
      orderBy: {
        priority: 'asc'
      }
    })

    const data = tasks.map(item => ({
      priority: item.priority,
      count: item._count
    }))

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch priority metrics' }, { status: 500 })
  }
}

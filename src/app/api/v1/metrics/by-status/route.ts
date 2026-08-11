import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const tasks = await prisma.task.groupBy({
      by: ['status'],
      _count: true,
      orderBy: {
        status: 'asc'
      }
    })

    const data = tasks.map(item => ({
      status: item.status,
      count: item._count
    }))

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch status metrics' }, { status: 500 })
  }
}

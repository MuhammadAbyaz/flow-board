import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        creator: true,
        assignedTo: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return NextResponse.json(tasks)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, status, priority, dueDate, creatorId, assignedToId } = body

    if (!title || !creatorId) {
      return NextResponse.json({ error: "Title and creatorId are required" }, { status: 400 })
    }

    const task = await prisma.task.create({
      data: {
        title,
        description: description || null,
        status: status || "todo",
        priority: priority || "medium",
        dueDate: dueDate ? new Date(dueDate) : null,
        creatorId,
        assignedToId: assignedToId || null,
      },
      include: {
        creator: true,
        assignedTo: true,
      },
    })

    return NextResponse.json(task, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
  }
}

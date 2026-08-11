import { NextRequest, NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const taskId = parseInt(id)
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      include: {
        creator: true,
        assignedTo: true,
      },
    })

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 })
    }

    return NextResponse.json(task)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const taskId = parseInt(id)
    const body = await request.json()
    const { title, description, status, priority, dueDate, assignedToId } = body

    const task = await prisma.task.update({
      where: { id: taskId },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(status && { status }),
        ...(priority && { priority }),
        ...(dueDate && { dueDate: new Date(dueDate) }),
        ...(assignedToId !== undefined && { assignedToId }),
      },
      include: {
        creator: true,
        assignedTo: true,
      },
    })

    return NextResponse.json(task)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const taskId = parseInt(id)
    await prisma.task.delete({
      where: { id: taskId },
    })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 })
  }
}

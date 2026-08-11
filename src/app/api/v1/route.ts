import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: "Flow Board API v1",
    version: "1.0.0",
    endpoints: {
      tasks: "/api/v1/tasks",
      workflows: "/api/v1/workflows",
      notifications: "/api/v1/notifications",
    },
  })
}

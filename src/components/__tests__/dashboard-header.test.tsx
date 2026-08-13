import { render, screen } from "@testing-library/react"
import { DashboardHeader } from "../dashboard-header"
import { describe, it, expect } from "vitest"

describe("DashboardHeader", () => {
  it("renders header with FlowBoard branding", () => {
    render(<DashboardHeader />)
    const branding = screen.getByText("FlowBoard")
    expect(branding).toBeInTheDocument()
  })

  it("renders navigation links for core views", () => {
    render(<DashboardHeader />)
    expect(screen.getByText("Board")).toBeInTheDocument()
    expect(screen.getByText("List")).toBeInTheDocument()
    expect(screen.getByText("Timeline")).toBeInTheDocument()
  })

  it("renders user profile button", () => {
    render(<DashboardHeader />)
    const profileButton = screen.getByRole("button", { name: /profile/i })
    expect(profileButton).toBeInTheDocument()
  })

  it("renders header element semantically", () => {
    const { container } = render(<DashboardHeader />)
    const header = container.querySelector("header")
    expect(header).toBeInTheDocument()
  })

  it("renders navigation as a logical section", () => {
    const { container } = render(<DashboardHeader />)
    const nav = container.querySelector("nav")
    expect(nav).toBeInTheDocument()
  })
})

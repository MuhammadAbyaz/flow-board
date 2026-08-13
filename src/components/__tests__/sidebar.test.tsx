import { render, screen } from "@testing-library/react"
import { Sidebar } from "../sidebar"
import { describe, it, expect } from "vitest"

describe("Sidebar", () => {
  it("renders sidebar with FlowBoard branding", () => {
    render(<Sidebar />)
    const branding = screen.getByText("FlowBoard")
    expect(branding).toBeInTheDocument()
  })

  it("renders navigation links for all core views", () => {
    render(<Sidebar />)
    expect(screen.getByText("Board")).toBeInTheDocument()
    expect(screen.getByText("List")).toBeInTheDocument()
    expect(screen.getByText("Timeline")).toBeInTheDocument()
    expect(screen.getByText("Rollup")).toBeInTheDocument()
  })

  it("renders sidebar as a persistent navigation element", () => {
    const { container } = render(<Sidebar />)
    const sidebar = container.querySelector("aside")
    expect(sidebar).toBeInTheDocument()
  })

  it("renders navigation links with correct href attributes", () => {
    render(<Sidebar />)
    const boardLink = screen.getByRole("link", { name: /board/i })
    const listLink = screen.getByRole("link", { name: /list/i })
    const timelineLink = screen.getByRole("link", { name: /timeline/i })
    const rollupLink = screen.getByRole("link", { name: /rollup/i })

    expect(boardLink).toHaveAttribute("href", "/board")
    expect(listLink).toHaveAttribute("href", "/list")
    expect(timelineLink).toHaveAttribute("href", "/timeline")
    expect(rollupLink).toHaveAttribute("href", "/rollup")
  })
})

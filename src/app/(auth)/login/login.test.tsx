import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import LoginPage from './page'

describe('LoginPage', () => {
  it('should render the login form', () => {
    render(<LoginPage />)
    const heading = screen.getByRole('heading', { name: /sign in/i })
    expect(heading).toBeInTheDocument()
  })

  it('should render email input field', () => {
    render(<LoginPage />)
    const emailInput = screen.getByPlaceholderText(/email/i)
    expect(emailInput).toBeInTheDocument()
  })

  it('should render password input field', () => {
    render(<LoginPage />)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    expect(passwordInput).toBeInTheDocument()
  })

  it('should render SSO button', () => {
    render(<LoginPage />)
    const ssoButton = screen.getByRole('button', { name: /continue with sso/i })
    expect(ssoButton).toBeInTheDocument()
  })

  it('should render OAuth button', () => {
    render(<LoginPage />)
    const oauthButton = screen.getByRole('button', { name: /continue with oauth/i })
    expect(oauthButton).toBeInTheDocument()
  })
})

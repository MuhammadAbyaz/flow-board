import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import SignupPage from './page'

describe('SignupPage', () => {
  it('should render the signup form', () => {
    render(<SignupPage />)
    const heading = screen.getByRole('heading', { name: /sign up/i })
    expect(heading).toBeInTheDocument()
  })

  it('should render email input field', () => {
    render(<SignupPage />)
    const emailInput = screen.getByPlaceholderText(/email/i)
    expect(emailInput).toBeInTheDocument()
  })

  it('should render password input field', () => {
    render(<SignupPage />)
    const passwordInput = screen.getByPlaceholderText(/password/i)
    expect(passwordInput).toBeInTheDocument()
  })

  it('should render SSO button', () => {
    render(<SignupPage />)
    const ssoButton = screen.getByRole('button', { name: /continue with sso/i })
    expect(ssoButton).toBeInTheDocument()
  })

  it('should render OAuth button', () => {
    render(<SignupPage />)
    const oauthButton = screen.getByRole('button', { name: /continue with oauth/i })
    expect(oauthButton).toBeInTheDocument()
  })
})

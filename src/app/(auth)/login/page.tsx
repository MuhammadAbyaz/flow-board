'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <h1 className="mb-6 text-2xl font-bold">Sign In</h1>

        <form className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="password"
              className="w-full rounded-md border border-gray-300 px-3 py-2"
            />
          </div>

          <Button className="w-full" type="submit">
            Sign In
          </Button>
        </form>

        <div className="mt-6 space-y-3">
          <Button className="w-full" variant="outline">
            Continue with SSO (SAML)
          </Button>
          <Button className="w-full" variant="outline">
            Continue with OAuth
          </Button>
        </div>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </a>
        </p>
      </Card>
    </div>
  )
}

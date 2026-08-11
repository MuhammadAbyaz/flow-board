import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  // Configure providers: OAuth 2.0, SAML, etc.
  providers: [
    // OAuth 2.0 providers to be configured
    // SAML provider to be configured
  ],
  pages: {
    signIn: "/signin",
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

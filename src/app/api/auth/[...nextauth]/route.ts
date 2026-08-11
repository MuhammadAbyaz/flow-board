import NextAuth from "next-auth"
import type { NextAuthOptions } from "next-auth"

const authOptions: NextAuthOptions = {
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

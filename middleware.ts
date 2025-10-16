// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''

  // Split the host into parts
  const parts = host.split('.')

  // If it's localhost (dev), handle accordingly
  const isLocalhost = host.includes('localhost')

  if (isLocalhost) {
    // Example: kb123.localhost:3000 -> ["kb123", "localhost:3000"]
    // For localhost, the subdomain is the first part before '.localhost'
    const subdomain = parts.length > 1 ? parts[0] : null

    if (subdomain && subdomain !== 'www') {
      return NextResponse.redirect(new URL('/', req.url))
    }
    return NextResponse.next()
  }

  // Production case: check subdomain
  // e.g. kb123.rhinon.help -> ["kb123", "rhinon", "help"]
  const subdomain = parts.length > 2 ? parts[0] : null

  if (subdomain && subdomain !== 'www') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next|static|favicon.ico).*)'],
}

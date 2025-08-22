import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')

  if (!code) {
    return NextResponse.redirect(new URL('/login', requestUrl.origin))
  }

  const supabase = createRouteHandlerClient({ cookies })
  
  try {
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Auth error:', error.message)
      return NextResponse.redirect(new URL('/login', requestUrl.origin))
    }

    return NextResponse.redirect(new URL('/dashboard', requestUrl.origin))
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.redirect(new URL('/login', requestUrl.origin))
  }
} 
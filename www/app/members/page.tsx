import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { Suspense } from 'react'

export default function Members() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MembersContent />
    </Suspense>
  )
}

async function MembersContent() {
  const cookieStore = cookies()
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full max-w-4xl flex justify-center items-center flex-col gap-8">
        <h1 className="text-3xl font-bold">Members Area</h1>
        <p>Welcome to the members-only area, {user.email}!</p>
      </div>
    </div>
  )
}

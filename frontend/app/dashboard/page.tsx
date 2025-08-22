'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/contexts/user-context'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import ChatbotInterface from '@/components/Chatbot'

export default function PredictPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useUser()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
      return
    }
  }, [user, authLoading, router])

  // If still loading or not authenticated, show nothing
  if (authLoading || !user) {
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex w-full h-screen overflow-hidden">
        <AppSidebar />
        <div className="flex-1 flex flex-col items-center justify-center">
          <main className="max-w-2xl px-4 w-full h-[99%] ">
            <ChatbotInterface />
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
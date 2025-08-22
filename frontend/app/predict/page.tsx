"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import PredictionModal from "@/components/PredictionForm"
import { useUser } from "@/contexts/user-context"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PredictPage() {
  const router = useRouter()
  const { user, isLoading: authLoading } = useUser()

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
      return
    }
  }, [user, authLoading, router])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="container mx-auto p-4">
          <Card>
            <CardHeader>
              <CardTitle>Thyroid Cancer Recurrence Prediction</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  Use this tool to assess the potential recurrence of thyroid cancer 
                  based on your medical history and diagnostic information.
                </p>
                <PredictionModal />
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
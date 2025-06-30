'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { useState } from "react"

// Create a client


export default function QueryProvider({children}:{children : React.ReactNode}) {
  const [queryClient] = useState(()=>new QueryClient())
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
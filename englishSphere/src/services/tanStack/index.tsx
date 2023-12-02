import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient({
  defaultOptions: { queries: { cacheTime: 1000 * 60 * 60, staleTime: 1000 * 60 * 60 } },
})

export default function TanStackProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes, Link } from "react-router-dom"
import FieldsList from "./pages/FieldsList"
import FieldDetail from "./pages/FieldDetail"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 1,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-greenlab-700 text-white shadow-md">
            <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
              <Link to="/" className="text-xl font-bold tracking-tight hover:opacity-90">
                GreenLab
              </Link>
            </div>
          </header>

          <main className="max-w-5xl mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<FieldsList />} />
              <Route path="/fields/:id" element={<FieldDetail />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App

import { useQuery } from "@tanstack/react-query"
import { api } from "../api/client"
import type { Field } from "./useFields"

async function getField(id: string) {
  const response = await api.get<Field>(`/fields/${id}`)
  return response.data
}

export function useField(id: string) {
  return useQuery({
    queryKey: ["field", id],
    queryFn: () => getField(id),
    enabled: !!id,
  })
}

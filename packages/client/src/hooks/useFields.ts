import { useQuery } from "@tanstack/react-query"
import { api } from "../api/client"

export interface Field {
  id: string
  name: string
  location: string
  area_hectares: number
  crop_type: string
  created_at: string
}

async function getFields() {
  const response = await api.get<Field[]>("/fields")
  return response.data
}
export function useFields() {
  return useQuery({
    queryKey: ["fields"],
    queryFn: getFields,
  })
}

import { useQuery } from "@tanstack/react-query"
import { api } from "../api/client"

export function useSensorReadings(fieldId: string) {
  return useQuery({
    queryKey: ["sensor-readings", fieldId],
    queryFn: async () => {
      const response = await api.get(`/fields/${fieldId}/sensor-readings`)
      return response.data
    },
  })
}
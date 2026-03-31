import { useFields } from "../hooks/useFields"
import FieldCard from "../components/FieldCard"

export default function FieldsList() {
  const { data: fields, isLoading, error } = useFields()

  if (isLoading) {
    return <p className="text-gray-500">Loading fields...</p>
  }

  if (error) {
    return <p className="text-red-600">Failed to load fields.</p>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Fields</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {fields?.map((field) => (
          <FieldCard key={field.id} field={field} />
        ))}
      </div>
    </div>
  )
}

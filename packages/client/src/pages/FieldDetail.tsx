import { useParams, Link } from "react-router-dom"
import { useField } from "../hooks/useField"
import { useSensorReadings } from "../hooks/useSensorReadings"
export default function FieldDetail() {
  const { id } = useParams<{ id: string }>()
  const { data: field, isLoading, error } = useField(id || "")
  const { data: readings = [], isLoading: readingsLoading, error: readingsError } = useSensorReadings(id || "")

  if (isLoading) {
    return <p className="text-gray-500">Loading field...</p>
  }

  if (error || !field) {
    return <p className="text-red-600">Failed to load field.</p>
  }

  return (
    <div>
      <Link to="/" className="text-greenlab-600 hover:text-greenlab-700 text-sm mb-4 inline-block">
        &larr; Back to fields
      </Link>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{field.name}</h1>
        <p className="text-gray-500 mt-1">{field.location}</p>
        <div className="flex gap-4 mt-4 text-sm text-gray-600">
          <span>{field.area_hectares} ha</span>
          <span className="capitalize">{field.crop_type}</span>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Sensor Readings</h2>
        {readings.map((reading) => (
  <div key={reading.id} className="border border-gray-200 rounded-lg p-4 mb-3">
    <div className="flex justify-between items-center">
      <span className="font-semibold capitalize text-gray-700">{reading.type}</span>
      <span className="text-sm text-gray-400">{new Date(reading.recorded_at).toLocaleString()}</span>
    </div>
    <p className="text-2xl font-bold text-greenlab-600 mt-1">
      {reading.value} <span className="text-sm font-normal text-gray-500">{reading.unit}</span>
    </p>
  </div>
))}

        {/* TODO: Implement sensor readings display — see README for details */}
        <p className="text-gray-400 italic">.</p>
      </div>
    </div>
  )
}

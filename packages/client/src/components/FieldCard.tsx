import { Link } from "react-router-dom"
import type { Field } from "../hooks/useFields"

interface FieldCardProps {
  field: Field
}

export default function FieldCard({ field }: FieldCardProps) {
  return (
    <Link
      to={`/fields/${field.id}`}
      className="block bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md hover:border-greenlab-500 transition-all"
    >
      <h2 className="text-lg font-semibold text-gray-900">{field.name}</h2>
      <p className="text-sm text-gray-500 mt-1">{field.location}</p>
      <div className="flex gap-4 mt-4 text-sm text-gray-600">
        <span>{field.area_hectares} ha</span>
        <span className="capitalize">{field.crop_type}</span>
      </div>
    </Link>
  )
}

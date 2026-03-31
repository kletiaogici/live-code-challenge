import { Generated, Selectable } from "kysely"
import { Pool } from "pg"
import { Kysely, PostgresDialect } from "kysely"
import dotenv from "dotenv"

dotenv.config()

export interface Database {
  fields: FieldTable
  sensors: SensorTable
  sensor_readings: SensorReadingTable
}

export interface FieldTable {
  id: Generated<string>
  name: string
  location: string
  area_hectares: number
  crop_type: string
  created_at: Generated<string>
}

export interface SensorTable {
  id: Generated<string>
  field_id: string
  type: string
  serial_number: string
  installed_at: string
  created_at: Generated<string>
}

export interface SensorReadingTable {
  id: Generated<string>
  sensor_id: string
  value: number
  unit: string
  recorded_at: string
}

export type Field = Selectable<FieldTable>
export type Sensor = Selectable<SensorTable>
export type SensorReading = Selectable<SensorReadingTable>

const dialect = new PostgresDialect({
  pool: new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  }),
})

export const db = new Kysely<Database>({ dialect })

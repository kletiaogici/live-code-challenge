import { db } from "./db"

export async function getAllFields() {
  return db.selectFrom("fields").selectAll().orderBy("name", "asc").execute()
}

export async function getFieldById(id: string) {
  return db.selectFrom("fields").selectAll().where("id", "=", id).executeTakeFirst()
}
export async function getSensorReadings(fieldId: string) {
  return db
    .selectFrom("sensor_readings")
    .innerJoin("sensors", "sensors.id", "sensor_readings.sensor_id")
    .select([
      "sensor_readings.id",
      "sensors.type",
      "sensor_readings.value",
      "sensor_readings.unit",
      "sensor_readings.recorded_at",
    ])
    .where("sensors.field_id", "=", fieldId)
    .orderBy("sensor_readings.recorded_at", "desc")
    .execute()
}

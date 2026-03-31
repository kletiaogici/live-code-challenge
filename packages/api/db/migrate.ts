import { Kysely, PostgresDialect, sql } from "kysely"
import { Pool } from "pg"
import dotenv from "dotenv"

dotenv.config()

async function migrate() {
  const db = new Kysely<any>({
    dialect: new PostgresDialect({
      pool: new Pool({ connectionString: process.env.DATABASE_URL }),
    }),
  })

  console.log("Running migrations...")

  await db.schema
    .createTable("fields")
    .ifNotExists()
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("location", "varchar(255)", (col) => col.notNull())
    .addColumn("area_hectares", "decimal(10, 2)", (col) => col.notNull())
    .addColumn("crop_type", "varchar(100)", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) => col.notNull().defaultTo(sql`now()`))
    .execute()

  console.log("  - fields table created")

  await db.schema
    .createTable("sensors")
    .ifNotExists()
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("field_id", "uuid", (col) =>
      col.notNull().references("fields.id").onDelete("cascade"),
    )
    .addColumn("type", "varchar(50)", (col) => col.notNull())
    .addColumn("serial_number", "varchar(100)", (col) => col.notNull())
    .addColumn("installed_at", "timestamptz", (col) => col.notNull())
    .addColumn("created_at", "timestamptz", (col) => col.notNull().defaultTo(sql`now()`))
    .execute()

  console.log("  - sensors table created")

  await db.schema
    .createTable("sensor_readings")
    .ifNotExists()
    .addColumn("id", "uuid", (col) => col.primaryKey().defaultTo(sql`gen_random_uuid()`))
    .addColumn("sensor_id", "uuid", (col) =>
      col.notNull().references("sensors.id").onDelete("cascade"),
    )
    .addColumn("value", "decimal(10, 3)", (col) => col.notNull())
    .addColumn("unit", "varchar(20)", (col) => col.notNull())
    .addColumn("recorded_at", "timestamptz", (col) => col.notNull())
    .execute()

  await db.schema
    .createIndex("idx_sensor_readings_sensor_id_recorded_at")
    .ifNotExists()
    .on("sensor_readings")
    .columns(["sensor_id", "recorded_at"])
    .execute()

  console.log("  - sensor_readings table created")
  console.log("Migrations complete.")

  await db.destroy()
}

migrate().catch((err) => {
  console.error("Migration failed:", err)
  process.exit(1)
})

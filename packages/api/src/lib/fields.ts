import { db } from "./db"

export async function getAllFields() {
  return db.selectFrom("fields").selectAll().orderBy("name", "asc").execute()
}

export async function getFieldById(id: string) {
  return db.selectFrom("fields").selectAll().where("id", "=", id).executeTakeFirst()
}

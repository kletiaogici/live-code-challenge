import { Request, Response } from "express"
import { getAllFields, getFieldById } from "../lib/fields"

export async function handleGetFields(req: Request, res: Response) {
  try {
    const fields = await getAllFields()
    res.json(fields)
  } catch (error) {
    console.error("Error fetching fields:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

export async function handleGetField(req: Request, res: Response) {
  try {
    const { id } = req.params
    const field = await getFieldById(id)

    if (!field) {
      res.status(404).json({ error: "Field not found" })
      return
    }

    res.json(field)
  } catch (error) {
    console.error("Error fetching field:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

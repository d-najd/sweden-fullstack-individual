import db from "@/config/database"
import { requestsSchemaProperties } from "./V1__init"

export async function up() {
	await db.command({
		collMod: "requests",
		validator: {
			$jsonSchema: {
				bsonType: "object",
				additionalProperties: false,
				properties: {
					...requestsSchemaProperties,
					json_body: {
						bsonType: ["string", "null"],
					},
				},
			},
		},
	})
}

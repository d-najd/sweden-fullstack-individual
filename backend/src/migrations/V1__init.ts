import db from "@/config/database"
import RequestMethodCreate from "@/shared/types/request_method/requestMethod.create"

export async function up() {
	const requestMethodsName = "request_methods"
	await db.createCollection(requestMethodsName, {
		validator: {
			$jsonSchema: {
				bsonType: "object",
				required: ["name"],
				additionalProperties: false,
				properties: {
					_id: {},
					name: {
						bsonType: "string",
						description: "Request method I.E GET, POST, DELETE",
					},
				},
			},
		},
	})

	const requestsMethods: RequestMethodCreate[] = [
		{ name: "GET" },
		{ name: "POST" },
		{ name: "PUT" },
		{ name: "PATCH" },
		{ name: "DELETE" },
		{ name: "HEAD" },
		{ name: "OPTIONS" },
	]

	await db.collection(requestMethodsName).insertMany(requestsMethods)

	await db.createCollection("folders", {
		validator: {
			$jsonSchema: {
				bsonType: "object",
				required: ["name"],
				additionalProperties: false,
				properties: {
					_id: {},
					name: {
						bsonType: "string",
						description:
							"Name of the collection (if there is no parent_id) or folder (if there is parent_id)",
					},
					parent_id: {
						bsonType: ["object", "null"],
						description:
							"must be an ObjectId referencing another collection/folder, or null",
					},
				},
			},
		},
	})

	await db.createCollection("requests", {
		validator: {
			$jsonSchema: {
				bsonType: "object",
				required: ["folder_id", "request_method_id", "name"],
				additionalProperties: false,
				properties: {
					_id: {},
					name: {
						bsonType: "string",
						description: "Name of the request",
					},
					url: {
						bsonType: "string",
						description:
							"URl that the request will request from, may be null",
					},
				},
			},
		},
	})

	await db.createCollection("")
}

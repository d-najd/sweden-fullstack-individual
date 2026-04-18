import { ObjectId } from "mongodb"
import db from "@/config/database"
import RequestEntity from "./types/request.entity"

const tableName = "requests"

class RequestRepository {
	private collection = db.collection<RequestEntity>(tableName)

	async getByFolderId(folderId: string): Promise<RequestEntity[]> {
		const query = { folder_id: new ObjectId(folderId) }
		return await this.collection.find(query).toArray()
	}

	async getById(id: string): Promise<RequestEntity> {
		const query = { _id: new ObjectId(id) }
		return (await this.collection.findOne(query))!
	}

	async create(entity: RequestEntity): Promise<string> {
		const result = await this.collection.insertOne(entity)
		return result.insertedId.toString()
	}

	async delete(id: string) {
		const query = { _id: new ObjectId(id) }
		const result = await this.collection.deleteOne(query)

		return result.deletedCount > 0
	}
}

export default new RequestRepository()

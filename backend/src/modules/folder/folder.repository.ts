import { ObjectId } from "mongodb"
import FolderEntity from "./types/folder.entity"
import db from "@/config/database"

const tableName = "folders"

class FolderRepository {
	private collection = db.collection<FolderEntity>(tableName)

	async getByParentId(id?: string): Promise<FolderEntity[]> {
		const query = id ? { parent_id: new ObjectId(id) } : { parent_id: null }
		console.log("QUERTY " + JSON.stringify(query))
		return await this.collection.find(query).toArray()
	}

	async getById(id: string): Promise<FolderEntity> {
		const query = { _id: new ObjectId(id) }
		return (await this.collection.findOne(query))!
	}

	async create(entity: FolderEntity): Promise<string> {
		const result = await this.collection.insertOne(entity)
		return result.insertedId.toString()
	}

	async delete(id: string) {
		const query = { _id: new ObjectId(id) }
		const result = await this.collection.deleteOne(query)

		return result.deletedCount > 0
	}
}

export default new FolderRepository()

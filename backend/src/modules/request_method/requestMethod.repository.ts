import db from "@/config/database"
import RequestMethodEntity from "./types/requestMethod.entity"

const tableName = "request_methods"

class RequestMethodRepository {
	private collection = db.collection<RequestMethodEntity>(tableName)

	async getAll(): Promise<RequestMethodEntity[]> {
		return await this.collection.find().toArray()
	}
}

export default new RequestMethodRepository()

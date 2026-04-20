import envConfig from "@/config/env"
import RequestCreate from "@/shared/types/request/request.create"
import RequestDto from "@/shared/types/request/request.dto"
import axios from "axios"

class RequestApi {
	path = `${envConfig.backend}request`

	async getByFolderId(folderId: string) {
		const { data } = await axios.get(`${this.path}/folder-id`, {
			params: { id: folderId },
		})
		return data as RequestDto[]
	}

	async create(request: RequestCreate) {
		const { data } = await axios.post(this.path, request)

		return data as RequestDto
	}

	async delete(id: string) {
		await axios.delete(this.path, {
			params: { id },
		})
	}
}

export default new RequestApi()

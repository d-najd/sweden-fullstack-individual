import envConfig from "@/config/env"
import RequestCreate from "@/shared/types/request/request.create"
import RequestDto from "@/shared/types/request/request.dto"
import RequestUpdate from "@/shared/types/request/request.update"
import axios from "axios"

class RequestApi {
	path = `${envConfig.backend}request`

	async getByFolderId(folderId: string) {
		const { data } = await axios.get(`${this.path}/folder_id/${folderId}`)
		return data as RequestDto[]
	}

	async create(dto: RequestCreate) {
		const { data } = await axios.post(this.path, dto)

		return data as RequestDto
	}

	async update(id: string, dto: RequestUpdate) {
		const { data } = await axios.put(`${this.path}/${id}`, dto)

		return data as RequestDto
	}

	async delete(id: string) {
		await axios.delete(`${this.path}/${id}`)
	}
}

export default new RequestApi()

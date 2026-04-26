import envConfig from "@/config/env"
import FolderCreate from "@/shared/types/folder/folder.create"
import FolderDto from "@/shared/types/folder/folder.dto"
import FolderUpdate from "@/shared/types/folder/folder.update"
import axios from "axios"

class FolderApi {
	path = `${envConfig.backend}folder`

	async getByParentId(parentId?: string) {
		const { data } = await axios.get(
			`${this.path}/parent_id/${parentId ?? ""}`,
		)
		return data as FolderDto[]
	}

	async create(dto: FolderCreate) {
		const { data } = await axios.post(this.path, dto)

		return data as FolderDto
	}

	async update(id: string, dto: FolderUpdate) {
		const { data } = await axios.put(`${this.path}/${id}`, dto)

		return data as FolderDto
	}

	async delete(id: string) {
		await axios.delete(`${this.path}/${id}`)
	}
}

export default new FolderApi()

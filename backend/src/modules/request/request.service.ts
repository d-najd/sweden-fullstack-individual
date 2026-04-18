import RequestCreate from "@/shared/types/request/request.create"
import RequestDto from "@/shared/types/request/request.dto"
import requestRepository from "./request.repository"
import RequestEntity from "./types/request.entity"
import RequestMapper from "./types/request.mapper"

class RequestService {
	async getByFolderId(id: string): Promise<RequestDto[]> {
		const entities = await requestRepository.getByFolderId(id)
		return entities.map((o) => RequestMapper.toDto(o))
	}

	async create(dto: RequestCreate): Promise<RequestDto> {
		const entity = RequestMapper.toEntity(dto)
		const insertedId = await requestRepository.create(entity as RequestEntity)
		const createdEntity = await requestRepository.getById(insertedId)

		return RequestMapper.toDto(createdEntity)
	}

	async delete(id: string) {
		const result = await requestRepository.delete(id)
		if (!result) {
			throw new Error("Not found")
		}
	}
}

export default new RequestService()

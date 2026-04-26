import RequestCreate from "@/shared/types/request/request.create"
import RequestDto from "@/shared/types/request/request.dto"
import requestRepository from "./request.repository"
import RequestEntity from "./types/request.entity"
import RequestMapper from "./types/request.mapper"
import { client } from "@/config/database"
import RequestUpdate from "@/shared/types/request/request.update"

class RequestService {
	async getByFolderId(id: string): Promise<RequestDto[]> {
		const entities = await requestRepository.getByFolderId(id)
		return entities.map((o) => RequestMapper.toDto(o))
	}

	async create(dto: RequestCreate): Promise<RequestDto> {
		const entity = RequestMapper.toEntity(dto)

		const session = client.startSession()
		let createdEntity: RequestEntity

		try {
			session.startTransaction()

			const insertedId = await requestRepository.create(
				entity as RequestEntity,
			)
			createdEntity = await requestRepository.getById(insertedId)
			await session.commitTransaction()
		} catch (err) {
			await session.abortTransaction()
			throw err
		} finally {
			await session.endSession()
		}

		return RequestMapper.toDto(createdEntity)
	}

	async update(id: string, dto: RequestUpdate) {
		const entity = RequestMapper.toEntity(dto)
		const session = client.startSession()

		let updatedEntity: RequestEntity
		try {
			session.startTransaction()

			await requestRepository.update(id, entity)

			updatedEntity = await requestRepository.getById(id)
		} catch (err) {
			await session.abortTransaction()
			throw err
		} finally {
			await session.endSession()
		}

		return RequestMapper.toDto(updatedEntity)
	}

	async delete(id: string) {
		const result = await requestRepository.delete(id)
		if (!result) {
			throw new Error("Not found")
		}
	}
}

export default new RequestService()

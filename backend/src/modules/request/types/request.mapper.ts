import { ObjectId } from "mongodb"
import RequestEntity from "./request.entity"
import RequestDto from "@/shared/types/request/request.dto"

export default class RequestMapper {
	static toEntity(dto: Partial<RequestDto>): Partial<RequestEntity> {
		const entity: Partial<RequestEntity> = {}

		if (dto.id !== undefined) {
			entity._id = new ObjectId(dto.id)
		}

		if (dto.name !== undefined) {
			entity.name = dto.name
		}

		if (dto.url !== undefined) {
			entity.url = dto.url
		} else {
			entity.url = null
		}

		if (dto.folder_id !== undefined) {
			entity.folder_id = new ObjectId(dto.folder_id)
		}

		if (dto.request_method_id !== undefined) {
			entity.request_method_id = new ObjectId(dto.request_method_id)
		}

		return entity
	}

	static toDto(entity: RequestEntity): RequestDto {
		console.log("TRYING TO MAP " + JSON.stringify(entity))
		return {
			id: entity._id.toString(),
			name: entity.name,
			url: entity.url ?? undefined,
			folder_id: entity.folder_id.toString(),
			request_method_id: entity.request_method_id.toString(),
		}
	}
}

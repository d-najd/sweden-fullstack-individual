import { ObjectId } from "mongodb"
import RequestMethodDto from "@/shared/types/request_method/requestMethod.dto"
import RequestMethodEntity from "./requestMethod.entity"

export default class RequestMethodMapper {
	static toEntity(
		dto: Partial<RequestMethodDto>,
	): Partial<RequestMethodEntity> {
		const entity: Partial<RequestMethodEntity> = {}

		if (dto.id !== undefined) {
			entity._id = new ObjectId(dto.id)
		}

		if (dto.name !== undefined) {
			entity.name = dto.name
		}

		return entity
	}

	static toDto(entity: RequestMethodEntity): RequestMethodDto {
		return {
			id: entity._id.toString(),
			name: entity.name,
		}
	}
}

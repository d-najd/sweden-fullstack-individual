import FolderDto from "@/shared/types/folder/folder.dto"
import FolderEntity from "./folder.entity"
import { ObjectId } from "mongodb"

export default class FolderMapper {
	static toEntity(dto: Partial<FolderDto>): Partial<FolderEntity> {
		const entity: Partial<FolderEntity> = {}

		if (dto.id !== undefined) {
			entity._id = new ObjectId(dto.id)
		}

		if (dto.parent_id !== undefined) {
			entity.parent_id = new ObjectId(dto.parent_id)
		}

		if (dto.name !== undefined) {
			entity.name = dto.name
		}

		return entity
	}

	static toDto(entity: FolderEntity): FolderDto {
		return {
			id: entity._id.toString(),
			parent_id: entity.parent_id?.toString(),
			name: entity.name,
		}
	}
}

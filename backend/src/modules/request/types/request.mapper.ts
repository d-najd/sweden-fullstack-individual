import { ObjectId } from "mongodb"
import RequestEntity from "./request.entity"
import FolderEntity from "@/modules/folder/types/folder.entity"
import RequestDto from "@/shared/types/request/request.dto"

export default class RequestMapper {
	static toEntity(dto: Partial<RequestDto>): Partial<FolderEntity> {
		const entity: Partial<RequestEntity> = {}

		if (dto.id !== undefined) {
			entity._id = new ObjectId(dto.id)
		}

      if (dto.folder_id !== undefined) {
         entity.folder_id = new ObjectId(dto.folder_id)
      }

      if (dto.url !== undefined) {
         entity.url = dto.url
      }

      if (dto.method_id !== undefined) {
         entity.method_id = new ObjectId(dto.method_id)
      }

      if (dto.body !== undefined) {
         entity.body = dto.body
      } else {
         entity.body = null
      }

		return entity
	}

	static toDto(entity: RequestEntity): RequestDto {
		return {
			id: entity._id.toString(),
         folder_id: entity.folder_id.toString(),
         url: entity.url,
         method_id: entity.method_id.toString(),
         body: entity.body ?? undefined
		}
	}
}

import FolderDto from "@/shared/types/folder/folder.dto"
import folderRepository from "./folder.repository"
import FolderMapper from "./types/folder.mapper"
import FolderCreate from "@/shared/types/folder/folder.create"
import FolderEntity from "./types/folder.entity"

class FolderService {
	async getByFolderId(id?: string): Promise<FolderDto[]> {
		const entities = await folderRepository.getByParentId(id)
		return entities.map((o) => FolderMapper.toDto(o))
	}

	async create(dto: FolderCreate): Promise<FolderDto> {
		const entity = FolderMapper.toEntity(dto)
		const insertedId = await folderRepository.create(entity as FolderEntity)
		const createdEntity = await folderRepository.getById(insertedId)

		return FolderMapper.toDto(createdEntity)
	}

	async delete(id: string) {
		const result = await folderRepository.delete(id)
		if (!result) {
			throw new Error("Not found")
		}
	}
}

export default new FolderService()

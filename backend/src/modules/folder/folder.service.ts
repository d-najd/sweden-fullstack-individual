import FolderDto from "@/shared/types/folder/folder.dto"
import folderRepository from "./folder.repository"
import FolderMapper from "./types/folder.mapper"
import FolderCreate from "@/shared/types/folder/folder.create"
import FolderEntity from "./types/folder.entity"
import { client } from "@/config/database"

class FolderService {
	async getByParentId(id?: string): Promise<FolderDto[]> {
		const entities = await folderRepository.getByParentId(id)
		return entities.map((o) => FolderMapper.toDto(o))
	}

	async create(dto: FolderCreate): Promise<FolderDto> {
		const entity = FolderMapper.toEntity(dto)
      const session = client.startSession()

      let createdEntity: FolderEntity

      try {
         session.startTransaction()

		   const insertedId = await folderRepository.create(entity as FolderEntity)
		   createdEntity = await folderRepository.getById(insertedId)

         await session.commitTransaction()
      } catch (err) {
         await session.abortTransaction()
         throw err
      } finally {
         await session.endSession()
      }

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

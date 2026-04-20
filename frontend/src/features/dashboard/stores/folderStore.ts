import FolderDto from "@/shared/types/folder/folder.dto"
import { create } from "zustand"
import folderApi from "@/api/folder"

export type FolderState = {
	folders: FolderDto[]
	/**
	 * "" for undefined
	 */
	fetchedParentIds: string[]

	/**
	 *Doesn't contain validation so if you request more data it won't override
	 *@param parentId if undefined will fetch the collections (top level folders) which don't contain parent_id
	 */
	loadMoreFolders: (parentId?: string) => void
}

let queue = Promise.resolve()

const useFolderStore = create<FolderState>((set, get) => ({
	folders: [],
	fetchedParentIds: [],
	loadMoreFolders: async (parentId?: string) => {
		queue = queue.then(async () => {
			const parentIdForMarkFetched = parentId ?? ""
			if (get().fetchedParentIds.includes(parentIdForMarkFetched)) {
				console.log(`Already fetched folders by parentId ${parentId}`)
				return
			}

			const data = await folderApi.getByParentId(parentId)

			set((state) => ({
				folders: [...state.folders, ...data],
				fetchedParentIds: [
					...state.fetchedParentIds,
					parentIdForMarkFetched,
				],
			}))
		})
	},
}))

export default useFolderStore

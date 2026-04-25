import FolderDto from "@/shared/types/folder/folder.dto"
import { create } from "zustand"
import folderApi from "@/api/folder"
import { subscribeWithSelector } from "zustand/middleware"

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
	loadMoreFolders: (parentId?: string, force?: boolean) => Promise<void>
	createFolder: (parentId?: string) => Promise<void>
	deleteFolder: (id: string) => Promise<void>
}

let queue = Promise.resolve()

const useFolderStore = create<FolderState>()(
	subscribeWithSelector((set, get) => ({
		folders: [],
		fetchedParentIds: [],
		loadMoreFolders: async (parentId?: string, force: boolean = false) => {
			queue = queue.then(async () => {
				const parentIdForMarkFetched = parentId ?? ""
				if (
					!force &&
					get().fetchedParentIds.includes(parentIdForMarkFetched)
				) {
					console.log(
						`Already fetched folders by parentId ${parentId}`,
					)
					return
				}

				const data = await folderApi.getByParentId(parentId)

				set((state) => ({
					folders: [
						...state.folders.filter(
							(o) => o.parent_id !== parentId,
						),
						...data,
					],
					fetchedParentIds: [
						...state.fetchedParentIds.filter((o) => o !== parentId),
						parentIdForMarkFetched,
					],
				}))
			})
		},
		createFolder: async (parentId?: string) => {
			queue = queue.then(async () => {
				await folderApi.create({
					parent_id: parentId,
					name: "New Folder",
				})

				await get().loadMoreFolders(parentId, true)
			})
		},
		deleteFolder: async (id: string) => {
			queue = queue.then(async () => {
				await folderApi.delete(id)

				set((state) => ({
					folders: state.folders.filter((o) => o.id !== id),
					fetchedParentIds: state.fetchedParentIds.filter(
						(o) => o !== id,
					),
				}))
			})
		},
	})),
)

export default useFolderStore

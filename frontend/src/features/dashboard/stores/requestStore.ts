import { create } from "zustand"
import requestApi from "@/api/request"
import RequestDto from "@/shared/types/request/request.dto"
import { subscribeWithSelector } from "zustand/middleware"

export type RequestState = {
	requests: RequestDto[]
	fetchedFolderIds: string[]

	/**
	 *Doesn't contain validation so if you request more data it won't override
	 */
	loadMoreRequests: (folderId: string, force?: boolean) => Promise<void>
}

let queue = Promise.resolve()

const useRequestStore = create<RequestState>()(
	subscribeWithSelector((set, get) => ({
		requests: [],
		fetchedFolderIds: [],

		loadMoreRequests: async (folderId: string, force: boolean = false) => {
			queue = queue.then(async () => {
				if (!force && get().fetchedFolderIds.includes(folderId)) {
					console.log(
						`Already fetched requests by folderId ${folderId}`,
					)
					return
				}

				const data = await requestApi.getByFolderId(folderId)
				set((state) => ({
					requests: [
						...state.requests.filter(
							(o) => o.folder_id !== folderId,
						),
						...data,
					],
					fetchedFolderIds: [
						...state.fetchedFolderIds.filter((o) => o !== folderId),
						folderId,
					],
				}))
			})
		},
	})),
)

export default useRequestStore

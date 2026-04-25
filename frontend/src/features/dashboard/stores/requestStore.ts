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
	loadMoreRequests: (folderId: string) => Promise<void>
}

let queue = Promise.resolve()

const useRequestStore = create<RequestState>()(
	subscribeWithSelector((set, get) => ({
		requests: [],
		fetchedFolderIds: [],

		loadMoreRequests: async (folderId: string) => {
			queue = queue.then(async () => {
				if (get().fetchedFolderIds.includes(folderId)) {
					console.log(
						`Already fetched requests by folderId ${folderId}`,
					)
					return
				}

				const data = await requestApi.getByFolderId(folderId)
				set((state) => ({
					requests: [...state.requests, ...data],
					fetchedFolderIds: [...state.fetchedFolderIds, folderId],
				}))
			})
		},
	})),
)

export default useRequestStore

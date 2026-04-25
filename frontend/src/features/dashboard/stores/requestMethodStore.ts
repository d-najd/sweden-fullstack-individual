import RequestMethodDto from "@/shared/types/request_method/requestMethod.dto"
import { create } from "zustand"
import requestMethodApi from "@/api/requestMethod"

export interface RequestMethodState {
	fetched: boolean
	requestMethods: RequestMethodDto[]
	fetchRequestMethods: () => Promise<void>
}

let queue = Promise.resolve()

const useRequestMethodStore = create<RequestMethodState>((set, get) => ({
	fetched: false,
	requestMethods: [],
	fetchRequestMethods: async () => {
		queue = queue.then(async () => {
			if (get().fetched) return

			const data = await requestMethodApi.getAll()

			set(() => ({
				fetched: true,
				requestMethods: data,
			}))
		})
	},
}))

useRequestMethodStore.getState().fetchRequestMethods()

export default useRequestMethodStore

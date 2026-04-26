import { create } from "zustand"
import RequestDto from "@/shared/types/request/request.dto"
import useRequestStore from "./requestStore"

export type SelectedRequestState = {
	selectedRequest?: RequestDto
	setSelectedRequest: (request: RequestDto) => void
}

const useSelectedRequest = create<SelectedRequestState>((set) => ({
	setSelectedRequest: (request: RequestDto) => {
		set(() => ({
			selectedRequest: request,
		}))
	},
}))

useRequestStore.subscribe(
	(state) => state.requests,
	(requests) => {
		const request = requests.find(
			(o) => o.id === useSelectedRequest.getState()?.selectedRequest?.id,
		)
		if (!request) return

		useSelectedRequest.getState().setSelectedRequest(request)
	},
)

export default useSelectedRequest

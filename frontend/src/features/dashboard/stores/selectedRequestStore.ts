import { create } from "zustand"
import RequestDto from "@/shared/types/request/request.dto"

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

export default useSelectedRequest

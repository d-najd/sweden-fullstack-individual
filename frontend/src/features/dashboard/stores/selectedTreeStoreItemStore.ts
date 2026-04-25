import { create } from "zustand"
import RequestDto from "@/shared/types/request/request.dto"

export type SelectedRequestState = {
	selectedRequest?: RequestDto
}

const useSelectedRequest = create<SelectedRequestState>((set) => ({
	setSelectedItem: (request: RequestDto) => {
		set(() => ({
			selectedRequest: request,
		}))
	},
}))

export default useSelectedRequest

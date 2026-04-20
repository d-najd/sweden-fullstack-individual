import { create } from "zustand"
import RequestDto from "@/shared/types/request/request.dto"

export type pickedRequestState = {
	request?: RequestDto

	overridePickedRequest: (dto: RequestDto) => void
}

const usePickedRequestStore = create<pickedRequestState>((set) => ({
	overridePickedRequest: (dto: RequestDto) => {
		set(() => ({
			request: dto,
		}))
	},
}))

export default usePickedRequestStore

import { create } from "zustand"
import ExtendedResponse from "../types/ExtendedResponse"

export type SelectedRequestState = {
	invokedResponse?: ExtendedResponse
	setInvokedResponse: (response: ExtendedResponse) => void
}

const useInvokedResponseStore = create<SelectedRequestState>((set) => ({
	setInvokedResponse: (response: ExtendedResponse) => {
		set(() => ({
			invokedResponse: response,
		}))
	},
}))

export default useInvokedResponseStore

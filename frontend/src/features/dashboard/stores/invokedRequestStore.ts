import { create } from "zustand"

export type SelectedRequestState = {
	invokedResponse?: Response
	setInvokedResponse: (response: Response) => void
}

const useInvokedResponseStore = create<SelectedRequestState>((set) => ({
	setInvokedResponse: (response: Response) => {
		set(() => ({
			invokedResponse: response,
		}))
	},
}))

export default useInvokedResponseStore

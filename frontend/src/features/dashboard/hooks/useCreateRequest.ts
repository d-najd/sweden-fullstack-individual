import useRequestMethodStore from "../stores/requestMethodStore"
import useRequestStore from "../stores/requestStore"
import requestApi from "@/api/request"

export function useCreateRequest() {
	const { requestMethods } = useRequestMethodStore()
	const { loadMoreRequests } = useRequestStore() // or whatever store manages requests

	const createRequest = async (folderId: string) => {
		const getRequestMethod = requestMethods.find((o) => o.name === "GET")

		if (!getRequestMethod) {
			console.error("GET request method not found")
			return
		}

		try {
			await requestApi.create({
				name: "New Request",
				folder_id: folderId,
				request_method_id: getRequestMethod.id,
			})
			await loadMoreRequests(folderId, true)
		} catch (error) {
			console.error("Failed to create request:", error)
		}
	}

	return { createRequest }
}

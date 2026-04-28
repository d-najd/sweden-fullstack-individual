import RequestDto from "@/shared/types/request/request.dto"
import useRequestMethodStore from "../stores/requestMethodStore"
import ExtendedResponse from "../types/ExtendedResponse"

class RequestService {
	cors = "https://corsproxy.io/?url="

	async invokeRequest(request: RequestDto): Promise<ExtendedResponse> {
		const startTime = performance.now()

		const requestMethod = useRequestMethodStore
			.getState()
			.requestMethods.find((o) => o.id === request.request_method_id)!

		const options: RequestInit = {
			method: requestMethod.name,
		}
		if (
			request.json_body &&
			requestMethod.name !== "GET" &&
			requestMethod.name !== "HEAD"
		) {
			options.headers = {
				"Content-Type": "application/json",
			}
			options.body = request.json_body
		}

		const url = request.url.includes("localhost")
			? request.url
			: this.cors + request.url

		const response = await fetch(url, options)
		const endTime = performance.now()

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const resultAsAny = response as any
		resultAsAny.duration = endTime - startTime

		return resultAsAny as ExtendedResponse
	}
}

export default new RequestService()

import RequestDto from "@/shared/types/request/request.dto"
import useRequestMethodStore from "../stores/requestMethodStore"

class RequestService {
	cors = "https://corsproxy.io/?url="

	async invokeRequest(request: RequestDto): Promise<Response> {
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

		return await fetch(url, options)
	}
}

export default new RequestService()

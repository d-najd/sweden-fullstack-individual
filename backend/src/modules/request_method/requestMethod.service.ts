import RequestMethodDto from "@/shared/types/request_method/requestMethod.dto"
import requestMethodRepository from "./requestMethod.repository"
import RequestMethodMapper from "./types/requestMethod.mapper"

class RequestMethodService {
	async getAll(): Promise<RequestMethodDto[]> {
		const entities = await requestMethodRepository.getAll()
		return entities.map((o) => RequestMethodMapper.toDto(o))
	}
}

export default new RequestMethodService()

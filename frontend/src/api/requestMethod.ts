import envConfig from "@/config/env"
import RequestMethodDto from "@/shared/types/request_method/requestMethod.dto"
import axios from "axios"

class RequestMethodApi {
	path = `${envConfig.backend}request_method`

	async getAll() {
		const { data } = await axios.get(`${this.path}/`)
		return data as RequestMethodDto[]
	}
}

export default new RequestMethodApi()

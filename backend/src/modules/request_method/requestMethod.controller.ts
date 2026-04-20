import { Request, Response } from "express"
import requestMethodService from "./requestMethod.service"

class RequestMethodController {
	async getAll(_req: Request, res: Response) {
		try {
			const dtos = await requestMethodService.getAll()
			res.json(dtos)
		} catch (error) {
			console.error(error)
			res.status(500).json(error)
		}
	}
}

export default new RequestMethodController()

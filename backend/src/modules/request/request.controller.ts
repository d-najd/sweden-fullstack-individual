import { Request, Response } from "express"
import requestService from "./request.service"
import RequestCreate from "@/shared/types/request/request.create"

class RequestController {
	async getByFolderId(req: Request, res: Response) {
		try {
			const folderId = req.params.folder_id as string

			const dtos = await requestService.getByFolderId(folderId)
			res.json(dtos)
		} catch (error) {
			console.error(error)
			res.status(500).json(error)
		}
	}

	async create(req: Request, res: Response) {
		try {
			const body = req.body as RequestCreate
			const newDto = await requestService.create(body)

			res.status(201).json(newDto)
		} catch (error) {
			console.error(error)
			res.status(500).json({ error: "Internal server error" })
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const id = req.params.id as string
			await requestService.delete(id)

			res.status(204).send()
		} catch (error) {
			console.error(error)
			res.status(500).json(error)
		}
	}
}

export default new RequestController()

import { Request, Response } from "express"
import folderService from "./folder.service"
import FolderCreate from "@/shared/types/folder/folder.create"

class FolderController {
	async getByParentId(req: Request, res: Response) {
		try {
			let parentId: string | undefined
			if (req.params.parent_id) {
				parentId = req.params.parent_id as string
				console.log("ID IS" + parentId)
			} else {
				console.log("UNDEFINED")
			}

			const dtos = await folderService.getByFolderId(parentId)
			res.json(dtos)
		} catch (error) {
			console.error(error)
			res.status(500).json(error)
		}
	}

	async create(req: Request, res: Response) {
		try {
			// Validate and cast request body using Typia
			const body = req.body as FolderCreate
			const newUser = await folderService.create(body)

			res.status(201).json(newUser)
		} catch (error) {
			console.error(error)
			res.status(500).json({ error: "Internal server error" })
		}
	}

	async delete(req: Request, res: Response) {
		try {
			const id = req.params.id as string
			await folderService.delete(id)

			res.status(204).send()
		} catch (error) {
			console.error(error)
			res.status(500).json(error)
		}
	}
}

export default new FolderController()

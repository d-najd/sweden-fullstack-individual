import { Router } from "express"
import folderController from "./folder.controller"

const folderRouter = Router()

folderRouter.get("/parent_id{/:parent_id}", folderController.getByParentId)
folderRouter.post("/", folderController.create)
folderRouter.put("/:id", folderController.update)
folderRouter.delete("/:id", folderController.delete)

export default folderRouter

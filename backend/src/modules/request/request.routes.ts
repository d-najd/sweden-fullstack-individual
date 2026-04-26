import { Router } from "express"
import requestController from "./request.controller"

const requestRouter = Router()

requestRouter.get("/folder_id/:folder_id", requestController.getByFolderId)
requestRouter.post("/", requestController.create)
requestRouter.put("/:id", requestController.update)
requestRouter.delete("/:id", requestController.delete)

export default requestRouter

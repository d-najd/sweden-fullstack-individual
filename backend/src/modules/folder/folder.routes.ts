import { Router } from "express"
import folderController from "./folder.controller"

const router = Router()

router.get("/:parent_id", folderController.getByParentId)
router.post("/", folderController.create)
router.delete("/:id", folderController.delete)

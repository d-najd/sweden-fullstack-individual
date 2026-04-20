import { Router } from "express"
import requestMethodController from "./requestMethod.controller"

const requestMethodRouter = Router()

requestMethodRouter.get("/", requestMethodController.getAll)

export default requestMethodRouter

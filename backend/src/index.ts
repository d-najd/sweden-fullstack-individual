import express from "express"
import umzug from "./lib/umzugMigrations"
import envConfig from "./config/env"
import cors from "cors"
import folderRouter from "./modules/folder/folder.routes"
import requestRouter from "./modules/request/request.routes"

// Run db migrations
await umzug.up()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(envConfig.port, () =>
	console.log(`Server running on: localhost:${envConfig.port}`),
)

app.use("/folder", folderRouter)
app.use("/request", requestRouter)

export default app

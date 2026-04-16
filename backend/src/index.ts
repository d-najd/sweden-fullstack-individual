import express from "express"
import umzug from "./lib/umzugMigrations"
import envConfig from "./config/env"
import cors from "cors"

// Run db migrations
await umzug.up()

const app = express()

app.use(cors())
app.use(express.json())

app.listen(envConfig.port, () =>
	console.log(`Server running on: localhost:${envConfig.port}`),
)

export default app

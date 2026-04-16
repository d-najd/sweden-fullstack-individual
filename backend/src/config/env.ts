import { configDotenv } from "dotenv"
import path from "path"

function init() {
	configDotenv({
		path: path.resolve(process.cwd(), "../.env"),
	})
}

init()

const envConfig = {
	port: process.env.BACKEND_PORT ? parseInt(process.env.BACKEND_PORT) : 3000,
	databaseUrl: process.env.DB_URL,
	database: process.env.DB_DATABASE
		? process.env.DB_DATABASE
		: "sweden-backend",
}

export default envConfig

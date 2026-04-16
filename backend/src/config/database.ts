import envConfig from "./env"
import { MongoClient, ServerApiVersion } from "mongodb"

const client = new MongoClient(envConfig.databaseUrl!, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
})

async function run() {
	try {
		await client.connect()
		await client.db(envConfig.database).command({ ping: 1 })
		console.log("Successfully connected to MongoDB")
	} catch {
		await client.close()
	}
}
run().catch(console.dir)

const db = client.db(envConfig.database)
export default db

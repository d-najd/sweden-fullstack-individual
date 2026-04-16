// migrate.js
import { Umzug, MongoDBStorage } from "umzug"
import fs from "fs/promises"
import path from "path"
import db from "@/config/database"

// Read all SQL files, parse version, sort ascending
async function getFlywayMigrations() {
	const migrationsDir = path.join(
		process.cwd(),
		"dist",
		"backend",
		"src",
		"migrations",
	)
	const files = await fs.readdir(migrationsDir)

	const migrations = []
	for (const file of files) {
		let match = file.match(/^V(\d+)__(.+)\.js/)
		if (!match) {
			match = file.match(/^V(\d+)_(.+)\.js/)
		}
		if (!match) continue

		const version = parseInt(match[1], 10)
		const description = match[2]
		const filePath = path.join(migrationsDir, file)

		const migrationModule = await import(filePath)
		migrations.push({
			name: file,
			version,
			description,
			up: migrationModule.up,
			path: filePath,
		})
	}

	migrations.sort((a, b) => a.version - b.version)
	return migrations
}

const flywayMigrations = await getFlywayMigrations()

const umzug = new Umzug({
	migrations: flywayMigrations.map((m) => ({
		name: m.name,
		up: () => m.up(),
	})),
	storage: new MongoDBStorage({
		collection: db.collection("migrations"),
	}),
	logger: console,
})

export default umzug

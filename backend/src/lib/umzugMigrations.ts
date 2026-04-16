// migrate.js
import { Umzug, MongoDBStorage } from "umzug"
import { Options, Sequelize } from "sequelize"
import fs from "fs/promises"
import path from "path"
import envConfig from "@/config/env"
import db from "@/config/database"

export const config: Options = {
	host: envConfig.databaseHost,
	username: envConfig.username,
	password: envConfig.password,
	database: envConfig.database,
	dialect: "mysql",
	dialectOptions: {
		multipleStatements: true,
	},
}

const sequelize = new Sequelize(config)

// Read all SQL files, parse version, sort ascending
async function getFlywayMigrations() {
	const migrationsDir = path.join(process.cwd(), "src", "migrations")
	const files = await fs.readdir(migrationsDir)

	const migrations = []
	for (const file of files) {
		let match = file.match(/^V(\d+)__(.+)\.ts/)
		if (!match) {
			match = file.match(/^V(\d+)_(.+)\.ts/)
		}
		if (!match) continue

		const version = parseInt(match[1], 10)
		const description = match[2]
		const filePath = path.join(migrationsDir, file)
		const sql = await fs.readFile(filePath, "utf-8")

		const migrationModule = await import(filePath)

		migrations.push({
			name: file,
			version,
			description,
			sql,
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
		up: () => m.up,
	})),
	context: { sequelize },
	storage: new MongoDBStorage({
		collection: db.collection("migrations"),
	}),
	logger: console,
})

export default umzug

import { ObjectId } from "mongodb"

type FolderEntity = {
	_id: ObjectId
	parent_id: ObjectId | null
	name: string
}

export default FolderEntity

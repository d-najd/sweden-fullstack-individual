import { ObjectId } from "mongodb"

type RequestEntity = {
	_id: ObjectId
	name: string
	url: string | null
	folder_id: ObjectId
	request_method_id: ObjectId
	json_body: string | null
}

export default RequestEntity

import { ObjectId } from "mongodb"

type RequestEntity = {
   _id: ObjectId,
   folder_id: ObjectId,
   url: string
   method_id: ObjectId,
   body: string | null
}

export default RequestEntity

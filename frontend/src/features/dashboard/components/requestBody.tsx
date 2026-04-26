import { Textarea } from "@/components/ui/textarea"
import useSelectedRequest from "../stores/selectedRequestStore"

function RequestBody() {
	const { selectedRequest, setSelectedRequest } = useSelectedRequest()

	return (
		<Textarea
			value={selectedRequest?.json_body ?? ""}
			onChange={(e) => {
				if (!selectedRequest) return

				setSelectedRequest({
					...selectedRequest,
					json_body: e.target.value,
				})
			}}
			rows={12}
		></Textarea>
	)
}

export default RequestBody

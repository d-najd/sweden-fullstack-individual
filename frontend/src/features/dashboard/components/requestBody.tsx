import { Textarea } from "@/components/ui/textarea"
import useSelectedRequestStore from "../stores/selectedRequestStore"

function RequestBody() {
	const { selectedRequest, setSelectedRequest } = useSelectedRequestStore()

	return (
		<Textarea
			value={selectedRequest?.json_body ?? ""}
			onChange={(e) => {
				if (!selectedRequest) return

				setSelectedRequest({
					...selectedRequest,
					json_body:
						e.target.value !== "" ? e.target.value : undefined,
				})
			}}
			rows={12}
		></Textarea>
	)
}

export default RequestBody

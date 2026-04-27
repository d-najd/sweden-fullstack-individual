import { Textarea } from "@/components/ui/textarea"
import useSelectedRequestStore from "../stores/selectedRequestStore"

function RequestBody({ className }: React.ComponentProps<"div">) {
	const { selectedRequest, setSelectedRequest } = useSelectedRequestStore()

	return (
		<div className={className}>
			<Textarea
				className="h-full outline-hidden! ring-0!"
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
			/>
		</div>
	)
}

export default RequestBody

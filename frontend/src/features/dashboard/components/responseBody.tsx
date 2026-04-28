import { Card } from "@/components/ui/card"
import useInvokedResponseStore from "../stores/invokedRequestStore"
import { useState, useEffect } from "react"
import Row from "@/components/Row"

function ResponseBody({ className }: React.ComponentProps<"div">) {
	const { invokedResponse } = useInvokedResponseStore()
	const [responseText, setResponseText] = useState("")

	useEffect(() => {
		if (invokedResponse) {
			const isJsonString = invokedResponse.headers
				.get("Content-Type")
				?.includes("application/json")
			invokedResponse.text().then((text) => {
				if (isJsonString) {
					text = JSON.stringify(JSON.parse(text), null, 2)
					console.log(text)
				}
				setResponseText(text)
			})
			invokedResponse.text().then(setResponseText)
		} else {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setResponseText("")
		}
	}, [invokedResponse])

	return (
		<Card className={className}>
			<Row>
				<Row className="pl-2! gap-2">
					<Card>Body</Card>
					<Card>Cookies</Card>
					<Card>Headers</Card>
					<Card>Test Results</Card>
				</Row>
				<Row className="ml-auto! pr-8! gap-2">
					<Card>
						<Row className="gap-1.5!">
							<p>{invokedResponse?.status ?? ""}</p>
							<p>{invokedResponse?.statusText ?? ""}</p>
						</Row>
					</Card>
					<Card>{invokedResponse?.duration ?? ""} ms</Card>
				</Row>
			</Row>
			<pre>{invokedResponse && responseText}</pre>
		</Card>
	)
}

export default ResponseBody

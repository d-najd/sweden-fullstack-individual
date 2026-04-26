import Row from "@/components/Row"
import { CollapsibleFileTree } from "./components/collapsableFileTree"
import RequestMenu from "./components/requestMenu"
import Column from "@/components/Column"
import RequestBody from "./components/requestBody"
import ResponseBody from "./components/responseBody"

export default function DashboardPage() {
	return (
		<>
			<Column className="pt-24!">
				<Row>
					<CollapsibleFileTree className="h-screen! w-fit! min-w-60" />
					<Column className="flex-1 px-4!">
						<RequestMenu className="" />
						<RequestBody />
						<ResponseBody />
					</Column>
				</Row>
			</Column>
		</>
	)
}

// Necessary for lazy load
export const Component = DashboardPage

import Row from "@/components/Row"
import { CollapsibleFileTree } from "./components/collapsableFileTree"
import RequestMenu from "./components/requestMenu"
import Column from "@/components/Column"

export default function DashboardPage() {
	return (
		<>
			<Column className="pt-24!">
				<Row>
					<CollapsibleFileTree className="h-screen!" />
					<RequestMenu className="w-screen!" />
				</Row>
			</Column>
		</>
	)
}

// Necessary for lazy load
export const Component = DashboardPage

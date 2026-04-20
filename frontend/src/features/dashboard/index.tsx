import { CollapsibleFileTree } from "./components/collapsableFileTree"

export default function DashboardPage() {
	return (
		<>
			<CollapsibleFileTree />
		</>
	)
}

// Necessary for lazy load
export const Component = DashboardPage

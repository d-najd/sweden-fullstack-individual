import { RequestMenu } from "./components/requestMenu"

export default function DashboardPage() {
	return (
		<>
			<RequestMenu />
		</>
	)
}

// Necessary for lazy load
export const Component = DashboardPage

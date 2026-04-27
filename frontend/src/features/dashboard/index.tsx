import { CollapsibleFileTree } from "./components/collapsableFileTree"
import RequestMenu from "./components/requestMenu"
import Column from "@/components/Column"
import RequestBody from "./components/requestBody"
import ResponseBody from "./components/responseBody"
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable"

export default function DashboardPage() {
	return (
		<>
			<Column className="h-screen">
				<ResizablePanelGroup className="pt-8!" orientation="horizontal">
					<ResizablePanel
						minSize="10%"
						maxSize="60%"
						defaultSize="20%"
					>
						<CollapsibleFileTree className="h-screen min-w-full" />
					</ResizablePanel>
					<ResizableHandle withHandle />
					<ResizablePanel className="px-2.5!">
						<ResizablePanelGroup orientation="vertical">
							<RequestMenu />
							<ResizablePanel
								minSize="15%"
								className="mt-1! mb-2!"
							>
								<RequestBody className="h-full" />
							</ResizablePanel>
							<ResizableHandle withHandle />
							<ResizablePanel minSize="15%" className="my-2!">
								<ResponseBody className="min-h-full!" />
							</ResizablePanel>
						</ResizablePanelGroup>
					</ResizablePanel>
				</ResizablePanelGroup>
			</Column>
		</>
	)
}

// Necessary for lazy load
export const Component = DashboardPage

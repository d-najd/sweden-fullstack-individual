import Row from "@/components/Row"
import {
	DropdownMenu,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import { SaveIcon, ChevronRightIcon } from "lucide-react"
import { useMemo } from "react"
import useFolderStore from "../stores/folderStore"
import useRequestStore from "../stores/requestStore"
import useSelectedRequestStore from "../stores/selectedRequestStore"
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"

type RequestTopBarItemProps = {
	text: string
	isLast: boolean
}

function RequestTopBar({ className }: React.ComponentProps<"div">) {
	const { requests, updateRequest } = useRequestStore()
	const { folders } = useFolderStore()
	const { selectedRequest } = useSelectedRequestStore()

	const requestModified = useMemo(() => {
		if (!selectedRequest) return false

		const storedRequest = requests.find((o) => o.id === selectedRequest.id)
		if (!storedRequest) return false

		return JSON.stringify(storedRequest) !== JSON.stringify(selectedRequest)
	}, [requests, selectedRequest])

	const itemTree = useMemo(() => {
		const tree: RequestTopBarItemProps[] = []

		if (!selectedRequest) {
			tree.push({
				text: "New Request",
				isLast: true,
			})
			return tree
		}

		function recurseAddTree(folderId: string) {
			const folder = folders.find((o) => o.id === folderId)!

			tree.push({
				text: folder.name,
				isLast: false,
			})

			if (folder.parent_id) {
				recurseAddTree(folder.parent_id)
			}
		}

		tree.push({
			text: selectedRequest.name,
			isLast: true,
		})
		recurseAddTree(selectedRequest.folder_id)

		return tree.reverse()
	}, [selectedRequest, folders])

	const saveButtonStyle = cva("py-0.5! px-1.5!", {
		variants: {
			enabled: {
				true: "hover:bg-white/40!",
				false: "opacity-30 hover:bg-white/20!",
			},
		},
		defaultVariants: {
			enabled: true,
		},
	})

	return (
		<Row className={className}>
			<Breadcrumb>
				<BreadcrumbList>
					{itemTree.map((o, index) => {
						const isLast = index === itemTree.length - 1
						return (
							<>
								<BreadcrumbItem
									className={clsx(
										"text-white! select-none!",
										{
											"text-muted-foreground!": !isLast,
										},
									)}
								>
									{o.text}
								</BreadcrumbItem>
								{!isLast && <BreadcrumbSeparator />}
							</>
						)
					})}
				</BreadcrumbList>
			</Breadcrumb>
			<Row className="ml-auto!">
				<ButtonGroup className="items-center">
					<Button
						onClick={() => {
							if (!requestModified) return

							updateRequest(selectedRequest.id, selectedRequest)
						}}
						className={saveButtonStyle({
							enabled: requestModified,
						})}
					>
						<SaveIcon />
						Save
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								className={saveButtonStyle({ enabled: true })}
							>
								<ChevronRightIcon className="size-3.25! rotate-90" />
							</Button>
						</DropdownMenuTrigger>
					</DropdownMenu>
				</ButtonGroup>
			</Row>
		</Row>
	)
}

export default RequestTopBar

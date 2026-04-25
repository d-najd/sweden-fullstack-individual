import {
	ChevronRightIcon,
	FileIcon,
	MoreHorizontalIcon,
	PlusIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible"
import React, { CSSProperties, useEffect } from "react"
import useFolderStore from "../stores/folderStore"
import clsx from "clsx"
import useRequestStore from "../stores/requestStore"
import FileTreeItem from "../types/FileTreeItem"
import useFileTreeStore from "../stores/fileTreeStore"
import { Input } from "@/components/ui/input"
import { cva } from "class-variance-authority"
import useSelectedRequest from "../stores/selectedRequestStore"
import { cn } from "@/lib/utils"
import { ButtonGroup } from "@chakra-ui/react"
import Row from "@/components/Row"
import requestMethodApi from "@/api/requestMethod"
import requestApi from "@/api/request"
import requestMethod from "@/api/requestMethod"
import useRequestMethodStore from "../stores/requestMethodStore"

export function CollapsibleFileTree({
	className,
}: React.ComponentProps<"div">) {
	const { loadMoreFolders } = useFolderStore()
	const { fileTree } = useFileTreeStore()

	useEffect(() => {
		loadMoreFolders()
	}, [loadMoreFolders])

	return (
		<Card
			className={cn("mx-auto w-full max-w-[16rem] gap-2", className)}
			size="sm"
		>
			<CardContent>
				<SearchBar />
				<div className="flex flex-col gap-1">
					{fileTree.map((item) => (
						<TreeItem key={item.id} fileItem={item} level={0} />
					))}
				</div>
			</CardContent>
		</Card>
	)
}

function SearchBar() {
	return <></>

	return (
		<>
			<Input />
		</>
	)
}

const TreeItem = ({
	fileItem,
	level,
}: {
	fileItem: FileTreeItem
	level: number
}) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const { loadMoreFolders } = useFolderStore()
	const { requests, loadMoreRequests } = useRequestStore()
	const { selectedRequest, setSelectedRequest } = useSelectedRequest()
	const { requestMethods } = useRequestMethodStore()

	useEffect(() => {
		if (!isOpen) return
		if (!fileItem.items) return

		loadMoreFolders(fileItem.id)
		loadMoreRequests(fileItem.id)
	}, [fileItem, isOpen, loadMoreFolders, loadMoreRequests])

	const sharedButtonStyleCss = (): CSSProperties => ({
		paddingLeft: (level + 1) * 16,
	})

	const sharedButtonStyle = cva(`w-full justify-start`, {
		variants: {
			selected: {
				true: "bg-white/20!",
				false: "hover:bg-white/10!",
			},
		},
		defaultVariants: {
			selected: false,
		},
	})

	const rightButtonsActionsStyle = cn(
		"opacity-0! group-hover:opacity-30! hover:opacity-75!",
	)

	const selected = selectedRequest && selectedRequest.id === fileItem.id
	if (fileItem.items) {
		return (
			<Collapsible
				open={isOpen}
				onOpenChange={setIsOpen}
				key={fileItem.id}
			>
				<CollapsibleTrigger asChild>
					<ButtonGroup
						className={cn(
							sharedButtonStyle({ selected: selected }),
							"group",
						)}
						style={sharedButtonStyleCss()}
					>
						<Button variant="ghost" size="xs">
							<ChevronRightIcon
								className={clsx("transition-transform", {
									"rotate-90": isOpen,
								})}
							/>
							{fileItem.name}
						</Button>
						<Row className="ml-auto! px-2! gap-2!">
							<Button
								size="xs"
								onClick={(e) => {
									e.stopPropagation()

									const getRequestMethod =
										requestMethods.find(
											(o) => o.name === "GET",
										)!

									requestApi
										.create({
											name: "New Request",
											folder_id: fileItem.id,
											request_method_id:
												getRequestMethod.id,
										})
										.then(() => {
											loadMoreRequests(fileItem.id, true)
										})
								}}
								className={rightButtonsActionsStyle}
							>
								<PlusIcon />
							</Button>
							<Button
								size="xs"
								onClick={(e) => e.stopPropagation()}
								className={rightButtonsActionsStyle}
							>
								<MoreHorizontalIcon />
							</Button>
						</Row>
					</ButtonGroup>
				</CollapsibleTrigger>
				<CollapsibleContent className="">
					<div className="">
						{fileItem.items.map((child) => (
							<TreeItem
								key={child.id}
								fileItem={child}
								level={level + 1}
							/>
						))}
					</div>
				</CollapsibleContent>
			</Collapsible>
		)
	}

	return (
		<ButtonGroup
			key={fileItem.id}
			className={sharedButtonStyle({ selected: selected })}
			style={sharedButtonStyleCss()}
			onClick={() =>
				setSelectedRequest(requests.find((o) => o.id === fileItem.id)!)
			}
		>
			<Button size="xs">
				<FileIcon />
				{fileItem.name}
			</Button>
		</ButtonGroup>
	)
}

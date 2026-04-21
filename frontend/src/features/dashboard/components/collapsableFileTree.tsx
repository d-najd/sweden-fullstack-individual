import { ChevronRightIcon, FileIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible"
import React, { useEffect } from "react"
import useFolderStore from "../stores/folderStore"
import clsx from "clsx"
import useRequestStore from "../stores/requestStore"
import FileTreeItem from "../types/FileTreeItem"
import useFileTreeStore from "../stores/fileTreeStore"

export function CollapsibleFileTree() {
	const { loadMoreFolders } = useFolderStore()
	const { fileTree } = useFileTreeStore()

	useEffect(() => {
		loadMoreFolders()
	}, [loadMoreFolders])

	return (
		<Card className="mx-auto w-full max-w-[16rem] gap-2" size="sm">
			<CardContent>
				<div className="flex flex-col gap-1">
					{fileTree.map((item) => (
						<TreeItem key={item.id} fileItem={item} />
					))}
				</div>
			</CardContent>
		</Card>
	)
}

const TreeItem = ({ fileItem }: { fileItem: FileTreeItem }) => {
	const [isOpen, setIsOpen] = React.useState(false)
	const { loadMoreFolders } = useFolderStore()
	const { loadMoreRequests } = useRequestStore()

	useEffect(() => {
		if (!isOpen) return
		if (!fileItem.items) return

		loadMoreFolders(fileItem.id)
		loadMoreRequests(fileItem.id)
	}, [fileItem, isOpen, loadMoreFolders, loadMoreRequests])

	if (fileItem.items) {
		return (
			<Collapsible
				open={isOpen}
				onOpenChange={setIsOpen}
				key={fileItem.id}
			>
				<CollapsibleTrigger asChild>
					<Button
						variant="ghost"
						size="sm"
						className="group w-full justify-start transition-none hover:bg-accent hover:text-accent-foreground"
					>
						<ChevronRightIcon
							className={clsx("transition-transform", {
								"rotate-90": isOpen,
							})}
						/>
						{fileItem.name}
					</Button>
				</CollapsibleTrigger>
				<CollapsibleContent className="mt-1 ml-5 style-lyra:ml-4">
					<div className="flex flex-col gap-1">
						{fileItem.items.map((child) => (
							<TreeItem key={child.id} fileItem={child} />
						))}
					</div>
				</CollapsibleContent>
			</Collapsible>
		)
	}

	return (
		<Button
			key={fileItem.id}
			size="sm"
			className="w-full justify-start gap-2 text-foreground"
		>
			<FileIcon />
			<span>{fileItem.name}</span>
		</Button>
	)
}

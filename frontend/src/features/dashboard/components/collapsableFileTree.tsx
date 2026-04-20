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

// const fileTreeExample: FileTreeItem[] = [
// 	{
// 		name: "components",
// 		items: [
// 			{
// 				name: "ui",
// 				items: [
// 					{ name: "button.tsx" },
// 					{ name: "card.tsx" },
// 					{ name: "dialog.tsx" },
// 					{ name: "input.tsx" },
// 					{ name: "select.tsx" },
// 					{ name: "table.tsx" },
// 				],
// 			},
// 			{ name: "login-form.tsx" },
// 			{ name: "register-form.tsx" },
// 		],
// 	},
// 	{
// 		name: "lib",
// 		items: [{ name: "utils.ts" }, { name: "cn.ts" }, { name: "api.ts" }],
// 	},
// 	{
// 		name: "hooks",
// 		items: [
// 			{ name: "use-media-query.ts" },
// 			{ name: "use-debounce.ts" },
// 			{ name: "use-local-storage.ts" },
// 		],
// 	},
// 	{
// 		name: "types",
// 		items: [{ name: "index.d.ts" }, { name: "api.d.ts" }],
// 	},
// 	{
// 		name: "public",
// 		items: [
// 			{ name: "favicon.ico" },
// 			{ name: "logo.svg" },
// 			{ name: "images" },
// 		],
// 	},
// 	{ name: "app.tsx" },
// 	{ name: "layout.tsx" },
// 	{ name: "globals.css" },
// 	{ name: "package.json" },
// 	{ name: "tsconfig.json" },
// 	{ name: "README.md" },
// 	{ name: ".gitignore" },
// ]

type FileTreeItem = {
	id: string
	name: string
	items?: FileTreeItem[]
}

export function CollapsibleFileTree() {
	const { folders, loadMoreFolders } = useFolderStore()

	useEffect(() => {
		loadMoreFolders()
	}, [loadMoreFolders])

	const fileTree: FileTreeItem[] = React.useMemo(() => {
		const map = new Map<string, FileTreeItem>()

		folders.forEach((f) => {
			map.set(f.id, {
				id: f.id,
				name: f.name,
				items: [],
			})
		})

		const roots: FileTreeItem[] = []
		folders.forEach((f) => {
			const node = map.get(f.id)!

			if (f.parent_id) {
				const parent = map.get(f.parent_id)
				if (parent) {
					parent.items.push(node)
				}
			} else {
				roots.push(node)
			}
		})

		return roots
	}, [folders])

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

	useEffect(() => {
		if (!isOpen) return
		if (!fileItem.items) return

		loadMoreFolders(fileItem.id)
	}, [fileItem, isOpen, loadMoreFolders])

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
			variant="link"
			size="sm"
			className="w-full justify-start gap-2 text-foreground"
		>
			<FileIcon />
			<span>{fileItem.name}</span>
		</Button>
	)
}

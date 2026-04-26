import {
	ChevronRightIcon,
	FileIcon,
	MoreHorizontalIcon,
	PlusIcon,
} from "lucide-react"

import Row from "@/components/Row"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import React, { CSSProperties, useEffect } from "react"
import useFileTreeStore from "../stores/fileTreeStore"
import useFolderStore from "../stores/folderStore"
import useRequestStore from "../stores/requestStore"
import useSelectedRequest from "../stores/selectedRequestStore"
import FileTreeItem from "../types/FileTreeItem"
import { DropdownMenu as DropdownMenuPrimitive } from "radix-ui"
import { ButtonGroup } from "@/components/ui/button-group"
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

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

function DropdownMenuItemCustom({
	className,
	inset,
	variant = "default",
	...props
}: React.ComponentProps<typeof DropdownMenuPrimitive.Item> & {
	inset?: boolean
	variant?: "default" | "destructive"
}) {
	return (
		<DropdownMenuItem
			className={cn(className, "px-2! py-2! focus:outline-hidden!")}
			inset={inset}
			variant={variant}
			{...props}
		/>
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
	const [newName, setNewName] = React.useState(fileItem.name)
	const {
		folders,
		createFolder,
		renameFolder,
		deleteFolder,
		loadMoreFolders,
	} = useFolderStore()
	const {
		requests,
		createRequest,
		updateRequest,
		deleteRequest,
		loadMoreRequests,
	} = useRequestStore()
	const { selectedRequest, setSelectedRequest } = useSelectedRequest()

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

									createRequest(fileItem.id)
								}}
								className={rightButtonsActionsStyle}
							>
								<PlusIcon />
							</Button>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										size="xs"
										onClick={(e) => e.stopPropagation()}
										className={rightButtonsActionsStyle}
									>
										<MoreHorizontalIcon />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									<DropdownMenuItemCustom
										onClick={(e) => {
											e.stopPropagation()

											createRequest(fileItem.id)
										}}
									>
										Add Request
									</DropdownMenuItemCustom>
									<DropdownMenuItemCustom
										onClick={(e) => {
											e.stopPropagation()

											createFolder(fileItem.id)
										}}
									>
										Add Folder
									</DropdownMenuItemCustom>
									<DropdownMenuSeparator />
									<DropdownMenuItemCustom>
										Run
									</DropdownMenuItemCustom>
									<DropdownMenuSeparator />
									<DropdownMenuItemCustom>
										Share
									</DropdownMenuItemCustom>
									<DropdownMenuItemCustom>
										Copy Link
									</DropdownMenuItemCustom>
									<DropdownMenuSeparator />
									<Dialog>
										<DialogTrigger asChild>
											<DropdownMenuItemCustom
												onSelect={(e) => {
													e.preventDefault()
												}}
												onClick={(e) => {
													e.stopPropagation()

													setNewName(fileItem.name)
												}}
											>
												Rename
											</DropdownMenuItemCustom>
										</DialogTrigger>
										<DialogContent
											onClick={(e) => {
												e.stopPropagation()
											}}
										>
											<DialogHeader>
												<DialogTitle>
													Rename
												</DialogTitle>
											</DialogHeader>
											<Input
												autoFocus
												value={newName}
												onChange={(o) =>
													setNewName(o.target.value)
												}
											/>
											<DialogFooter>
												<DialogClose asChild>
													<Button
														className="pr-4!"
														onClick={(e) => {
															e.stopPropagation()

															const parentId =
																folders.find(
																	(o) =>
																		o.id ===
																		fileItem.id,
																)!.parent_id

															renameFolder(
																fileItem.id,
																{
																	parent_id:
																		parentId,
																	name: newName,
																},
															)
														}}
													>
														Rename
													</Button>
												</DialogClose>
											</DialogFooter>
										</DialogContent>
									</Dialog>
									<DropdownMenuItemCustom>
										Copy
									</DropdownMenuItemCustom>
									<DropdownMenuItemCustom>
										Duplicate
									</DropdownMenuItemCustom>
									<DropdownMenuItemCustom
										onClick={(e) => {
											e.stopPropagation()

											deleteFolder(fileItem.id)
										}}
									>
										Delete
									</DropdownMenuItemCustom>
								</DropdownMenuContent>
							</DropdownMenu>
						</Row>
					</ButtonGroup>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<div>
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
			className={cn(sharedButtonStyle({ selected: selected }), "group")}
			style={sharedButtonStyleCss()}
			onClick={() =>
				setSelectedRequest(requests.find((o) => o.id === fileItem.id)!)
			}
		>
			<Button size="xs">
				<FileIcon />
				{fileItem.name}
			</Button>
			<Row className="ml-auto! px-2! gap-2!">
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Button
							size="xs"
							className={cn(rightButtonsActionsStyle)}
						>
							<MoreHorizontalIcon />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItemCustom>
							Add Example
						</DropdownMenuItemCustom>
						<DropdownMenuSeparator />
						<DropdownMenuItemCustom>Share</DropdownMenuItemCustom>
						<DropdownMenuItemCustom>
							Copy Link
						</DropdownMenuItemCustom>
						<DropdownMenuItemCustom>Copy</DropdownMenuItemCustom>
						<DropdownMenuItemCustom>
							Duplicate
						</DropdownMenuItemCustom>
						<Dialog>
							<DialogTrigger asChild>
								<DropdownMenuItemCustom
									onSelect={(e) => {
										e.preventDefault()
									}}
									onClick={(e) => {
										e.stopPropagation()

										setNewName(fileItem.name)
									}}
								>
									Rename
								</DropdownMenuItemCustom>
							</DialogTrigger>
							<DialogContent
								onClick={(e) => {
									e.stopPropagation()
								}}
							>
								<DialogHeader>
									<DialogTitle>Rename</DialogTitle>
								</DialogHeader>
								<Input
									autoFocus
									value={newName}
									onChange={(o) => setNewName(o.target.value)}
								/>
								<DialogFooter>
									<DialogClose asChild>
										<Button
											className="pr-4!"
											onClick={(e) => {
												e.stopPropagation()

												const prevRequest =
													requests.find(
														(o) =>
															o.id ===
															fileItem.id,
													)

												updateRequest(fileItem.id, {
													...prevRequest,
													name: newName,
												})
											}}
										>
											Rename
										</Button>
									</DialogClose>
								</DialogFooter>
							</DialogContent>
						</Dialog>
						<DropdownMenuItemCustom
							onClick={(e) => {
								e.stopPropagation()

								deleteRequest(fileItem.id)
							}}
						>
							Delete
						</DropdownMenuItemCustom>
					</DropdownMenuContent>
				</DropdownMenu>
			</Row>
		</ButtonGroup>
	)
}

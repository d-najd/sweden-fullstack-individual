import Column from "@/components/Column"
import Row from "@/components/Row"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
	DropdownMenu,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group"
import { cva } from "class-variance-authority"
import clsx from "clsx"
import { ChevronRightIcon, SaveIcon } from "lucide-react"
import useSelectedRequest from "../stores/selectedTreeStoreItemStore"
import { useState } from "react"

const optionsButtonStyle = cva("p-1!", {
	variants: {
		enabled: {
			true: "bg-white/10! text-white!",
			false: "text-white/50! hover:text-white!",
		},
	},
	defaultVariants: {
		enabled: false,
	},
})

const RequestMenuSetting = {
	Docs: "Docs",
	Params: "Params",
	Authorization: "Authorization",
	Body: "Body",
	Scripts: "Scripts",
	Settings: "Settings",
}

function RequestMenu() {
	const [selectedMenuSetting] = useState(RequestMenuSetting.Body)
	const requestMenuSettingsValues = Object.values(RequestMenuSetting)

	return (
		<>
			<Column>
				<Row>
					<NavigationBar />
				</Row>
				<Row>
					<InputGroup className="outline-solid! outline-teal-700! outline-1!">
						<InputGroupAddon className="outline-none!">
							<InputGroupButton className="outline-none!">
								<div className="w-1.5"></div>
								<p>GET</p>
								<div className="w-10"></div>
								<ChevronRightIcon className="rotate-90" />
								<div className="w-1 h-full border-solid! border-teal-900! border-l-2! "></div>
							</InputGroupButton>
						</InputGroupAddon>
						<InputGroupInput className="focus:outline-none!" />
					</InputGroup>
					<ButtonGroup className="pl-1.5!">
						<Button className="bg-blue-500! h-full pl-4! pr-4!">
							Send
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button className="bg-blue-500! px-1.5! h-full border-l! border-l-black!">
									<ChevronRightIcon className="rotate-90" />
								</Button>
							</DropdownMenuTrigger>
						</DropdownMenu>
					</ButtonGroup>
				</Row>
				<ButtonGroup>
					{requestMenuSettingsValues.map((name) => {
						return (
							<Button
								className={optionsButtonStyle({
									enabled: selectedMenuSetting === name,
								})}
								key={name}
							>
								{name}
							</Button>
						)
					})}
				</ButtonGroup>
				<Row>
					<Button>Test</Button>
				</Row>
			</Column>
		</>
	)
}

type NavigationBarItemProps = {
	text: string
	isLast: boolean
	onClick: () => void
}

function NavigationBar() {
	const { selectedRequest: selectedTreeItem } = useSelectedRequest()
	const itemTree: NavigationBarItemProps[] = []

	if (selectedTreeItem) {
		itemTree.push({
			text: selectedTreeItem.name,
			isLast: true,
			onClick: () => {},
		})
	} else {
		itemTree.push({
			text: "New Request",
			isLast: true,
			onClick: () => {},
		})
	}

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
		<>
			{itemTree.map((o, index) => {
				const isLast = index === itemTree.length - 1
				return (
					<>
						<NavigationBarItem
							text={o.text}
							isLast={isLast}
							onClick={() => {}}
						/>
					</>
				)
			})}
			<Row className="ml-auto!">
				<ButtonGroup className="items-center">
					<Button className={saveButtonStyle({ enabled: false })}>
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
		</>
	)
}

function NavigationBarItem({ text, isLast, onClick }: NavigationBarItemProps) {
	return (
		<>
			<Button onClick={onClick}>
				<p
					className={clsx("", {
						"text-muted-foreground": !isLast,
					})}
				>
					{text}
				</p>
			</Button>
			{!isLast && <ChevronRightIcon />}
		</>
	)
}

export default RequestMenu

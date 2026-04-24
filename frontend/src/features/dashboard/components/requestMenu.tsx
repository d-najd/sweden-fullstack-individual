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
import clsx from "clsx"
import { ChevronRightIcon } from "lucide-react"
import useSelectedRequest from "../stores/selectedTreeStoreItemStore"

function RequestMenu() {
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
				<ButtonGroup className="gap-1 *:px-2! *:py-1!">
					<Button>Docs</Button>
					<Button>Params</Button>
					<Button>Authorization</Button>
					<Button>Headers</Button>
					<Button>Body</Button>
					<Button>Scripts</Button>
					<Button>Settings</Button>
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
			<Row className="ml-auto! h-full!">
            <ButtonGroup>
            </ButtonGroup>

				<ButtonGroup className="pl-1.5!">
					<Button className="bg-blue-500! h-full pl-4! pr-4!">
						Send
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="bg-blue-500! px-1.5! h-full! border-l! border-l-black!">
								<ChevronRightIcon className="rotate-90" />
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

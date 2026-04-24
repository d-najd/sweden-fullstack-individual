import Row from "@/components/Row"
import useSelectedRequest from "../stores/selectedTreeStoreItemStore"
import { ChevronRightIcon, MoreHorizontal, MoreHorizontalIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import clsx from "clsx"
import Column from "@/components/Column"
import { Input } from "@/components/ui/input"
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group"
import { DropdownMenu, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ButtonGroup } from "@/components/ui/button-group"

function RequestMenu() {
	return (
		<>
			<Column>
				<Row>
					<NavigationBar />
				</Row>
				<Row>
					<InputGroup className="outline-solid! outline-teal-700! outline-2!">
						<InputGroupAddon className="outline-none!">
							<InputGroupButton className="outline-none!">
								<div className="w-1"></div>
								<p>GET</p>
								<div className="w-2"></div>
								<ChevronRightIcon className="rotate-90" />
								<div className="w-1 h-full border-solid! border-teal-900! border-l-2! "></div>
							</InputGroupButton>
						</InputGroupAddon>
						<InputGroupInput className="focus:outline-none!"/>
					</InputGroup>
               <ButtonGroup className="">
                  <Button className="bg-blue-500! h-full pl-3! pr-3!">Send</Button>
                  <DropdownMenu>
                     <DropdownMenuTrigger asChild>
                        <Button className="bg-blue-500! px-1.5! h-full border-l-1! border-l-black!">
                           <MoreHorizontalIcon />
                        </Button>
                     </DropdownMenuTrigger>
                  </DropdownMenu>
               </ButtonGroup>
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

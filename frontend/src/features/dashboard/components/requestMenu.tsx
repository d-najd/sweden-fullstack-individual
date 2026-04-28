import Column from "@/components/Column"
import Row from "@/components/Row"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
} from "@/components/ui/input-group"
import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { ChevronRightIcon } from "lucide-react"
import { useState } from "react"
import requestService from "../services/requestService"
import useInvokedResponseStore from "../stores/invokedRequestStore"
import useRequestMethodStore from "../stores/requestMethodStore"
import useSelectedRequestStore from "../stores/selectedRequestStore"
import RequestTopBar from "./requestTopBar"
import { toast } from "sonner"

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

function RequestMenu({ className }: React.ComponentProps<"div">) {
	const [selectedMenuSetting] = useState(RequestMenuSetting.Body)
	const { selectedRequest, setSelectedRequest } = useSelectedRequestStore()
	const { requestMethods } = useRequestMethodStore()
	const { setInvokedResponse } = useInvokedResponseStore()
	const requestMenuSettingsValues = Object.values(RequestMenuSetting)

	const sendButtonStyle = cn("bg-blue-500! hover:bg-blue-700!")

	const requestMethodText = selectedRequest?.request_method_id
		? requestMethods.find((o) => o.id === selectedRequest.request_method_id)
				.name
		: "GET"

	return (
		<>
			<Column className={className}>
				<RequestTopBar className="pb-1.5!" />
				<Row>
					<InputGroup className="outline-solid! outline-teal-700! outline-1!">
						<InputGroupAddon className="outline-none!">
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<InputGroupButton className="outline-none!">
										<div className="w-1.5"></div>
										<p>{requestMethodText}</p>
										<div className="w-10"></div>
										<ChevronRightIcon className="rotate-90" />
										<div className="w-1 h-full border-solid! border-teal-900! border-l-2! "></div>
									</InputGroupButton>
								</DropdownMenuTrigger>
								<DropdownMenuContent>
									{requestMethods.map((requestMethod) => {
										return (
											<DropdownMenuItem
												key={requestMethod.id}
												onClick={() => {
													if (!selectedRequest) return

													setSelectedRequest({
														...selectedRequest,
														request_method_id:
															requestMethod.id,
													})
												}}
											>
												{requestMethod.name}
											</DropdownMenuItem>
										)
									})}
								</DropdownMenuContent>
							</DropdownMenu>
						</InputGroupAddon>
						<InputGroupInput
							value={selectedRequest?.url ?? ""}
							onChange={(o) =>
								setSelectedRequest({
									...selectedRequest,
									url:
										o.target.value !== ""
											? o.target.value
											: undefined,
								})
							}
							className="focus:outline-none!"
						/>
					</InputGroup>
					<ButtonGroup className="pl-1.5!">
						<Button
							onClick={() => {
								requestService
									.invokeRequest(selectedRequest)
									.then((response) => {
										setInvokedResponse(response)
									})
									.catch(() => {
										toast("Invalid Request")
									})
							}}
							className={cn(
								sendButtonStyle,
								"h-full pl-4! pr-4!",
							)}
						>
							Send
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button
									className={cn(
										sendButtonStyle,
										"px-1.5! h-full border-l! border-l-black!",
									)}
								>
									<ChevronRightIcon className="rotate-90" />
								</Button>
							</DropdownMenuTrigger>
						</DropdownMenu>
					</ButtonGroup>
				</Row>
				<ButtonGroup className="pt-1!">
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
			</Column>
		</>
	)
}

export default RequestMenu

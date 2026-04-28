import { Theme } from "@chakra-ui/react"
import AppRouter from "./router"
import { chakraThemeColor } from "@/config/chakraConfig"
import { Toaster } from "sonner"

export default function App() {
	return (
		<Theme appearance={chakraThemeColor}>
			<AppRouter />
			<Toaster />
		</Theme>
	)
}

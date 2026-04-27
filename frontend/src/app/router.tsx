import { createBrowserRouter, RouterProvider } from "react-router-dom"

const createAppRouter = () =>
	createBrowserRouter([
		{
			path: "/",
			lazy: () => import("@/features/dashboard"),
		},
	])

export default function AppRouter() {
	return <RouterProvider router={createAppRouter()} />
}

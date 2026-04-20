import { createBrowserRouter, RouterProvider } from "react-router-dom"

const createAppRouter = () =>
	createBrowserRouter([
		{
			path: "*",
			lazy: () => import("@/features/not-found"),
		},
		{
			path: "/",
			lazy: () => import("@/features/welcome"),
		},
		{
			path: "/dashboard",
			lazy: () => import("@/features/dashboard"),
		},
	])

export default function AppRouter() {
	return <RouterProvider router={createAppRouter()} />
}

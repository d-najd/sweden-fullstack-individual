import { create } from "zustand"
import useFolderStore from "./folderStore"
import useRequestStore from "./requestStore"
import FileTreeItem from "../types/FileTreeItem"
import FolderDto from "@/shared/types/folder/folder.dto"
import RequestDto from "@/shared/types/request/request.dto"

export interface FileTreeStore {
	fileTree: FileTreeItem[]
}

const computeFileTree = (
	folders: FolderDto[],
	requests: RequestDto[],
): FileTreeItem[] => {
	const map = new Map<string, FileTreeItem>()

	folders.forEach((o) => {
		map.set(o.id, {
			id: o.id,
			name: o.name,
			items: [],
		})
	})

	requests.forEach((o) => {
		map.set(o.id, {
			id: o.id,
			name: o.name,
		})
	})

	const roots: FileTreeItem[] = []

	folders.forEach((o) => {
		const node = map.get(o.id)!
		if (o.parent_id) {
			const parent = map.get(o.parent_id)
			if (parent) {
				parent.items.push(node)
			}
		} else {
			roots.push(node)
		}
	})

	requests.forEach((o) => {
		const node = map.get(o.id)!
		if (o.folder_id) {
			const parent = map.get(o.folder_id)
			if (parent) {
				parent.items.push(node)
			}
		} else {
			roots.push(node)
		}
	})

	return roots
}

const useFileTreeStore = create<FileTreeStore>((set) => {
	const folders = useFolderStore.getState().folders
	const requests = useRequestStore.getState().requests
	const initialTree = computeFileTree(folders, requests)

	useFolderStore.subscribe(
		(state) => state.folders,
		(folders) => {
			const requests = useRequestStore.getState().requests
			const fileTree = computeFileTree(folders, requests)
			set({ fileTree })
		},
	)

	useRequestStore.subscribe(
		(state) => state.requests,
		(requests) => {
			const folders = useFolderStore.getState().folders
			const fileTree = computeFileTree(folders, requests)
			set({ fileTree })
		},
	)

	return {
		fileTree: initialTree,
	}
})

export default useFileTreeStore

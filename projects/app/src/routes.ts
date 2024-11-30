import type { Routes } from "@angular/router"

export const routes: Routes = [
	{
		path: "",
		loadComponent: () =>
			import("./app/features/home/home.component").then((m) => m.HomeFeature),
		title: "Home",
	},
]

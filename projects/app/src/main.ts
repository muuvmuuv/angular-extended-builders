import {
	provideAppInitializer,
	provideExperimentalZonelessChangeDetection,
} from "@angular/core"
import { bootstrapApplication } from "@angular/platform-browser"
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async"
import { provideRouter, withComponentInputBinding } from "@angular/router"

import { AppComponent } from "./app/app.component"
import { routes } from "./routes"

bootstrapApplication(AppComponent, {
	providers: [
		provideExperimentalZonelessChangeDetection(),
		provideRouter(routes, withComponentInputBinding()),
		provideAnimationsAsync(),
		provideAppInitializer(() => {
			console.log("Initiated!")
		}),
	],
}).catch((error) => {
	console.error(error)
})

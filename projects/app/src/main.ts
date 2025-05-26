import { provideHttpClient, withFetch } from "@angular/common/http"
import {
	CSP_NONCE,
	inject,
	provideAppInitializer,
	provideZonelessChangeDetection,
} from "@angular/core"
import { bootstrapApplication } from "@angular/platform-browser"
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async"
import { provideRouter, withComponentInputBinding } from "@angular/router"
import { InMemoryCache } from "@apollo/client/cache"
import { provideApollo } from "apollo-angular"
import { HttpLink } from "apollo-angular/http"

import { AppComponent } from "./app/app.component"
import { environment } from "./environments/environment"
import { routes } from "./routes"

bootstrapApplication(AppComponent, {
	providers: [
		{
			provide: CSP_NONCE,
			useValue: NONCE,
		},
		provideZonelessChangeDetection(),
		provideRouter(routes, withComponentInputBinding()),
		provideAnimationsAsync(),
		provideHttpClient(withFetch()),
		provideApollo(() => {
			const httpLink = inject(HttpLink)

			return {
				link: httpLink.create({
					uri: "https://spacex-production.up.railway.app",
				}),
				cache: new InMemoryCache(),
				assumeImmutableResults: true,
				devtools: {
					enabled: !environment.production,
				},
			}
		}),
		provideAppInitializer(() => {
			console.log("Initiated!")
		}),
	],
}).catch((error) => {
	console.error(error)
})

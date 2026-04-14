import { provideHttpClient, withFetch } from "@angular/common/http"
import { CSP_NONCE, inject, provideZonelessChangeDetection } from "@angular/core"
import { bootstrapApplication } from "@angular/platform-browser"
import { provideRouter, withComponentInputBinding } from "@angular/router"
import { InMemoryCache } from "@apollo/client/cache"
import { provideApollo } from "apollo-angular"
import { HttpLink } from "apollo-angular/http"

import { routes } from "@/app/routes"

import { AppComponent } from "./app/app.component"
import { environment } from "./environments/environment"

void bootstrapApplication(AppComponent, {
	providers: [
		{
			provide: CSP_NONCE,
			useValue: NONCE,
		},
		provideZonelessChangeDetection(),
		provideRouter(routes, withComponentInputBinding()),
		provideHttpClient(withFetch()),
		provideApollo(() => {
			const httpLink = inject(HttpLink)

			return {
				link: httpLink.create({
					uri: "https://rickandmortyapi.com/graphql",
				}),
				cache: new InMemoryCache(),
				assumeImmutableResults: true,
				devtools: {
					enabled: !environment.production,
				},
			}
		}),
	],
}).catch(console.error)

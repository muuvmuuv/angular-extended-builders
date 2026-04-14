import { Injectable, inject } from "@angular/core"
import { Apollo } from "apollo-angular"
import { map } from "rxjs/operators"

import type {
	CharactersQuery,
	CharactersQueryVariables,
} from "./generated-rick-morty.interface"
import QueryCharacters from "./queries/characters.graphql"

@Injectable({
	providedIn: "root",
})
export class RickMortyService {
	readonly #apollo = inject(Apollo)

	characters() {
		return this.#apollo
			.query<CharactersQuery, CharactersQueryVariables>({
				query: QueryCharacters,
			})
			.pipe(map((response) => response.data?.characters))
	}
}

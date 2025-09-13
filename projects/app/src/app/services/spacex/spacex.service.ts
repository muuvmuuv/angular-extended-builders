import { Injectable, inject } from "@angular/core"
import { Apollo } from "apollo-angular"
import { map } from "rxjs/operators"

import type {
	CompanyQuery,
	CompanyQueryVariables,
} from "./generated-spacex.interface"
import QueryCompany from "./queries/company.graphql"

@Injectable({
	providedIn: "root",
})
export class SpaceXService {
	readonly #apollo = inject(Apollo)

	companyInfo() {
		return this.#apollo
			.query<CompanyQuery, CompanyQueryVariables>({
				query: QueryCompany,
			})
			.pipe(
				map((response) => {
					return response.data?.company
				}),
			)
	}
}

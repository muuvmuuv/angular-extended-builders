import {
	ChangeDetectionStrategy,
	Component,
	inject,
	resource,
} from "@angular/core"
import { RouterOutlet } from "@angular/router"
import { formatISO } from "date-fns"
import { xxhash64 } from "hash-wasm"
import { nanoid } from "nanoid"
import { firstValueFrom } from "rxjs"

import { SpaceXService } from "./services/spacex/spacex.service"

@Component({
	selector: "app-root",
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [RouterOutlet],
})
export class AppComponent {
	readonly spaceXService = inject(SpaceXService)

	readonly uid = nanoid()
	readonly now = formatISO(new Date())

	readonly randomHash = resource({
		loader: () => xxhash64(this.uid),
	})

	readonly appVersion = APP_VERSION
	readonly appHash = APP_HASH
	readonly buildDate = BUILD_DATE
	readonly buildEnv = BUILD_ENV

	readonly spaceXCompanyInfo = resource({
		loader: () => firstValueFrom(this.spaceXService.companyInfo()),
	})
}

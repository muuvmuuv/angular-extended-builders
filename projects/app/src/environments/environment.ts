import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev"

import type { Environment } from "./interface"

loadDevMessages()
loadErrorMessages()

export const environment: Environment = {
	production: false,
}

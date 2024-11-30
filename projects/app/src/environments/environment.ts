import { loadDevMessages, loadErrorMessages } from "@apollo/client/dev"

import type { Environment } from "./interface"

export const environment: Environment = {
	production: false,
}

loadDevMessages()
loadErrorMessages()

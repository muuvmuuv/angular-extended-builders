#!/usr/bin/env fish

fish_add_path ./node_modules/.bin

ng update --allow-dirty --force @angular/cli@next

pnpm -w update

set TS_VERSION $(pnpm info --json @angular/build@next | jq '.peerDependencies.typescript' | xargs)
pnpm add --dev --save-exact --loglevel=error "typescript@$TS_VERSION"

pnpm format

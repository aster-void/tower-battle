i: install
install:
    cd client; bun install
    just sync
sync:
    cd client; bun sync

dev:
    trap 'kill 0' EXIT; just dev-client & wait

dev-client:
    cd client; bun dev

check: check-client
check-client:
    cd client; bun check

fix: format
format:
    deno fmt .

build:
    cd client; bun run build

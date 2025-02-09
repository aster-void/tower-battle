i: install
install:
    cd server; bun install
    cd client; bun install
    just sync
sync:
    cd client; bun sync

dev:
    trap 'kill 0' EXIT; just dev-client & just dev-server & wait

dev-client:
    cd client; bun dev
dev-server:
    cd server; bun dev

check: check-server check-client
check-server:
    cd server; bun check
check-client:
    cd client; bun check

fix: format
format:
    deno fmt .

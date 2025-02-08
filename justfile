i: install
install:
    cd core; bun install
    cd server; bun install
    cd client; bun install

dev:
    trap 'kill 0' EXIT; just dev-client & just dev-server & wait

dev-client:
    cd client; bun dev
dev-server:
    cd server; bun dev

check: check-core check-server check-client
check-core:
    cd core; bun check
check-server:
    cd server; bun check
check-client:
    cd client; bun check

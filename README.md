# Tower

product for Hackathon 2025-02-08 -> 2025-02-09.

## Release

see <https://tower-d5g.pages.dev/>

## Development / Deployment

```sh name=dev
nix-shell # or direnv allow
just i
just dev
```
```sh name=deploy
just i
just build
serve ./client/build
```

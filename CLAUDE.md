# bcard — Claude Instructions

## Releasing a new version

After completing changes, release by running from `/home/radgh/claude/`:

```bash
cd /home/radgh/claude && ./release.sh bcard
```

This will:
1. Run `npm run build` in `/home/radgh/claude/bcard/`
2. Copy the full project (source + dist) to `bcard_releases/vN/` (auto-incrementing version)
3. The releases server at `http://localhost:5173/bcard/` auto-detects the new version — no restart needed

## Dev server

The Vite dev server runs on port **5174** (shifted to avoid conflict with the releases server). If it's not running, start it with:

```bash
nohup npm run dev -- --host --port 5174 > /tmp/bcard-dev.log 2>&1 &
```

## Releases server

The bcard releases server (`bcard_releases/serve.js` on port **5173**) serves:
- `http://localhost:5173/bcard/` → latest release (auto-detected)
- `http://localhost:5173/bcard/vN/` → specific version

If the releases server isn't running, restart it:

```bash
cd /home/radgh/claude && ./restart_bcard_server.sh
```

## Release history

Releases live in `/home/radgh/claude/bcard_releases/`:
- `v1/` — initial version
- `v2/` — current release (2026-04-08)

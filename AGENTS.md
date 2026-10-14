# ISP Support Akvorado deployment

The operator-facing product name is **ISP-BGP Monitoring** (exact spelling).

- Keep `docker/docker-compose-branding.yml` enabled in `.env` for installation and upgrades. Use `bin/compose` from this checkout so the root `.env` is loaded. On older installations without that wrapper, use `docker compose --env-file <existing-root>/.env --project-name <existing-project>` from the existing root.
- The `isp-branding` service changes the browser title and navigation text using files under `branding/`. It applies to freshly recreated upstream containers without patching Akvorado binaries or hashed JavaScript bundles.
- Preserve upstream Akvorado version reporting, API paths, documentation, source credits and licenses. Keep collection, Kafka and ClickHouse unchanged for presentation-only work.
- After an upstream version upgrade, open the live console, verify **ISP-BGP Monitoring** in the header and browser title, then navigate to Visualize and Documentation. Check that the real version remains visible, API requests work and fresh flow rows continue to arrive. If upstream navigation markup or its HTML entry point changes, adapt the branding selectors/injection before considering the upgrade complete.
- The branding container has no published ports. Only public HTML/assets use it; `/api/` and `/debug` retain the existing Traefik routes.
- Before an existing installation is changed, save its Compose/env files and prepare rollback. Stopping `isp-branding` removes its Traefik route and restores the original console; do not remove data volumes.
- For branding-only changes on an existing installation, run `bin/apply-branding <existing-root> --project-name <existing-project>` from a separate current source checkout. It copies only the presentation files, preserves local settings, creates rollback, and starts only `isp-branding`. Do not pull the entire repository into an old installation or run an unscoped `compose up` for this task.
- When the request covers existing installations, enumerate all applicable registered servers in ISP Support and verify each live URL. Updating the repository or one server does not update the others. Record which servers were actually applied and checked.

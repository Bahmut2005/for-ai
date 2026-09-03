# The Omniverse plugin marketplace

This repository doubles as a Claude Code plugin marketplace. It publishes the
`omniverse` plugin, which wraps the `omniverse-wheel` skill so people can spin the
wheel from any project, not just from a checkout of this repo.

## For users

Add the marketplace and install the plugin:

```shell
/plugin marketplace add bahmut2005/for-ai
/plugin install omniverse@omniverse-plugins
```

If the install summary says `Run /reload-plugins to activate.`, run that command. Then:

```shell
/omniverse:omniverse-wheel horror anime 90s
```

Plugin skills are namespaced by plugin name, so the invocation is
`/omniverse:omniverse-wheel`, not `/omniverse-wheel`.

To pick up later releases:

```shell
/plugin marketplace update omniverse-plugins
/plugin update omniverse@omniverse-plugins
```

### Pointing the skill at an instance

The skill calls an Omniverse Wheel instance over HTTP, resolved as
`$OMNIVERSE_WHEEL_URL` if set, `http://localhost:3000` otherwise. Inside an Omniverse
Wheel checkout it will start `npm run dev` for you when nothing is listening. Anywhere
else, set the variable to a reachable instance:

```bash
export OMNIVERSE_WHEEL_URL=https://omniverse.example.com
```

## Layout

```
.claude-plugin/marketplace.json     catalog: marketplace name, owner, plugin list
plugins/omniverse/
  .claude-plugin/plugin.json        plugin manifest: name, version, author
  skills/omniverse-wheel/SKILL.md   the skill itself
  README.md
.claude/skills/omniverse-wheel      symlink -> plugins/omniverse/skills/omniverse-wheel
```

The `.claude/skills` entry is a symlink, not a copy. The plugin directory holds the only
real copy of `SKILL.md`, so editing the skill updates both what this repo loads locally
and what the marketplace ships. Claude Code follows symlinked entries in `.claude/skills`,
so `/omniverse-wheel` keeps working in this repo without the plugin installed.

Plugin sources in `marketplace.json` are relative paths resolved against the marketplace
root — the directory containing `.claude-plugin/`, not `.claude-plugin/` itself. Relative
paths only work when the marketplace is added from a git source or a local directory. If
you ever serve `marketplace.json` from a bare URL, the paths won't resolve and each entry
needs a `github`, `git-subdir`, `npm`, or `archive` source instead.

## Adding another plugin

1. Create `plugins/<name>/.claude-plugin/plugin.json` with at least `name`, `description`,
   and `version`. The `name` must be kebab-case, and it is what users type, so treat it as
   permanent.
2. Put components under the plugin root: `skills/<skill-name>/SKILL.md`, `agents/`,
   `commands/`, `hooks/hooks.json`.
3. Add an entry to the `plugins` array in `.claude-plugin/marketplace.json` with a `name`
   and a `source` of `./plugins/<name>`.
4. Validate and test locally (below).

Keep everything a plugin needs inside its own directory. Installed plugins are copied to a
cache directory, so a path like `../shared` won't resolve after install. Reference files
inside the plugin with `${CLAUDE_PLUGIN_ROOT}` from hooks and MCP server configs.

## Releasing

`version` in `plugin.json` is the update signal. Claude Code caches by version, so a user
who already has `1.0.0` keeps the cached copy no matter what you push until that string
changes. Bump it in `plugin.json` on every release that should reach existing users.

Don't also set `version` on the marketplace entry: when both are set, the `plugin.json`
value silently wins, and the entry's value just becomes a stale second source of truth.

## Renaming or removing a plugin

A plugin's `name` is its stable identifier — users have it in `enabledPlugins`. To change
the label shown in the UI, set `displayName` and leave `name` alone. If a `name` genuinely
has to change, or a plugin is removed, add a top-level `renames` map to
`marketplace.json` so existing installs migrate instead of erroring:

```json
"renames": {
  "old-name": "new-name",
  "deleted-plugin": null
}
```

Treat that map as append-only history; chains resolve, so add a second entry rather than
editing the first.

## Validate and test

From the repository root:

```bash
claude plugin validate .                        # marketplace.json + each entry's plugin.json
claude plugin validate ./plugins/omniverse      # plugin manifest and component directories
claude plugin validate ./plugins/omniverse/skills   # skill frontmatter
```

A marketplace-directory run doesn't open skill or agent files, which is why the third
command is separate. Point it at `plugins/<name>/skills` rather than `.claude/skills`:
validation doesn't follow symlinks, so a run against `.claude` reports the linked entry as
skipped instead of checking it.

Then install from the working copy before pushing:

```shell
/plugin marketplace add ./
/plugin install omniverse@omniverse-plugins
```

Reference: [Create and distribute a plugin marketplace](https://code.claude.com/docs/en/plugin-marketplaces).

# attached_assets

Everything the site imports lives here. Everything these were made from lives
in `masters/`.

## Naming

    <scope>-<subject>[-<n>].<ext>

`scope` is where the asset appears, and is one of:

| scope         | where                                    |
| ------------- | ---------------------------------------- |
| `hero`        | the home page headline                   |
| `film`        | the Beyond Design gallery                |
| `collections` | case study 1 — YouTube Shopping Collections |
| `darmi`       | case study 2 — Darmi IBS food diary      |
| `airbnb`      | case study 3 — Airbnb WeChat Mini-app    |
| `tagging`     | case study 4 — Tagging in Description    |

Lower case, hyphens, no timestamps. Each project's card and case-study header
are `<scope>-cover`; Collections is the one project whose two differ, so it
also has a `collections-hero`.

The gallery is the one exception to the `<subject>` part: its files are
`film-<n>-<width>x<height>.webp`, because `Gallery.tsx` globs them and reads
both numbers back out — the width feeds `srcSet`'s `w` descriptors and the
pair gives the aspect ratio. Covers carry no dimensions, since there is only
one of each and nothing has to choose.

## masters/

Sources. Nothing imports from here, so nothing in it is ever built — it costs
the site nothing at runtime.

A master is named after what it produces, so `masters/darmi-cover.jpg`
becomes `darmi-cover.webp`. That is also why the directory exists at all:
`masters/airbnb-vote.mp4` encodes to `airbnb-vote.mp4`, which would overwrite
itself if both sat in the same folder.

Several of the GIFs arrived with a `.jpg` extension despite being GIF89a, and
carry their real one here.

## Regenerating

    node scripts/covers-to-webp.mjs    # masters/*.jpg  -> *.webp
    node scripts/encode-video.mjs      # masters/*.gif|mp4 -> *.mp4 + *.webm

Both read only from `masters/` and write only here, so either can be re-run
at any time. Each script documents the quality settings it uses and why.

The film variants predate both scripts and were generated externally; their
masters are here, but there is no script that rebuilds them.

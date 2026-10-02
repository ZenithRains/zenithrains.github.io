# Ruiyi Zhang · 张睿溢

Source for [zenithrains.github.io](https://zenithrains.github.io/), a bilingual
personal academic website built with Hugo and deployed through GitHub Actions.

## Content structure

- `content/en` and `content/zh`: English and Chinese pages
- `content/*/notes`: short, self-contained notes and observations
- `content/*/essays`: essays and serialized columns
- `data/publications.yaml`: shared research records, authors, and manuscript status
- `data/writing_features.yaml`: curated homepage writing and external translations
- `data/media.yaml`: cover images and PDF metadata
- `static/files`: downloadable CV and PDF files

The English site is the default. A post may exist in only one language; add the
same `translationKey` to matching English and Chinese files when both versions
exist.

## Local preview

```sh
hugo server --bind 127.0.0.1 --disableFastRender --noHTTPCache
```

The local preview is available at `http://127.0.0.1:1313/`. Add `--buildDrafts`
when reviewing unpublished content. Build the production files with:

```sh
hugo --gc --minify
```

## Visual system

[DESIGN.md](DESIGN.md) defines the colors, typography, spacing, page composition,
and component rules. Six files in `assets/css` own the named cascade layers:
`tokens`, `base`, `layout`, `components`, `utilities`, and `print`. Hugo combines
them into one minified stylesheet with a content fingerprint. Its build cache key
also follows source content so preview changes invalidate the correct resource.

Change semantic variables in `tokens.css` first, then the component that owns the
behavior. Keep language and theme variants in this system. Do not restore the
retired global CSS override files. Image and font provenance are documented in
their resource directories.

The [reconstruction verification record](verification/editorial-redesign.md)
describes completed checks and their limits.

Every push to `main` builds and deploys the site to GitHub Pages automatically.

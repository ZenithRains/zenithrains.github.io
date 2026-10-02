# Derived site media

All images here are resized versions of existing, authorized local sources.
Original photos and PDF files remain unchanged.

| Files | Source | Transformation |
| --- | --- | --- |
| `ruiyi-cutout-{240,480}.webp` | `static/images/ruiyi-cutout.png` | WebP, quality 82, widths 240 and 480 px; alpha retained |
| `euler-e65-cover-{240,480}.webp` | `static/files/euler-e65-latin-working-draft.pdf`, page 1 | Poppler render of the actual title page, WebP quality 88 |
| `mount-fuji-unseen-cover-zh-{240,480}.webp` | `static/files/japan-travel-2024.pdf`, page 1 | Actual Chinese cover, WebP quality 85 |
| `mount-fuji-unseen-cover-en-{240,480}.webp` | `static/files/japan-travel-2024-en.pdf`, page 1 | Actual English cover, WebP quality 85 |

Render a PDF page at 900 px on the long edge, then resize with `cwebp`:

```sh
pdftoppm -f 1 -singlefile -scale-to 900 -png INPUT.pdf /tmp/cover
cwebp -quiet -q 88 -m 6 -resize 480 0 /tmp/cover.png -o OUTPUT.webp
```

Attribution and accessible alternative text are in `data/media.yaml`. The Euler
working draft retains its authorship and source ornament acknowledgments.
The 2024 travel cover is associated only with that journal. No image has been
assigned to the separate 2026 Fuji essay, which currently has no source photo.

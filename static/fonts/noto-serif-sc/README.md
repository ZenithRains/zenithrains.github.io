# Noto Serif SC title subset

- Source: Google Fonts' official `google/fonts` repository,
  `ofl/notoserifsc/NotoSerifSC[wght].ttf`.
- Source URL: https://github.com/google/fonts/tree/main/ofl/notoserifsc
- License: SIL Open Font License 1.1, retained in `OFL.txt`.
- Retrieved: 2026-10-02.
- Site family: `Noto Serif SC Titles`.
- Format: WOFF, variable weights 200 to 900.
- Subset: 433 characters from existing Chinese page titles, display labels,
  template UI text, and every heading in the final generated site. Latin letters
  are omitted so EB Garamond supplies them.
- Size: 178,540 bytes. The local WOFF2 encoder lacked its Brotli dependency;
  WOFF provides a small self-hosted subset without installing global packages.

`title-characters.txt` is the exact subset input. When new Chinese titles require
more characters, extend the list and regenerate the subset with fontTools from
the official source. Characters outside the subset use the documented Chinese
serif fallback in the site stylesheet.

```python
from fontTools.ttLib import TTFont
from fontTools import subset

font = TTFont("NotoSerifSC[wght].ttf")
options = subset.Options()
options.flavor = "woff"
subsetter = subset.Subsetter(options=options)
subsetter.populate(text=open("title-characters.txt").read())
subsetter.subset(font)
font.flavor = "woff"
font.save("noto-serif-sc-titles-wght.woff")
```

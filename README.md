# Ruiyi Zhang · 张睿溢

Source for [zenithrains.github.io](https://zenithrains.github.io/), a bilingual
personal academic website built with Hugo and deployed through GitHub Actions.

## Content structure

- `content/en` and `content/zh`: English and Chinese pages
- `content/*/notes`: short, self-contained notes and observations
- `content/*/essays`: essays and serialized columns
- `data/publications.yaml`: verified publication records
- `static/files`: downloadable CV and PDF files

The English site is the default. A post may exist in only one language; add the
same `translationKey` to matching English and Chinese files when both versions
exist.

## Local preview

```sh
hugo server --buildDrafts
```

Every push to `main` builds and deploys the site to GitHub Pages automatically.
